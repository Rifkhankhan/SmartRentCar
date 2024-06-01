// const User = require('../Models/Blog');
const { v4: uuid } = require('uuid')

const pool = require('../MysqlConnection')
const multer = require('multer')

exports.registerClient = async (req, res, next) => {
	// Access file information
	const file = req.file

	// Now, you can use this information to perform further processing or save it to the database

	// For example, you can log the form fields and file details

	console.log(req.body)
	try {
		const newProduct = {
			...req.body,
			proofNo: uuid()
		}

		const columns = Object.keys(newProduct).join(',')
		const placeholders = Object.values(newProduct)
			.map(() => '?')
			.join(',')

		const query = `INSERT INTO rentlist (${columns}, createAt) VALUES (${placeholders}, NOW())`

		console.log(query)
		const [result] = await pool.query(query, Object.values(newProduct))
		console.log(result)

		const [requests] = await pool.query('select * from rentlist')
		console.log(requests)
		if (result.affectedRows > 0) {
			res.json({ success: true, data: requests })
		}
	} catch (err) {
		console.log(err)
		res.json({ success: false })

		return next(err)
	}
}
// get all products
exports.getClients = async (req, res, next) => {
	console.log(uuid())
	try {
		const [data] = await pool.query('select * from rentlist ')
		res.json({ success: true, data: data })
	} catch (err) {
		return next(err)
	}
}

// //get all products of a shop
exports.ToggleRequest = async (req, res, next) => {
	// i need user id and arid
	// arid: 11,
	// amount: '20000',
	// requestType: 'expense',
	// requestForm: 'expense',
	// date: '2024-03-12',
	// narration: 'expense fewfwefw chnaged now',
	// id: 2,
	// status: 1,
	// balance: 196284

	const { balance, ...rest } = req.body
	try {
		const [product, fields] = await pool.query(
			'SELECT * FROM accountrequest WHERE arid = ?',
			[req.params.id]
		)

		product[0].status = !product[0].status

		const updateProduct = {
			...product[0],
			...rest,
			status: product[0].status ? 1 : 0,
			id: req.body.id,
			createAt: rest.createAt
		}

		// Construct the SET part of the SQL query dynamically
		const updateFields = Object.keys(updateProduct)
			.filter(key => key !== 'deleteAt') // Exclude 'deleteAt' key
			.filter(key => key !== 'arid') // Exclude 'deleteAt' key
			.map(key => `${key} = ?`)
			.join(', ')

		// Construct the array of values for the update
		const updateValues = Object.keys(updateProduct)
			.filter(key => key !== 'deleteAt') // Exclude 'deleteAt' key
			.filter(key => key !== 'arid') // Exclude 'deleteAt' key
			.map(key => updateProduct[key])

		const query = `UPDATE accountrequest SET ${updateFields}, deleteAt = NOW() WHERE arid = ${req.params.id}`

		const [result] = await pool.query(query, [...updateValues])

		//.....................................................finished account request table insertion

		const [lastRecord] = await pool.query(
			'SELECT * FROM accountrequest WHERE arid = ?',
			[req.params.id]
		)
		const [updatedRequest] = await pool.query(
			'SELECT * FROM requests WHERE arid = ? ORDER BY rid DESC LIMIT 1',
			[req.params.id]
		)
		const { rid, ...resttt } = updatedRequest[0]
		const requestProduct = {
			...resttt,
			...lastRecord[0]
		}

		const requestColumns = Object.keys(requestProduct).join(',')

		const requestPlaceholders = Object.keys(requestProduct)
			.map(() => '?')
			.join(',')

		const requestQuery = `INSERT INTO requests (${requestColumns}) VALUES (${requestPlaceholders})`

		const [requestResult] = await pool.query(
			requestQuery,
			Object.values(requestProduct)
		)
		console.log(requestResult)

		//...................................................finished

		if (result.affectedRows > 0 && requestResult.affectedRows > 0) {
			res.status(200).json({ success: true, product: updateProduct })
		} else {
			res.status(404).json({ success: false, error: 'User not found' })
		}
	} catch (err) {
		console.log(err)
		return next(err)
	}
}

