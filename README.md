# RESTful API for MCQ(Multiple Choice Question) Quiz

* API is hosted at: **https://mcq-quiz-app.herokuapp.com/**
* Generate API Key **https://ameermuhammed.github.io/mcq-quiz-api/**


* *Tools and technologies used:*
  * Node.js (Express)
  * MongoDB

# Endpoints

|    Method    | Endpoint                   | Description                          |
|:------------:| -------------------------- |:-------------------------------------| 
|GET           | /***{APIKEY}***/                 | Returns one random question          |
|GET           | /getBulk/***{APIKEY}***/***{COUNT}***/ | Returns n(**COUNT**) random questions| 
|POST          | /             | <br>Sample POST request body:<pre>{<br>"apikey":"***{API KEY}***"<br>"question":"World’s highest Hockey ground is located in?",<br>"option1":"Chail",<br>"option2":"Shilaroo",<br>"option3":"Parwanoo"<br>"option4":"Delhi",<br>"answer":"Shilaroo"<br>}</pre>|
|PUT | /|<br>Sample PUT request body:<pre>{<br>"apikey":"***{API KEY}***"<br>"_id": "***{ID}***",<br>"question":"World’s highest Hockey ground is located in?",<br>"option1":"Chail",<br>"option2":"Shilaroo",<br>"option3":"Parwanoo"<br>"option4":"Delhi",<br>"answer":"Shilaroo"<br>}</pre>|
|DELETE|/|<br>Sample DELETE request body:<pre>{<br>"apikey":"***{API KEY}***"<br>"_id": "***{ID}***"<br>}</pre>|
# Samples
## GET /***{APIKEY}***/
*Response:*
```
[
    {
        "_id": "5ee1fb4bd8f42f0017bae794",
        "question": "Which of the following is not an equatorial crop?",
        "option1": "Coconut",
        "option2": "Rubber",
        "option3": "Oil Palm",
        "option4": "Banana",
        "answer": "Banana",
        "__v": 0
    }
]
```
## GET /getBulk/***{APIKEY}/{COUNT}***/
*Response:*
```
[
    {
        "_id": "5ee1fba3d8f42f0017bae79a",
        "question": "Which of the following is the least dense planet among all the planets?",
        "option1": "Earth",
        "option2": "Uranus",
        "option3": "Jupiter",
        "option4": "Saturn",
        "answer": "Saturn",
        "__v": 0
    },
    {
        "_id": "5ee1fb84d8f42f0017bae798",
        "question": "Expanding Universe hypothesis is also known as:",
        "option1": "Nebular theory",
        "option2": "Big Bang theory",
        "option3": "Steady state theory",
        "option4": "None of the above",
        "answer": "Big Bang theory",
        "__v": 0
    },
    {
        "_id": "5ee1fbe8d8f42f0017bae79f",
        "question": "Wings of Fire is an autobiography of",
        "option1": "A. P. J. Abdul Kalam",
        "option2": "Rabindranath Tagore",
        "option3": "Pranab Mukherjee",
        "option4": "None of these",
        "answer": "A. P. J. Abdul Kalam",
        "__v": 0
    },
    {
        "_id": "5ee1ffb9d8f42f0017bae7ac",
        "question": "In which year the Jnanpith Award was first awarded?",
        "option1": "1965",
        "option2": "1955",
        "option3": "1972",
        "option4": "None of these",
        "answer": "1965",
        "__v": 0
    }
]
```
