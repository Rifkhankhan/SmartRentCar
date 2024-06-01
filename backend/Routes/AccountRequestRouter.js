const router = require('express').Router()
const {
	CreateRequest,
	getRequest,
	getRequests,
	updateRequest,
	ToggleRequest,
	getActors
} = require('../Controllers/AccountRequestController')
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })

// add new request
router.post('/', upload.single('file'), CreateRequest)

// gets
router.get('/', getRequests)

// update
router.put('/:id', upload.single('file'), updateRequest)

// ToggleDisable
router.put('/disable/:id', ToggleRequest)

// get product
router.get('/:id', getRequest)

module.exports = router
