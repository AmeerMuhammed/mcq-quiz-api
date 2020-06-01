const Question = require('../models/Question')
require('./validator')

exports.getQuestions = async (req,res) => { return res.send(await Question.aggregate([{ $sample: { size: Number(req.params.count)>0? Number(req.params.count) : 1 } }])) }

exports.addQuestions = async (req,res) => {
    await validateQuestion(req.body)
    .then(async ()=>{
            const question = new Question({ question: req.body.question, option1: req.body.option1, option2: req.body.option2, option3: req.body.option3, option4: req.body.option4, answer: req.body.answer })
            await question.save().then((doc)=>{return res.send({"method":"post","status":"success",doc})}).catch((err)=>{return res.send(err)})
        })
    .catch((err)=>{return res.send(err)})
}

exports.updateQuestion = async(req,res) =>{
    await validateQuestion(req.body)
    .then (async()=>{
        await Question.findByIdAndUpdate({_id: req.body._id}, {$set:{question: req.body.question, option1: req.body.option1, option2: req.body.option2, option3: req.body.option3, option4: req.body.option4, answer: req.body.answer}}, {new: true}, (err, doc) => {
            if (err) return res.send({"Error":"502: Something went wrong!"})
            return res.send({"method":"put","status":"success",doc}) })
    })
    .catch((err)=>{return res.send(err)}) 
}

exports.deleteQuestion = async(req,res) =>{
        await Question.findByIdAndDelete({_id: req.body._id}, (err, doc) => {
            if (err) return res.send({"Error":"502: Something went wrong!"})
            return res.send({"method":"delete","status":"success",doc}) })
}