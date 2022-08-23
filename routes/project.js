const express = require('express')
const multer = require('multer')
const { all, store, destroy, update, show } = require('../controllers/project')

const router = express.Router()
const upload = multer()

router.route('/').get(all).post(upload.any(), store)
router.route('/:slug').get(show).patch(update).delete(destroy)

module.exports = router
