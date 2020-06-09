const crypto = require('crypto')
const Question = require('../models/Question')
const User = require('../models/User')
require('./validator')

exports.getQuestions = async (req, res) => {
    await User.findOne({ apikey: req.params.key }, async function (err, user) {
        if (user) return res.send(await Question.aggregate([{ $sample: { size: Number(req.params.count) > 0 ? Number(req.params.count) : 1 } }]))
        if (!user) return res.send({ "Error": "401: Authentication error!" })
    })
}

exports.addQuestions = async (req, res) => {
    await User.findOne({ apikey: req.body.apikey }, async function (err, user) {
        if (user) {
            await validateQuestion(req.body)
                .then(async () => {
                    const question = new Question({ question: req.body.question, option1: req.body.option1, option2: req.body.option2, option3: req.body.option3, option4: req.body.option4, answer: req.body.answer })
                    await question.save().then((doc) => { return res.send({ "method": "post", "status": "success", doc }) }).catch((err) => { return res.send(err) })
                })
                .catch((err) => { return res.send(err) })
        }
        if (!user) {
            return res.send({ "Error": "401: Authentication error!" })
        }
    })
}

exports.updateQuestion = async (req, res) => {
    await User.findOne({ apikey: req.body.apikey }, async function (err, user) {
        if (user) {
            await validateQuestion(req.body)
                .then(async () => {
                    await Question.findByIdAndUpdate({ _id: req.body._id }, { $set: { question: req.body.question, option1: req.body.option1, option2: req.body.option2, option3: req.body.option3, option4: req.body.option4, answer: req.body.answer } }, { new: true }, (err, doc) => {
                        if (err) return res.send({ "Error": "502: Something went wrong!" })
                        return res.send({ "method": "put", "status": "success", doc })
                    })
                })
                .catch((err) => { return res.send(err) })
        }
        if (!user) {
            return res.send({ "Error": "401: Authentication error!" })
        }
    })
}

exports.deleteQuestion = async (req, res) => {
    await User.findOne({ apikey: req.body.apikey }, async function (err, user) {
        if (user) {
    await Question.findByIdAndDelete({ _id: req.body._id }, (err, doc) => {
        if (err) return res.send({ "Error": "502: Something went wrong!" })
        return res.send({ "method": "delete", "status": "success", doc })
    })
}
if (!user) {
    return res.send({ "Error": "401: Authentication error!" })
}
})
}

exports.renderIndex = (req, res) => { res.render('index', { id: req.params.id }) }

exports.createHash = () => {
    let current_date = (new Date()).valueOf().toString()
    let random = Math.random().toString()
    return crypto.createHash('sha1').update(current_date + random).digest('hex')
}