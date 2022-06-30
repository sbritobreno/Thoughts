const express = require('express')
const router = express.Router()
const ThoughtController = require('../controllers/ThoughtController')
// helpers
const checkAuth = require('../helpers/auth').checkAuth

router.get('/', ThoughtController.showThoughts)
router.get('/dashboard', checkAuth, ThoughtController.dashboard)

module.exports = router