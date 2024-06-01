import swal from 'sweetalert'
import * as RentApis from '../Apis/RentApis'
import { RentActions } from '../store/RentSlice'

export const registerClient = formData => async dispatch => {
	dispatch(RentActions.handleLoading())
	try {
		const { data } = await RentApis.registerClient(formData)

		if (data.success) {
			dispatch(RentActions.registerClient(data.data))
			swal('Successfully Created!', 'Now You can Continue', 'success')
		}
	} catch (error) {
		if (error.response?.status === 400) {
			swal('Oops! Something Wrong', error.response.data.message, 'error')
		} else if (error.response?.status === 404) {
			swal("You don't have Account", error.response.data.message, 'error')
		} else if (error.response?.status === 409) {
			swal('Oops! Something Wrong', error.response.data.message, 'error')
		} else if (error.response?.status === 408) {
			swal('Oops! You have no access', error.response.data.message, 'error')
		} else if (error.response?.status === 500) {
			swal('Internal Server Error', error.response.data.message, 'error')
		}
	}
	dispatch(RentActions.handleLoading())
}

export const getClients = () => async dispatch => {
	dispatch(RentActions.handleLoading())
	try {
		const { data } = await RentApis.getClients()

		if (data.success) {
			dispatch(RentActions.getClients(data.data))
		}
	} catch (error) {
		if (error.response?.status === 400) {
			swal('Oops! Something Wrong', error.response.data.message, 'error')
		} else if (error.response?.status === 404) {
			swal("You don't have Account", error.response.data.message, 'error')
		} else if (error.response?.status === 409) {
			swal('Oops! Something Wrong', error.response.data.message, 'error')
		} else if (error.response?.status === 408) {
			swal('Oops! You have no access', error.response.data.message, 'error')
		} else if (error.response?.status === 500) {
			swal('Internal Server Error', error.response.data.message, 'error')
		}
	}
	dispatch(RentActions.handleLoading())
}

// export const updateAccountRequest = (formData, datas) => async dispatch => {
// 	dispatch(AccountRequestActions.handleLoading())

// 	try {
// 		const { data } = await AccountRequestApis.updateAccountRequest(
// 			formData.arid,
// 			formData
// 		)
// 		if (data.success) {
// 			dispatch(AccountRequestActions.createAccountRequest(data.requests))
// 			swal('Successfully Updated!', 'Now You can Continue', 'success')
// 		}
// 	} catch (error) {
// 		if (error.response?.status === 400) {
// 			swal('Oops! Something Wrong', error.response.data.message, 'error')
// 		} else if (error.response?.status === 404) {
// 			swal("You don't have Account", error.response.data.message, 'error')
// 		} else if (error.response?.status === 409) {
// 			swal('Oops! Something Wrong', error.response.data.message, 'error')
// 		} else if (error.response?.status === 408) {
// 			swal('Oops! You have no access', error.response.data.message, 'error')
// 		} else if (error.response?.status === 500) {
// 			swal('Internal Server Error', error.response.data.message, 'error')
// 		}
// 	}
// 	dispatch(AccountRequestActions.handleLoading())
// }

// export const deleteAccountRequest = formData => async dispatch => {
// 	dispatch(AccountRequestActions.handleLoading())
// 	try {
// 		const { data } = await AccountRequestApis.disableAccountRequest(formData)

// 		if (data.success) {
// 			dispatch(AccountRequestActions.deleteAccountRequest(data.product))
// 			swal('Successfully Deleted!', 'Now You can Continue', 'success')
// 		} else {
// 			swal('Oops! Something Wrong', 'Try again please!', 'error')
// 		}
// 	} catch (error) {
// 		if (error.response?.status === 400) {
// 			swal('Oops! Something Wrong', error.response.data.message, 'error')
// 		} else if (error.response?.status === 404) {
// 			swal("You don't have Account", error.response.data.message, 'error')
// 		} else if (error.response?.status === 409) {
// 			swal('Oops! Something Wrong', error.response.data.message, 'error')
// 		} else if (error.response?.status === 408) {
// 			swal('Oops! You have no access', error.response.data.message, 'error')
// 		} else if (error.response?.status === 500) {
// 			swal('Internal Server Error', error.response.data.message, 'error')
// 		}
// 	}
// 	dispatch(AccountRequestActions.handleLoading())
// }
