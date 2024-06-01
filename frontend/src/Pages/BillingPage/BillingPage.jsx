import React, { useEffect, useState } from 'react'
import styles from './BillingPage.module.css'

import { useDispatch, useSelector } from 'react-redux'

import Model from '../../Components/Model/Model'
import { getUserActivities, getUsers } from '../../Actions/userAction'
import ResetPasswordModel from '../../Components/ResetPasswordModel/ResetPasswordModel'
import DataActivityTable from '../../Components/DataActivityTable/DataActivityTable'
import swal from 'sweetalert'
import { logoutUserAccount } from '../../Actions/AuthAction'
import { getRequests, resetData } from '../../Actions/RequestActions'
import { getAccountRequests } from '../../Actions/AccountRequestActions'

// to get country list
import { useCountries } from 'react-countries'
import PlusButton from '../../Components/PlusButton/PlusButton'
import { useNavigate } from 'react-router-dom'

const BillingPage = () => {
	const { countries } = useCountries()

	const navigate = useNavigate()

	const users = useSelector(state => state.user.users)
	const requests = useSelector(state => state.request.requests)

	const dispatch = useDispatch()
	const [showModal, setShowModal] = useState(false)
	const [showPasswordModel, setPasswordModel] = useState(false)
	const [selectedUser, setSelectedUser] = useState()

	const handlePasswordModel = () => {
		setPasswordModel(current => !current)
	}
	const handleModel = () => {
		setShowModal(current => !current)
	}

	useEffect(() => {
		dispatch(getAccountRequests())
		dispatch(getRequests())
		dispatch(getUserActivities())
	}, [dispatch])

	return (
		<div className={`container-fluid ${styles.home}`}>
			<div
				className="row m-auto  mb-3"
				style={{
					background: 'rgba(250, 242, 242, 0.15)',
					boxShadow: '0 8px 32px 0 rgba(81, 50, 250, 0.37)',
					backDropFilter: ' blur(2.5px)',
					webkitBackdropFilter: ' blur(2.5px)',
					borderRadius: '10px',
					border: '1px solid rgba(255, 255, 255, 0.18)'
				}}>
				<h2 style={{ textAlign: 'left' }} className="text-light">
					Billing To
				</h2>

				<div className="row m-auto ">
					<div className="col-10 col-md-3  mx-auto">
						<div className="row mb-2">
							<label
								className="text-light text-left"
								style={{ textAlign: 'left' }}>
								Inoice No :
							</label>
							<input type="text" />
						</div>
					</div>
					<div className="col-10 col-md-3  mx-auto">
						<div className="row mb-2">
							<label
								className="text-light text-left"
								style={{ textAlign: 'left' }}>
								Date :
							</label>
							<input type="date" />
						</div>
					</div>

					<div className="col-10 col-md-3  mx-auto">
						<div className="row mb-2">
							<label
								className="text-light text-left"
								style={{ textAlign: 'left' }}>
								Terms :
							</label>
							<select>
								<option>option 1</option>
								<option>option 3</option>
								<option>option 3</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div
				className="row m-auto  my-3"
				style={{
					background: 'rgba(250, 242, 242, 0.15)',
					boxShadow: '0 8px 32px 0 rgba(81, 50, 250, 0.37)',
					backDropFilter: ' blur(2.5px)',
					webkitBackdropFilter: ' blur(2.5px)',
					borderRadius: '10px',
					border: '1px solid rgba(255, 255, 255, 0.18)'
				}}>
				<h2 style={{ textAlign: 'left' }} className="text-light">
					Client Details
				</h2>

				<div className="row m-auto ">
					<div className="col-10 col-md-3  mx-auto">
						<div className="row mb-2">
							<label
								className="text-light text-left"
								style={{ textAlign: 'left' }}>
								Proof No :
							</label>
							<input type="text" />
						</div>

						<div className="row mb-2">
							<label
								className="text-light text-left"
								style={{ textAlign: 'left' }}>
								Client Type :
							</label>
							<input type="text" />
						</div>
					</div>
					<div className="col-10 col-md-3  mx-auto">
						<div className="row mb-2">
							<label
								className="text-light text-left"
								style={{ textAlign: 'left' }}>
								Type Of Proof :
							</label>
							<select>
								<option>option 1</option>
								<option>option 3</option>
								<option>option 3</option>
							</select>
						</div>

						<div className="row mb-2">
							<label
								className="text-light text-left"
								style={{ textAlign: 'left' }}>
								Company :
							</label>
							<input type="text" />
						</div>
					</div>

					<div className="col-10 col-md-3  mx-auto">
						<div className="row mb-2">
							<label
								className="text-light text-left"
								style={{ textAlign: 'left' }}>
								Client Name :
							</label>
							<input type="text" />
						</div>
						<div className="row mb-2">
							<label
								className="text-light text-left"
								style={{ textAlign: 'left' }}>
								Vechile No :
							</label>
							<input type="text" />
						</div>
					</div>
				</div>
			</div>
			<div
				className="border mb-2"
				style={{
					background: 'rgba(250, 242, 242, 0.15)',
					boxShadow: '0 8px 32px 0 rgba(81, 50, 250, 0.37)',
					backDropFilter: ' blur(2.5px)',
					webkitBackdropFilter: ' blur(2.5px)',
					borderRadius: '10px',
					border: '1px solid rgba(255, 255, 255, 0.18)'
				}}>
				<div className="row m-auto my-2">
					<div className="col-11 col-md-8 mx-auto">
						<div className="row border  mb-2">
							<h4
								className="text-light text-left"
								style={{ textAlign: 'left' }}>
								Payment Deposite
							</h4>
							<div className="col-12 col-md-5 mx-auto">
								<div className="row mb-2">
									<label
										className="text-light text-left"
										style={{ textAlign: 'left' }}>
										Proof No :{' '}
									</label>
									<select>
										<option>1</option>
										<option>2</option>
										<option>3</option>
									</select>
								</div>

								<div className="row mb-2">
									<label
										className="text-light text-left"
										style={{ textAlign: 'left' }}>
										Gender :{' '}
									</label>
									<select>
										<option>Male</option>
										<option>Female</option>
									</select>
								</div>
							</div>
							<div className="col-12 col-md-5 mx-auto">
								<div className="row mb-2">
									<label
										className="text-light text-left"
										style={{ textAlign: 'left' }}>
										Proof No :{' '}
									</label>
									<select>
										<option>1</option>
										<option>2</option>
										<option>3</option>
									</select>
								</div>

								<div className="row mb-2">
									<label
										className="text-light text-left"
										style={{ textAlign: 'left' }}>
										Gender :{' '}
									</label>
									<select>
										<option>Male</option>
										<option>Female</option>
									</select>
								</div>
							</div>
						</div>
						<div className="row border mb-2">
							<h4
								className="text-light text-left"
								style={{ textAlign: 'left' }}>
								Payment EMI
							</h4>
							<div className="col-12 col-md-5 mx-auto">
								<div className="row mb-2">
									<label
										className="text-light text-left"
										style={{ textAlign: 'left' }}>
										Proof No :{' '}
									</label>
									<select>
										<option>1</option>
										<option>2</option>
										<option>3</option>
									</select>
								</div>

								<div className="row mb-2">
									<label
										className="text-light text-left"
										style={{ textAlign: 'left' }}>
										Gender :{' '}
									</label>
									<select>
										<option>Male</option>
										<option>Female</option>
									</select>
								</div>
							</div>
							<div className="col-12 col-md-5 mx-auto">
								<div className="row mb-2">
									<label
										className="text-light text-left"
										style={{ textAlign: 'left' }}>
										Proof No :{' '}
									</label>
									<select>
										<option>1</option>
										<option>2</option>
										<option>3</option>
									</select>
								</div>

								<div className="row mb-2">
									<label
										className="text-light text-left"
										style={{ textAlign: 'left' }}>
										Gender :{' '}
									</label>
									<select>
										<option>Male</option>
										<option>Female</option>
									</select>
								</div>
							</div>
						</div>
						<div className="row border">
							<h4
								className="text-light text-left"
								style={{ textAlign: 'left' }}>
								Payment Benefit / Commision
							</h4>
							<div className="col-12 col-md-5 mx-auto">
								<div className="row mb-2">
									<label
										className="text-light text-left"
										style={{ textAlign: 'left' }}>
										Proof No :{' '}
									</label>
									<select>
										<option>1</option>
										<option>2</option>
										<option>3</option>
									</select>
								</div>

								<div className="row mb-2">
									<label
										className="text-light text-left"
										style={{ textAlign: 'left' }}>
										Gender :{' '}
									</label>
									<select>
										<option>Male</option>
										<option>Female</option>
									</select>
								</div>
							</div>
							<div className="col-12 col-md-5 mx-auto">
								<div className="row mb-2">
									<label
										className="text-light text-left"
										style={{ textAlign: 'left' }}>
										Proof No :{' '}
									</label>
									<select>
										<option>1</option>
										<option>2</option>
										<option>3</option>
									</select>
								</div>

								<div className="row mb-2">
									<label
										className="text-light text-left"
										style={{ textAlign: 'left' }}>
										Gender :{' '}
									</label>
									<select>
										<option>Male</option>
										<option>Female</option>
									</select>
								</div>
							</div>
						</div>
					</div>

					{/* buttons below */}
					<div className="col-10 col-md-3 mt-2  mx-auto">
						<div className="row mb-3">
							<button className="btn btn-success col-12">Save</button>
						</div>

						<div className="row mb-3">
							<button className="btn btn-danger col-12">Clear</button>
						</div>

						<div className="row mb-3">
							<button className="btn btn-primary col-12">Print</button>
						</div>

						<div className="row mb-3">
							<button className="btn btn-light col-12">Inoice Copy</button>
						</div>
						<div className="row mb-3">
							<button className="btn btn-secondary col-12">
								Cancel Invoice
							</button>
						</div>
						<div className="row ">
							<button
								className="btn btn-success col-12"
								onClick={() => {
									navigate('/rent')
								}}>
								Render Car Reg
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="row" style={{ marginTop: '3vh', color: 'white' }}>
				<h2>Data Activities</h2>
				<DataActivityTable initialData={requests} />
			</div>

			{showModal && (
				<Model
					showModal={showModal}
					closeHandler={handleModel}
					selectedUser={selectedUser}
				/>
			)}
		</div>
	)
}

export default BillingPage
