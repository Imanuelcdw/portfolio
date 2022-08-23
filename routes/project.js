const express = require('express')
const { all, store, destroy, update, show } = require('../controllers/project')

const router = express.Router()

router.route('/').get(all).post(store)
router.route('/:slug').get(show).patch(update).delete(destroy)

module.exports = router
