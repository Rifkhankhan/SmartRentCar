import { createSlice } from '@reduxjs/toolkit'

export const rentSlice = createSlice({
	name: 'rent',
	initialState: {
		isLoading: false,
		rentClients: []
	},
	reducers: {
		handleLoading: (state, action) => {
			state.isLoading = !state.isLoading
		},
		registerClient: (state, action) => {
			state.rentClients = [...action.payload]
		},
		getClients: (state, action) => {
			state.rentClients = [...action.payload]
		},

		deleteAccountRequest: (state, action) => {
			state.rentClients = state.rentClients.filter(
				accountRequest => accountRequest.arid !== action.payload.arid
			)
		},
		updateAccountRequest: (state, action) => {
			const updatedAdvance = {
				...action.payload
			}
			console.log(updatedAdvance)
			// Find the index of the object to update
			const index = state.rentClients.findIndex(
				accountRequest => accountRequest.arid === action.payload.arid
			)

			if (index !== -1) {
				// Create a new array with the updated object
				const updatedAdvances = [
					...state.rentClients.slice(0, index), // elements before the updated object
					updatedAdvance, // updated object
					...state.rentClients.slice(index + 1) // elements after the updated object
				]

				// state.accountRequests = [...updatedAdvances]
			}
			state.rentClients = [...action.payload]
		}
	}
})

export const RentActions = rentSlice.actions

export default rentSlice.reducer
