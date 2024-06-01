import React, { useEffect, useState } from 'react'
import styles from './Rent.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-bootstrap/Toast'
import Model from '../../Components/Model/Model'
import RenderCarTable from './../../Components/RenderCarTable/RenderCarTable'

// to get country list
import { useCountries } from 'react-countries'
import PlusButton from '../../Components/PlusButton/PlusButton'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { getClients, registerClient } from '../../Actions/RentActions'

const Rent = () => {
	const { countries } = useCountries()

	const requests = useSelector(state => state.request.requests)
	const list = useSelector(state => state.rent.rentClients)

	const dispatch = useDispatch()
	const [showModal, setShowModal] = useState(false)
	const [formValid, setFormValid] = useState(true)
	const [formSubmit, setFormSubmit] = useState(false)

	const [selectedUser, setSelectedUser] = useState()

	const initialData = {
		gender: { value: 'male', isValid: true },
		dob: { value: '', isValid: 'true' },
		maritalStatus: { value: 'single', isValid: true },
		email: { value: '', isValid: true },
		clientName: { value: '', isValid: true },
		joinedOn: { value: '', isValid: true },
		contact1: { value: '', isValid: true },
		contact2: { value: '', isValid: true },
		address: { value: '', isValid: true },
		typeofproof: { value: 'no', isValid: true },
		proofNoExpire: { value: '', isValid: true },
		company: { value: '', isValid: true },
		nationality: { value: '', isValid: true },
		emiClient: { value: 'no', isValid: true },
		totalVehicleAmount: { value: '', isValid: true },
		benefitAmount: { value: '', isValid: true },
		typeofbenefit: { value: 'monthly', isValid: true },
		emiAmount: { value: '', isValid: true },
		emiDueDate: { value: '', isValid: true },
		emiJoined: { value: '', isValid: true },
		joined: { value: '', isValid: true },
		benefitDueDate: { value: '', isValid: true }
	}

	const vehileInitialData = {
		ownerName: { value: '', isValid: true },
		type: { value: '', isValid: 'true' },
		vehicleNo: { value: '', isValid: true }, //
		duratio: { value: '', isValid: true }, //

		depositAmount: { value: '', isValid: true }, //
		mileage: { value: '', isValid: true }, //
		issueDate: { value: '', isValid: true }, //
		rentEndDate: { value: '', isValid: true },

		insuranceIssued: { value: '', isValid: true },

		insuranceExpire: { value: '', isValid: true },
		licenseIssued: { value: '', isValid: true },

		licenseExpire: { value: '', isValid: true }
	}

	const [inputs, setInputs] = useState(initialData)
	const [vehileInputs, setVehileInputs] = useState(vehileInitialData)

	useEffect(() => {
		dispatch(getClients())
	}, [dispatch])
	useEffect(() => {
		setFormValid(
			inputs.gender.isValid &&
				inputs.dob.isValid &&
				inputs.maritalStatus.isValid &&
				inputs.email.isValid &&
				inputs.clientName.isValid &&
				inputs.joinedOn.isValid &&
				inputs.contact1.isValid &&
				inputs.contact2.isValid &&
				inputs.address.isValid &&
				inputs.typeofproof.isValid &&
				inputs.proofNoExpire.isValid &&
				inputs.company.isValid &&
				inputs.nationality.isValid &&
				inputs.totalVehicleAmount.isValid &&
				inputs.benefitAmount.isValid &&
				inputs.typeofbenefit.isValid &&
				inputs.emiClient.isValid &&
				inputs.emiAmount.isValid &&
				inputs.emiDueDate.isValid &&
				inputs.emiJoined.isValid &&
				inputs.joined.isValid &&
				inputs.benefitDueDate.isValid &&
				vehileInputs.ownerName.isValid &&
				vehileInputs.mileage.isValid &&
				vehileInputs.depositAmount.isValid &&
				vehileInputs.duratio.isValid &&
				vehileInputs.insuranceExpire.isValid &&
				vehileInputs.insuranceIssued.isValid &&
				vehileInputs.issueDate.isValid &&
				vehileInputs.licenseExpire.isValid &&
				vehileInputs.licenseIssued.isValid &&
				vehileInputs.rentEndDate.isValid &&
				vehileInputs.type.isValid &&
				vehileInputs.vehicleNo.isValid
		)

		return () => {}
	}, [inputs, vehileInputs])

	const inputTextChangeHandler = (inputType, enteredValue) => {
		setInputs(currentInputValue => {
			return {
				...currentInputValue,
				[inputType]: { value: enteredValue, isValid: true }
			}
		})
	}

	const inputVechileTextChangeHandler = (inputType, enteredValue) => {
		setVehileInputs(currentInputValue => {
			return {
				...currentInputValue,
				[inputType]: { value: enteredValue, isValid: true }
			}
		})
	}

	const submitHandler = e => {
		const data = {
			gender: inputs.gender.value,
			dob: inputs.dob.value,
			maritalStatus: inputs.maritalStatus.value,
			email: inputs.email.value,
			clientName: inputs.clientName.value,
			joinedOn: inputs.joinedOn.value,
			contact1: inputs.contact1.value,
			contact2: inputs.contact2.value,
			address: inputs.address.value,
			typeofproof: inputs.typeofproof.value,
			proofNoExpire: inputs.proofNoExpire.value,
			company: inputs.company.value,
			nationality: inputs.nationality.value,
			emiClient: inputs.emiClient.value,
			totalVehicleAmount: inputs.totalVehicleAmount.value,
			benefitAmount: inputs.benefitAmount.value,
			typeofbenefit: inputs.typeofbenefit.value,
			emiAmount: inputs.emiAmount.value,
			emiDueDate: inputs.emiDueDate.value,
			emiJoined: inputs.emiJoined.value,
			joined: inputs.joined.value,
			benefitDueDate: inputs.benefitDueDate.value,

			ownerName: vehileInputs.ownerName.value,
			type: vehileInputs.type.value,
			vehicleNo: vehileInputs.vehicleNo.value,
			duratio: vehileInputs.duratio.value,
			depositAmount: vehileInputs.depositAmount.value,
			mileage: vehileInputs.mileage.value,
			issueDate: vehileInputs.issueDate.value,
			rentEndDate: vehileInputs.rentEndDate.value,
			insuranceIssued: vehileInputs.insuranceIssued.value,
			insuranceExpire: vehileInputs.insuranceExpire.value,
			licenseIssued: vehileInputs.licenseIssued.value,
			licenseExpire: vehileInputs.licenseExpire.value
		}

		const genterValid = data.gender?.trim().length > 0
		const dobValid = data.dob?.trim().length > 0
		const maritalStatusValid = data.maritalStatus?.trim().length > 0
		const emailValid = data.email?.trim().length > 0
		const clientNameValid = data.clientName?.trim().length > 0
		const joindOnValid = data.joinedOn?.trim().length > 0
		const contact1Valid = data.contact1?.trim().length > 0
		const contact2Valid = data.contact2?.trim().length > 0
		const addressValid = data.address?.trim().length > 0
		const typeofproofValid = data.typeofproof?.trim().length > 0
		const proofNoExpireValid = data.proofNoExpire?.trim().length > 0
		const companyValid = data.company?.trim().length > 0
		const nationalityValid = data.nationality?.trim().length > 0
		const emiClientValid = data.emiClient?.trim().length > 0
		const totalVehicleAmountValid = data.totalVehicleAmount?.trim().length > 0
		const benefitAmountValid = data.benefitAmount?.trim().length > 0
		const typeofbenefitValid = data.typeofbenefit?.trim().length > 0
		const emiAmountValid = data.emiAmount?.trim().length > 0
		const emiDueDateValid = data.emiDueDate?.trim().length > 0
		const emiJoinedValid = data.emiJoined?.trim().length > 0
		const joinedValid = data.joined?.trim().length > 0
		const benefitDueDateValid = data.benefitDueDate?.trim().length > 0

		const ownerValid = data.ownerName.trim().length > 0
		const typeValid = data.type.trim().length > 0
		const vehileNoValid = data.vehicleNo.trim().length > 0
		const durationValid = data.duratio.trim().length > 0
		const depositeAmountValid = data.depositAmount.trim().length > 0
		const milageValid = data.mileage.trim().length > 0
		const issuedDateValid = data.issueDate.trim().length > 0
		const rentEndDateValid = data.rentEndDate.trim().length > 0
		const insuranceIssuedValid = data.insuranceIssued.trim().length > 0
		const insuranceExpireValid = data.insuranceExpire.trim().length > 0
		const licenseIssuedValid = data.licenseIssued.trim().length > 0
		const licenseExpireValid = data.licenseExpire.trim().length > 0

		if (
			!genterValid ||
			!dobValid ||
			!maritalStatusValid ||
			!emailValid ||
			!clientNameValid ||
			!joindOnValid ||
			!contact1Valid ||
			!contact2Valid ||
			!addressValid ||
			!typeofproofValid ||
			!proofNoExpireValid ||
			!nationalityValid ||
			!emiClientValid ||
			!companyValid ||
			!benefitAmountValid ||
			!typeofbenefitValid ||
			!emiAmountValid ||
			!emiDueDateValid ||
			!emiJoinedValid ||
			!joinedValid ||
			!benefitDueDateValid ||
			!totalVehicleAmountValid ||
			!ownerValid ||
			!typeValid ||
			!vehileNoValid ||
			!durationValid ||
			!depositeAmountValid ||
			!milageValid ||
			!issuedDateValid ||
			!rentEndDateValid ||
			!insuranceIssuedValid ||
			!insuranceExpireValid ||
			!licenseIssuedValid ||
			!licenseExpireValid
		) {
			setInputs(currentInputs => {
				return {
					...currentInputs,
					gender: { value: currentInputs.gender.value, isValid: genterValid },
					dob: { value: currentInputs.dob.value, isValid: dobValid },
					maritalStatus: {
						value: currentInputs.maritalStatus.value,
						isValid: maritalStatusValid
					},
					email: { value: currentInputs.email.value, isValid: emailValid },
					clientName: {
						value: currentInputs.clientName.value,
						isValid: clientNameValid
					},
					joinedOn: {
						value: currentInputs.joinedOn.value,
						isValid: joindOnValid
					},
					contact1: {
						value: currentInputs.contact1.value,
						isValid: contact1Valid
					},
					contact2: {
						value: currentInputs.contact2.value,
						isValid: contact2Valid
					},
					address: {
						value: currentInputs.address.value,
						isValid: addressValid
					},
					typeofproof: {
						value: currentInputs.typeofproof.value,
						isValid: typeofproofValid
					},
					proofNoExpire: {
						value: currentInputs.proofNoExpire.value,
						isValid: proofNoExpireValid
					},
					nationality: {
						value: currentInputs.nationality.value,
						isValid: nationalityValid
					},
					emiClient: {
						value: currentInputs.emiClient.value,
						isValid: emiClientValid
					},
					company: {
						value: currentInputs.company.value,
						isValid: companyValid
					},
					benefitAmount: {
						value: currentInputs.benefitAmount.value,
						isValid: benefitAmountValid
					},
					typeofbenefit: {
						value: currentInputs.typeofbenefit.value,
						isValid: typeofbenefitValid
					},
					emiAmount: {
						value: currentInputs.emiAmount.value,
						isValid: emiAmountValid
					},
					emiDueDate: {
						value: currentInputs.emiDueDate.value,
						isValid: emiDueDateValid
					},
					emiJoined: {
						value: currentInputs.emiJoined.value,
						isValid: emiJoinedValid
					},
					joined: { value: currentInputs.joined.value, isValid: joinedValid },
					benefitDueDate: {
						value: currentInputs.benefitDueDate.value,
						isValid: benefitDueDateValid
					},
					totalVehicleAmount: {
						value: currentInputs.totalVehicleAmount.value,
						isValid: totalVehicleAmountValid
					}
				}
			})

			setVehileInputs(currentInputs => {
				return {
					...currentInputs,
					ownerName: {
						value: currentInputs.ownerName.value,
						isValid: ownerValid
					},
					type: { value: currentInputs.type.value, isValid: typeValid },
					vehicleNo: {
						value: currentInputs.vehicleNo.value,
						isValid: vehileNoValid
					},
					duratio: {
						value: currentInputs.duratio.value,
						isValid: durationValid
					},
					depositAmount: {
						value: currentInputs.depositAmount.value,
						isValid: depositeAmountValid
					},
					mileage: { value: currentInputs.mileage.value, isValid: milageValid },
					issueDate: {
						value: currentInputs.issueDate.value,
						isValid: issuedDateValid
					},
					rentEndDate: {
						value: currentInputs.rentEndDate.value,
						isValid: rentEndDateValid
					},
					insuranceIssued: {
						value: currentInputs.insuranceIssued.value,
						isValid: insuranceIssuedValid
					},
					insuranceExpire: {
						value: currentInputs.insuranceExpire.value,
						isValid: insuranceExpireValid
					},
					licenseIssued: {
						value: currentInputs.licenseIssued.value,
						isValid: licenseIssuedValid
					},
					licenseExpire: {
						value: currentInputs.licenseExpire.value,
						isValid: licenseExpireValid
					}
				}
			})
			return
		}

		dispatch(registerClient(data))
		setFormSubmit(true)
		// setInputs(initialData)
	}

	const handleModel = () => {
		setShowModal(current => !current)
	}

	useEffect(() => {}, [dispatch])

	return (
		<div className={`container-fluid ${styles.home}`}>
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
				<h2 style={{ textAlign: 'left' }} className="text-light m-2">
					Client Rent A Car Reg Details
				</h2>

				{/* REgistration Details */}
				<Row>
					<Col md={12}>
						{!formValid && (
							<Toast className="d-inline-block m-1" bg="warning">
								<Toast.Body className="dark w-100">
									Please Fill the Form Correctly!
								</Toast.Body>
							</Toast>
						)}
					</Col>
				</Row>
				<div className="row m-auto mb-2">
					<div className="col-10 col-md-3  mx-auto">
						<Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
							<Form.Label
								className="text-light text-left w-100"
								style={{
									textAlign: 'left '
								}}>
								Proof No
							</Form.Label>
							<Form.Control type="number" placeholder="86541" />
						</Form.Group>

						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label
								className="text-light text-left w-100"
								style={{ textAlign: 'left' }}>
								Genter
							</Form.Label>
							<Form.Select
								aria-label="Default select example"
								value={inputs.gender.value}
								onChange={e =>
									inputTextChangeHandler('gender', e.target.value)
								}>
								<option value="male">Male</option>
								<option value="female">Female</option>
							</Form.Select>
						</Form.Group>

						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label
								className="text-light text-left w-100"
								style={{ textAlign: 'left' }}>
								DOB
							</Form.Label>
							<Form.Control
								type="date"
								placeholder=""
								value={inputs.dob.value}
								onChange={e => inputTextChangeHandler('dob', e.target.value)}
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label
								className="text-light text-left w-100"
								style={{ textAlign: 'left' }}>
								Marital Status
							</Form.Label>
							<Form.Select
								aria-label="Default select example"
								value={inputs.maritalStatus.value}
								onChange={e =>
									inputTextChangeHandler('maritalStatus', e.target.value)
								}>
								<option value="single">Single</option>
								<option value="married">Married</option>
							</Form.Select>
						</Form.Group>

						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label
								className="text-light text-left w-100"
								style={{ textAlign: 'left' }}>
								Email
							</Form.Label>
							<Form.Control
								type="email"
								placeholder="example@gmail.com"
								value={inputs.email.value}
								onChange={e => inputTextChangeHandler('email', e.target.value)}
							/>
						</Form.Group>
					</div>

					<div className="col-10 col-md-3  mx-auto">
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label
								className="text-light text-left w-100"
								style={{ textAlign: 'left' }}>
								Client Name
							</Form.Label>
							<Form.Control
								type="text"
								value={inputs.clientName.value}
								onChange={e =>
									inputTextChangeHandler('clientName', e.target.value)
								}
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label
								className="text-light text-left w-100"
								style={{ textAlign: 'left' }}>
								Joined On
							</Form.Label>
							<Form.Control
								type="date"
								placeholder=""
								value={inputs.joinedOn.value}
								onChange={e =>
									inputTextChangeHandler('joinedOn', e.target.value)
								}
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label
								className="text-light text-left w-100"
								style={{ textAlign: 'left' }}>
								Contact1
							</Form.Label>
							<Form.Control
								type="number"
								value={inputs.contact1.value}
								onChange={e =>
									inputTextChangeHandler('contact1', e.target.value)
								}
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label
								className="text-light text-left w-100"
								style={{ textAlign: 'left' }}>
								Contact2
							</Form.Label>
							<Form.Control
								type="number"
								value={inputs.contact2.value}
								onChange={e =>
									inputTextChangeHandler('contact2', e.target.value)
								}
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label
								className="text-light text-left w-100"
								style={{ textAlign: 'left' }}>
								Address
							</Form.Label>
							<Form.Control
								type="text"
								value={inputs.address.value}
								onChange={e =>
									inputTextChangeHandler('address', e.target.value)
								}
							/>
						</Form.Group>
					</div>

					<div className="col-10 col-md-3  mx-auto">
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label
								className="text-light text-left w-100"
								style={{ textAlign: 'left' }}>
								Type of Proof
							</Form.Label>
							<Form.Select
								aria-label="Default select example"
								value={inputs.typeofproof.value}
								onChange={e =>
									inputTextChangeHandler('typeofproof', e.target.value)
								}>
								<option value="idno">ID No</option>
								<option value="passport">Passport No</option>
								<option value="drivinglicense">Driving License No</option>
							</Form.Select>
						</Form.Group>

						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label
								className="text-light text-left w-100"
								style={{ textAlign: 'left' }}>
								Proof No Expire :
							</Form.Label>
							<Form.Control
								type="date"
								placeholder=""
								value={inputs.proofNoExpire.value}
								onChange={e =>
									inputTextChangeHandler('proofNoExpire', e.target.value)
								}
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label
								className="text-light text-left w-100"
								style={{ textAlign: 'left' }}>
								Company Name /No
							</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								value={inputs.company.value}
								onChange={e =>
									inputTextChangeHandler('company', e.target.value)
								}
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label
								className="text-light text-left w-100"
								style={{ textAlign: 'left' }}>
								Nationality
							</Form.Label>
							<Form.Select
								aria-label="Default select example"
								value={inputs.nationality.value}
								onChange={e =>
									inputTextChangeHandler('nationality', e.target.value)
								}>
								{countries.map(country => (
									<option value={country.name} key={country.name}>
										{country.name}
									</option>
								))}
							</Form.Select>
						</Form.Group>

						<div className="row mt-4">
							<button className="btn btn-success">Edit Client Details</button>
						</div>
					</div>
				</div>

				{/* Vehile Details */}
				<div
					className="row m-auto  mt-5"
					style={{
						background: 'rgba(250, 242, 242, 0.15)',
						boxShadow: '0 8px 32px 0 rgba(81, 50, 250, 0.37)',
						backDropFilter: ' blur(2.5px)',
						webkitBackdropFilter: ' blur(2.5px)',

						border: '1px solid rgba(255, 255, 255, 0.18)'
					}}>
					<h2 style={{ textAlign: 'left' }} className="text-light">
						Vehicle Details
					</h2>

					<div className="row m-auto ">
						<div className="col-10 col-md-3  mx-auto">
							<Form.Group className="mb-3">
								<Form.Label
									className="text-light text-left w-100"
									style={{
										textAlign: 'left'
									}}>
									Owner
								</Form.Label>
								<Form.Control
									type="text"
									placeholder="Rifkhan"
									value={vehileInputs.ownerName.value}
									onChange={e =>
										inputVechileTextChangeHandler('ownerName', e.target.value)
									}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label
									className="text-light text-left w-100"
									style={{
										textAlign: 'left'
									}}>
									Vehicle No
								</Form.Label>
								<Form.Control
									type="text"
									placeholder="bif854"
									value={vehileInputs.vehicleNo.value}
									onChange={e =>
										inputVechileTextChangeHandler('vehicleNo', e.target.value)
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label
									className="text-light text-left w-100"
									style={{
										textAlign: 'left'
									}}>
									Deposite Amount :
								</Form.Label>
								<Form.Control
									type="number"
									placeholder=""
									value={vehileInputs.depositAmount.value}
									onChange={e =>
										inputVechileTextChangeHandler(
											'depositAmount',
											e.target.value
										)
									}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label
									className="text-light text-left w-100"
									style={{
										textAlign: 'left'
									}}>
									Duration :
								</Form.Label>
								<Form.Control
									type="number"
									placeholder=""
									value={vehileInputs.duratio.value}
									onChange={e =>
										inputVechileTextChangeHandler('duratio', e.target.value)
									}
								/>
							</Form.Group>
						</div>

						<div className="col-10 col-md-3  mx-auto">
							<Form.Group className="mb-3">
								<Form.Label
									className="text-light text-left w-100"
									style={{
										textAlign: 'left'
									}}>
									Type :
								</Form.Label>
								<Form.Control
									type="text"
									placeholder=""
									value={vehileInputs.type.value}
									onChange={e =>
										inputVechileTextChangeHandler('type', e.target.value)
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label
									className="text-light text-left w-100"
									style={{
										textAlign: 'left'
									}}>
									Milage :
								</Form.Label>
								<Form.Control
									type="text"
									placeholder=""
									value={vehileInputs.mileage.value}
									onChange={e =>
										inputVechileTextChangeHandler('mileage', e.target.value)
									}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label
									className="text-light text-left w-100"
									style={{
										textAlign: 'left'
									}}>
									Issue Date :
								</Form.Label>
								<Form.Control
									type="date"
									placeholder=""
									value={vehileInputs.issueDate.value}
									onChange={e =>
										inputVechileTextChangeHandler('issueDate', e.target.value)
									}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label
									className="text-light text-left w-100"
									style={{
										textAlign: 'left'
									}}>
									Rent End Date :
								</Form.Label>
								<Form.Control
									type="date"
									placeholder=""
									value={vehileInputs.rentEndDate.value}
									onChange={e =>
										inputVechileTextChangeHandler('rentEndDate', e.target.value)
									}
								/>
							</Form.Group>
						</div>

						<div className="col-10 col-md-3  mx-auto">
							<Form.Group className="mb-3">
								<Form.Label
									className="text-light text-left w-100"
									style={{
										textAlign: 'left'
									}}>
									Insurance Issued :
								</Form.Label>
								<Form.Control
									type="date"
									placeholder=""
									value={vehileInputs.insuranceIssued.value}
									onChange={e =>
										inputVechileTextChangeHandler(
											'insuranceIssued',
											e.target.value
										)
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label
									className="text-light text-left w-100"
									style={{
										textAlign: 'left'
									}}>
									Insurance Expire :
								</Form.Label>
								<Form.Control
									type="date"
									placeholder=""
									value={vehileInputs.insuranceExpire.value}
									onChange={e =>
										inputVechileTextChangeHandler(
											'insuranceExpire',
											e.target.value
										)
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label
									className="text-light text-left w-100"
									style={{
										textAlign: 'left'
									}}>
									License Issued :
								</Form.Label>
								<Form.Control
									type="date"
									placeholder=""
									value={vehileInputs.licenseIssued.value}
									onChange={e =>
										inputVechileTextChangeHandler(
											'licenseIssued',
											e.target.value
										)
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label
									className="text-light text-left w-100"
									style={{
										textAlign: 'left'
									}}>
									License Expire :
								</Form.Label>
								<Form.Control
									type="date"
									placeholder="58051"
									value={vehileInputs.licenseExpire.value}
									onChange={e =>
										inputVechileTextChangeHandler(
											'licenseExpire',
											e.target.value
										)
									}
								/>
							</Form.Group>
						</div>
					</div>
				</div>

				{/*  EMI Details */}
				<div className="row m-auto mt-5">
					<div className="col-10 col-md-3  mx-auto">
						<Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
							<Form.Label
								className="text-light text-left w-100"
								style={{
									textAlign: 'left '
								}}>
								Are You EMI Client :
							</Form.Label>
							<Form.Select
								value={inputs.emiClient.value}
								onChange={e =>
									inputTextChangeHandler('emiClient', e.target.value)
								}>
								<option value="yes">Yes</option>
								<option value="no">No</option>
							</Form.Select>
						</Form.Group>
						<Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
							<Form.Label
								className="text-light text-left w-100"
								style={{
									textAlign: 'left '
								}}>
								Type Of Benefit / Commision :
							</Form.Label>
							<Form.Select
								value={inputs.typeofbenefit.value}
								onChange={e =>
									inputTextChangeHandler('typeofbenefit', e.target.value)
								}>
								<option value="monthly">Monthly</option>
								<option value="yearly">Yearly</option>
								<option value="milage">Milage</option>
							</Form.Select>
						</Form.Group>

						<Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
							<Form.Label
								className="text-light text-left w-100"
								style={{
									textAlign: 'left '
								}}>
								Joined :
							</Form.Label>
							<Form.Control
								type="date"
								value={inputs.joined.value}
								onChange={e => inputTextChangeHandler('joined', e.target.value)}
							/>
						</Form.Group>
					</div>

					<div className="col-10 col-md-3  mx-auto">
						<Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
							<Form.Label
								className="text-light text-left w-100"
								style={{
									textAlign: 'left '
								}}>
								Tot Vehile Amount :
							</Form.Label>
							<Form.Control
								type="number"
								value={inputs.totalVehicleAmount.value}
								onChange={e =>
									inputTextChangeHandler('totalVehicleAmount', e.target.value)
								}
							/>
						</Form.Group>

						<Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
							<Form.Label
								className="text-light text-left w-100"
								style={{
									textAlign: 'left '
								}}>
								EMI Amount :
							</Form.Label>
							<Form.Control
								type="number"
								value={inputs.emiAmount.value}
								onChange={e =>
									inputTextChangeHandler('emiAmount', e.target.value)
								}
							/>
						</Form.Group>

						<Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
							<Form.Label
								className="text-light text-left w-100"
								style={{
									textAlign: 'left '
								}}>
								EMI Joined :
							</Form.Label>
							<Form.Control
								type="date"
								value={inputs.emiJoined.value}
								onChange={e =>
									inputTextChangeHandler('emiJoined', e.target.value)
								}
							/>
						</Form.Group>
					</div>

					<div className="col-10 col-md-3  mx-auto">
						<Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
							<Form.Label
								className="text-light text-left w-100"
								style={{
									textAlign: 'left '
								}}>
								Benefit Amount :
							</Form.Label>
							<Form.Control
								type="number"
								value={inputs.benefitAmount.value}
								onChange={e =>
									inputTextChangeHandler('benefitAmount', e.target.value)
								}
							/>
						</Form.Group>

						<Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
							<Form.Label
								className="text-light text-left w-100"
								style={{
									textAlign: 'left '
								}}>
								Due Date EMI :
							</Form.Label>
							<Form.Control
								type="date"
								value={inputs.emiDueDate.value}
								onChange={e =>
									inputTextChangeHandler('emiDueDate', e.target.value)
								}
							/>
						</Form.Group>

						<Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
							<Form.Label
								className="text-light text-left w-100"
								style={{
									textAlign: 'left '
								}}>
								Benefit Due Date :
							</Form.Label>
							<Form.Control
								type="date"
								value={inputs.benefitDueDate.value}
								onChange={e =>
									inputTextChangeHandler('benefitDueDate', e.target.value)
								}
							/>
						</Form.Group>
					</div>
				</div>

				{/* Buttons */}
				<div className="row m-auto  my-3">
					<div className="col-sm-12 col-md-3 mt-2">
						<Button
							variant="success"
							className=" col-10"
							as="button"
							type="button">
							Refresh
						</Button>
					</div>

					<div className="col-sm-12  col-md-3  mt-2">
						<Button
							variant="danger"
							className=" col-10 text-light"
							type="submit"
							disabled={!formValid}
							onClick={submitHandler}>
							Save
						</Button>
					</div>
					<div className="col-sm-12  col-md-3 mt-2 ">
						<Button variant="primary" className=" col-10" type="submit">
							Print
						</Button>
					</div>

					<div className="col-sm-12  col-md-3  mt-2">
						<Button variant="warning" className=" col-10" as="button">
							Clear
						</Button>
					</div>
				</div>
			</div>

			<div className="row" style={{ marginTop: '3vh', color: 'white' }}>
				<h2>Data Activities</h2>
				<RenderCarTable initialData={list} />
			</div>

			<PlusButton />

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

export default Rent
