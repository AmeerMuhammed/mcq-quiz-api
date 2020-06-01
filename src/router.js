const express = require('express')
const router = express.Router()
const controller = require('./controllers/controller')

router.get('/',controller.getQuestions)
router.get('/:count',controller.getQuestions)
router.post('/',controller.addQuestions)
router.put('/',controller.updateQuestion)
router.delete('/',controller.deleteQuestion )

module.exports = router