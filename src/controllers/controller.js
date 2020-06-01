const Question = require('../models/Question')

const validateQuestion = (body) => {
    return new Promise((resolve, reject) => {
            if(typeof body.question == 'undefined' || typeof body.option1 == 'undefined' || typeof body.option2 == 'undefined' || typeof body.option3 == 'undefined' || typeof body.option4 == 'undefined' || typeof body.answer == 'undefined') return reject({"Error":"400:Bad Request. All fields mandatory!"})
            body.question=body.question.trim(); body.option1=body.option1.trim(); body.option2=body.option2.trim(); body.option3=body.option3.trim(); body.option4=body.option4.trim(); body.answer=body.answer.trim()
            if(!(body.answer==body.option1 || body.answer==body.option2  || body.answer==body.option3  || body.answer==body.option4 )) return reject({"Error":"400:Bad Request. Answer must be equal to any of the given options!"})
            resolve() })
}

exports.getQuestions = async (req,res) => { return res.send(await Question.aggregate([{ $sample: { size: Number(req.params.count)>0? Number(req.params.count) : 1 } }])) }

exports.addQuestions = async (req,res) => {
    await validateQuestion(req.body)
    .then(async ()=>{
            const question = new Question({ question: req.body.question, option1: req.body.option1, option2: req.body.option2, option3: req.body.option3, option4: req.body.option4, answer: req.body.answer })
            await question.save().then((doc)=>{return res.send(doc)}).catch((err)=>{return res.send(err)})
        })
    .catch((err)=>{return res.send(err)})

}

exports.updateQuestion = async(req,res) =>{
    await validateQuestion(req.body)
    .then (async()=>{
        await Question.findByIdAndUpdate({_id: req.body._id}, {$set:{question: req.body.question, option1: req.body.option1, option2: req.body.option2, option3: req.body.option3, option4: req.body.option4, answer: req.body.answer}}, {new: true}, (err, doc) => {
            if (err) return res.send({"Error":"502: Something went wrong!"})
            return res.send(doc) })
    })
    .catch((err)=>{return res.send(err)}) 
}

exports.deleteQuestion = async(req,res) =>{
        await Question.findByIdAndDelete({_id: req.body._id}, (err, doc) => {
            if (err) return res.send({"Error":"502: Something went wrong!"})
            return res.send(doc) })
}
