module.exports = validateQuestion = (body) => {
    return new Promise((resolve, reject) => {
            if(typeof body.question == 'undefined' || typeof body.option1 == 'undefined' || typeof body.option2 == 'undefined' || typeof body.option3 == 'undefined' || typeof body.option4 == 'undefined' || typeof body.answer == 'undefined') return reject({"Error":"400:Bad Request. All fields mandatory!"})
            body.question=body.question.trim(); body.option1=body.option1.trim(); body.option2=body.option2.trim(); body.option3=body.option3.trim(); body.option4=body.option4.trim(); body.answer=body.answer.trim()
            if(!(body.answer==body.option1 || body.answer==body.option2  || body.answer==body.option3  || body.answer==body.option4 )) return reject({"Error":"400:Bad Request. Answer must be equal to any of the given options!"})
            resolve() })
}