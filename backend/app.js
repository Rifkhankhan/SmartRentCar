// const mongoose = require('mongoose')
// const express = require('express')
// const bodyParser = require('body-parser')
// const path = require('path')
// const cors = require('cors')
// const fs = require('fs')
// const ws = require('ws') // For WebSocket
// const ExpanseRouter = require('./Routes/ExpanseRouter')
// const AccountRequestRouter = require('./Routes/AccountRequestRouter')
// const AdvanceRouter = require('./Routes/AdvanceRouter')
// const LoanRouter = require('./Routes/LoanRouter')
// const ReceiptRouter = require('./Routes/ReceiptRouter')
// const userrouter = require('./Routes/userrouter')
// const AccountRequestModel = require('./Models/AccountRequestModel')
// const mysql = require('mysql')

// const app = express()
// const PORT = process.env.PORT || 5000

// app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.json({ limit: '50mb' }))
// app.use(express.urlencoded({ limit: '50mb', extended: true }))
// app.use(cors())

// // CORS Configuration
// app.use(
// 	cors({
// 		origin: 'https://hopper-front.vercel.app'
// 	})
// )

// // Static File Serving
// app.use(express.static(path.join(__dirname, 'Public')))

// // Error Handling Middleware
// app.use((err, req, res, next) => {
// 	if (req.file) {
// 		fs.unlink(req.file.path, err => {
// 			console.log(err)
// 		})
// 	}
// 	next(err)
// })

// // CORS Headers
// app.use((req, res, next) => {
// 	res.setHeader('Access-Control-Allow-Origin', '*')
// 	res.setHeader(
// 		'Access-Control-Allow-Headers',
// 		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
// 	)
// 	res.setHeader(
// 		'Access-Control-Allow-Methods',
// 		'GET, POST, PATCH, DELETE, OPTIONS'
// 	)
// 	next()
// })

// // Connect to MongoDB
// // mongoose
// // 	.connect(
// // 		'mongodb+srv://rifkhan:d3CnbCKG7klNuZ3m@cluster0.jh4wxm5.mongodb.net/?retryWrites=true&w=majority'
// // 	)
// // 	.then(() => {
// // 		console.log('Connected to MongoDB')
// // 	})
// // 	.catch(error => {
// // 		console.log('Error connecting to MongoDB:', error)
// // 	})

// // connect to mysql

// const connection = mysql.createConnection({
// 	host: 'localhost',
// 	user: 'root',
// 	password: 'mysql123',
// 	database: 'smartaccountbook'
// })

// connection.connect(err => {
// 	if (err) {
// 		console.error('Error connecting to MySQL: ', err)
// 		return
// 	}
// 	console.log('Connected to MySQL database')
// })

// // Perform database operations here

// connection.end()
// // WebSocket Server
// const wsServer = new ws.Server({ noServer: true })

// wsServer.on('connection', w => {
// 	console.log('someone connected')
// 	w.on('message', msg => {
// 		console.log('got message', msg)
// 		w.send(msg)
// 	})
// })

// // Express Server
// const expressServer = app.listen(PORT, () => {
// 	console.log(`Server is running on port ${PORT}`)
// })

// // Upgrade HTTP server to support WebSocket
// expressServer.on('upgrade', (request, socket, head) => {
// 	wsServer.handleUpgrade(request, socket, head, socket => {
// 		wsServer.emit('connection', socket, request)
// 	})
// })

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

// // Define Routes
// app.use('/expanse', ExpanseRouter)
// app.use('/accountRequest', AccountRequestRouter)
// app.use('/user', userrouter)
// app.use('/receipt', ReceiptRouter)
// app.use('/loan', LoanRouter)
// app.use('/advance', AdvanceRouter)

// // Error Handling Middleware
// app.use((error, req, res, next) => {
// 	if (!res.headersSent) {
// 		res
// 			.status(error.code || 500)
// 			.json({ message: error.message || 'An unknown error occurred!' })
// 	}
// })

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const mysql = require('mysql')

const userrouter = require('./Routes/userrouter')
const AccountRequestRouter = require('./Routes/AccountRequestRouter')
const RequestRouter = require('./Routes/RequestRouter')
const RentRouter = require('./Routes/RentRouter')

const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// Allow requests from all origins
app.use(cors())

// Your other middleware and routes
app.use(express.json())
// CORS Configurations
// app.use(
// 	cors({
// 		origin: 'https://hopper-front.vercel.app'
// 	})
// )

// Connect to MySQL
const pool = require('./MysqlConnection')

// Define Routes
// Define your routes here
app.use('/user', userrouter)
app.use('/accountRequest', AccountRequestRouter)
app.use('/requests', RequestRouter)
app.use('/rent', RentRouter)

// Express Server
const server = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})

// Error Handling Middleware
app.use((error, req, res, next) => {
	if (!res.headersSent) {
		res
			.status(error.code || 500)
			.json({ message: error.message || 'An unknown error occurred!' })
	}
})

// Serve images from the 'uploads' directory
app.use('/uploads', express.static('uploads'))
