const express = require('express')
const router = express.Router()
const controller = require('./controllers/controller')

router.get('/',controller.getQuestions)
router.get('/:count',controller.getQuestions)
router.post('/',controller.addQuestions)

module.exports = router