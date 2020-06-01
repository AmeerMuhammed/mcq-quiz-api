const Question = require('../models/Question')

exports.getQuestions = async (req,res) => res.send(await Question.aggregate([{ $sample: { size: Number(req.params.count)>0? Number(req.params.count) : 1 } }]))

exports.addQuestions = async (req,res) => {
    const question = new Question({ question: req.body.question.trim(), option1: req.body.option1.trim(), option2: req.body.option2.trim(), option3: req.body.option3.trim(), option4: req.body.option4.trim(), answer: req.body.answer.trim() })
    await question.save().then(()=>res.sendStatus(200)).catch((err)=>res.send(err))
}


