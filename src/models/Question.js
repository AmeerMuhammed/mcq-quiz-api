const mongoose = require('mongoose')

let opt1,opt2,opt3,opt4

const QuestionSchema = new mongoose.Schema({
    
    question: {type: String, required:true,},
    option1: 
    {type: String, required:true,
     validate(value) { opt1=value }
    },
    option2: 
    {type: String, required:true,
     validate(value) { opt2=value }
    },
    option3: 
    {type: String, required:true,
     validate(value) { opt3=value }
    },
    option4: 
    {type: String, required:true,
     validate(value) { opt4=value }
    },
    answer: 
    {type: String, 
     required:true,
     validate(value)
     {
        if(!(value==opt1 || value==opt2 || value==opt3 || value==opt4 ))
            throw new Error('Answer must be equal to any of the given options')
     }
    },
})

module.exports = mongoose.model('questions',QuestionSchema)