// //get all products of a shop
exports.updateRequest = async (req, res, next) => {
	try {
		const { arid, file, ...rest } = req.body
		console.log(rest)

		// createAt
		const isoDateString = req.body?.createAt
		const dateTime = new Date(isoDateString)
		const formattedDateTime = dateTime
			.toISOString()
			.slice(0, 19)
			.replace('T', ' ')

		const updateUser = {
			...rest,
			filename: req.file?.filename || req.body?.filename, // Use the filename obtained from req.file if available, otherwise fallback to req.body.filename
			filepath: req.file?.path || req.body?.path, // Use the filepath obtained from req.file if available, otherwise fallback to req.body.path
			createAt: rest.createAt, // Use the existing format for createAt
			deleteAt: rest?.deleteAt === 'null' ? null : rest.deleteAt
		}

		// Construct the SET part of the SQL query dynamically
		const updateFields = Object.keys(updateUser)
			.map(key => `${key} = ?`)
			.join(', ')

		const updateValues = Object.values(updateUser)

		const query = `UPDATE accountrequest SET ${updateFields} WHERE arid = ?` // Remove parentheses around SET clause
		const [result] = await pool.query(query, [...updateValues, arid]) // Include id value separately
		console.log(result)
		//.....................................................finished account request table insertion
		const [request] = await pool.query(
			'select * from accountrequest where arid = ?',
			[arid]
		)
		const requestProduct = {
			...request[0],

			arid: req.body?.arid
		}

		const requestColumns = Object.keys(requestProduct).join(',')
		const requestPlaceholders = Object.values(requestProduct)
			.map(() => '?')
			.join(',')

		const requestQuery = `INSERT INTO requests (${requestColumns},updateAt) VALUES (${requestPlaceholders}, NOW())`

		//...................................................finished

		if (result.affectedRows > 0) {
			const [requestResult] = await pool.query(
				requestQuery,
				Object.values(requestProduct)
			)

			if (result.affectedRows > 0 && requestResult.affectedRows > 0) {
				const [requests] = await pool.query('select * from accountrequest')

				res.json({ success: true, requests: requests })
			} else {
				res.status(404).json({ success: false })
			}
		}
	} catch (err) {
		console.log(err)
		res.status(200).json({ success: false })

		return next(err)
	}
}
// get product
exports.getRequest = async (req, res, next) => {
	const { id } = req.params.id

	try {
		const expanse = await AccountRequestModel.findById(req.params.id)
		res.json(expanse)
	} catch (err) {
		return next(err)
	}
}
// const queryPreviousDayRecord = () => {
// 	try {
// 		AccountRequestModel.findOne({
// 			date: { $lt: req.body.date.split(' ')[0] }
// 		})
// 			.sort({ date: -1 })
// 			.exec((err, lastDayRecord) => {
// 				if (err) {
// 					console.error(err)
// 					return
// 				}

// 				if (lastDayRecord) {
// 					const previousDate = new Date(lastDayRecord.date)
// 						.toISOString()
// 						.slice(0, 10) // Extracting YYYY-MM-DD part
// 					const givenDate = new Date(req.body.date)
// 						.toISOString()
// 						.slice(0, 10)

// 					if (previousDate !== givenDate) {
// 						console.log('logic: ', date1UTC !== date2UTC)
// 						newProduct.oppBalance = lastDayRecord.balance
// 						newProduct.balance =
// 							+lastDayRecord.balance +
// 							+req.body.amount +
// 							+lastRecord.balance
// 					} else {
// 						newProduct.oppBalance = lastDayRecord.oppBalance
// 						newProduct.balance =
// 							+lastDayRecord.balance + +req.body.amount
// 					}
// 				}

// 				// Save the new product after querying for the previous day's record
// 				newProduct.save((err, savedProduct) => {
// 					if (err) {
// 						console.error(err)
// 						return
// 					}
// 					// Handle successful save
// 					res.json({ success: true, product: newProduct })
// 				})
// 			})
// 	} catch (err) {
// 		console.error(err)
// 		return
// 	}
// }
