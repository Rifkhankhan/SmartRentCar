import React, { useState } from 'react'
import styles from './RenderCarTable.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

const RenderCarTable = ({ initialData }) => {
	const [filter, setFilter] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const pageSize = 10 // Number of items per page
	const maxVisiblePages = 5 // Maximum number of visible pagination buttons

	const handleFilterChange = event => {
		setCurrentPage(1) // Reset to first page when filter changes
		setFilter(event.target.value)
	}

	const filteredData = initialData.filter(item => {
		const filterLower = filter.toLowerCase()
		return (
			String(item.rid).toLowerCase().includes(filterLower) ||
			String(item.name).toLowerCase().includes(filterLower) ||
			String(item.id).toLowerCase().includes(filterLower) ||
			String(item.arid).toLowerCase().includes(filterLower) ||
			String(item.amount).toLowerCase().includes(filterLower) ||
			(item.deleteAt && item.deleteAt.toLowerCase().includes(filterLower)) ||
			(item.createAt && item.createAt.toLowerCase().includes(filterLower)) ||
			(item.updateAt && item.updateAt.toLowerCase().includes(filterLower)) ||
			(item.date_reset && item.date_reset.toLowerCase().includes(filterLower))
		)
	})

	// Sort the filteredData array by multiple criteria
	filteredData.sort((a, b) => {
		// Sort by createAt
		if (a.createAt < b.createAt) return -1
		if (a.createAt > b.createAt) return 1

		// If createAt is the same, sort by updateAt
		if (a.updateAt < b.updateAt) return -1
		if (a.updateAt > b.updateAt) return 1

		// If updateAt is also the same, sort by deleteAt
		if (a.deleteAt < b.deleteAt) return -1
		if (a.deleteAt > b.deleteAt) return 1

		// If updateAt is also the same, sort by deleteAt
		if (a.date_reset < b.date_reset) return -1
		if (a.date_reset > b.date_reset) return 1

		// If all criteria are the same, maintain the original order
		return 0
	})
	const totalPages = Math.ceil(filteredData.length / pageSize)

	const handlePageChange = pageNumber => {
		setCurrentPage(pageNumber)
	}

	// Calculate the range of visible page numbers
	const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
	const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

	const visiblePages = []
	for (let i = startPage; i <= endPage; i++) {
		visiblePages.push(i)
	}

	const visibleData = filteredData.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize
	)

	const isDateWithinOneMonth = givenDate => {
		const currentDate = new Date()
		const given = new Date(givenDate)

		// Normalize dates to ignore time component
		const currentYear = currentDate.getFullYear()
		const currentMonth = currentDate.getMonth()
		const currentDay = currentDate.getDate()

		const givenYear = given.getFullYear()
		const givenMonth = given.getMonth()
		const givenDay = given.getDate()

		const currentDateOnly = new Date(currentYear, currentMonth, currentDay)
		const givenDateOnly = new Date(givenYear, givenMonth, givenDay)

		// Calculate one month before and after the current date
		const oneMonthBefore = new Date(currentYear, currentMonth - 1, currentDay)
		const oneMonthAfter = new Date(currentYear, currentMonth + 1, currentDay)

		// Check if the given date is within this range
		return givenDateOnly >= oneMonthBefore && givenDateOnly <= oneMonthAfter
	}

	return (
		<div className={`container ${styles.tableContainer}`}>
			<div className="row">
				<input
					type="text"
					value={filter}
					onChange={handleFilterChange}
					className={`form-control mb-3 ms-2 col-12 col-md-6 ${styles.inputTag}`}
					placeholder="Search for what you want..."
				/>
				<input
					type="button"
					value="Clear"
					onChange={handleFilterChange}
					className={`btn btn-success mb-3 ms-2 col-5 col-md-2 `}
				/>
			</div>

			<table className="table table-hover thead-dark w-100 f-1">
				<thead className="thead-dark">
					<tr>
						<th>#</th>
						<th>Client Name</th>
						<th>Proof No Expire</th>
						<th>Vehile Rent End Date</th>
						<th>Vech Lice Expire</th>
						<th>Vech Incu Expire</th>
						<th>EMI Due Date</th>
						<th>Benefit Amount Date</th>
						<th>Contact 1</th>
						<th>Contact 2</th>
					</tr>
				</thead>
				<tbody>
					{visibleData.map((item, index) => (
						<tr key={index}>
							<td>{index + 1}</td>
							<td>{item?.clientName}</td>
							<td
								style={{
									backgroundColor: isDateWithinOneMonth(item?.proofNoExpire)
										? 'red'
										: '',

									color: isDateWithinOneMonth(item?.proofNoExpire)
										? 'white'
										: ''
								}}>
								{item?.proofNoExpire}
							</td>

							{/*  */}
							<td
								style={{
									backgroundColor: isDateWithinOneMonth(item?.proofNoExpire)
										? 'red'
										: '',

									color: isDateWithinOneMonth(item?.proofNoExpire)
										? 'white'
										: ''
								}}>
								{item?.rentEndDate}
							</td>
							<td
								style={{
									backgroundColor: isDateWithinOneMonth(item?.proofNoExpire)
										? 'red'
										: '',

									color: isDateWithinOneMonth(item?.proofNoExpire)
										? 'white'
										: ''
								}}>
								{item?.licenseExpire}
							</td>
							<td
								style={{
									backgroundColor: isDateWithinOneMonth(item?.proofNoExpire)
										? 'red'
										: '',

									color: isDateWithinOneMonth(item?.proofNoExpire)
										? 'white'
										: ''
								}}>
								{item?.insuranceExpire}
							</td>
							<td
								style={{
									backgroundColor: isDateWithinOneMonth(item?.proofNoExpire)
										? 'red'
										: '',

									color: isDateWithinOneMonth(item?.proofNoExpire)
										? 'white'
										: ''
								}}>
								{item?.emiDueDate}
							</td>
							<td
								style={{
									backgroundColor: isDateWithinOneMonth(item?.proofNoExpire)
										? 'red'
										: '',

									color: isDateWithinOneMonth(item?.proofNoExpire)
										? 'white'
										: ''
								}}>
								{item?.benefitDueDate}
							</td>
							<td>{item?.contact1}</td>
							<td>{item?.contact2}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="d-flex justify-content-center align-items-center">
				<button
					className="btn btn-icon btn-primary mx-1"
					onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
					disabled={currentPage === 1}>
					<BsChevronLeft />
				</button>
				{visiblePages.map(pageNumber => (
					<button
						key={pageNumber}
						className={`btn btn-icon btn-danger mx-1 ${
							currentPage === pageNumber ? 'active' : ''
						}`}
						onClick={() => handlePageChange(pageNumber)}>
						{pageNumber}
					</button>
				))}
				<button
					className="btn btn-icon btn-primary"
					onClick={() =>
						setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))
					}
					disabled={currentPage === totalPages}>
					<BsChevronRight />
				</button>
			</div>
			<div className="text-center">
				Page {currentPage} of {totalPages}
			</div>
		</div>
	)
}

export default RenderCarTable
