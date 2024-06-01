const router = require('express').Router()
const {
	registerClient,
	getRequest,
	getClients,
	updateRequest,
	ToggleRequest,
	getActors
} = require('../Controllers/RentController')
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })

// add new request
router.post('/', upload.single('file'), registerClient)

// gets
router.get('/', getClients)

// update
// router.put('/:id', upload.single('file'), updateRequest)

// ToggleDisable
// router.put('/disable/:id', ToggleRequest)

// get product
// router.get('/:id', getRequest)

module.exports = router
