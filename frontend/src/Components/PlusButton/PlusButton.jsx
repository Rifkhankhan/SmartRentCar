import React from 'react'
import styles from './PlusButton.module.css'
import { useNavigate } from 'react-router-dom'

const PlusButton = () => {
	const navigate = useNavigate()

	const navigatePage = () => {
		navigate('/billing')
	}

	return (
		<button
			className={`btn btn-warning  ${styles.plusButton}`}
			onClick={navigatePage}>
			Billing Menu
		</button>
	)
}

export default PlusButton
