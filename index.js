const express = require('express')
const app = express()

app.use(express.json())

//JSON Data
let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

// Get Root
app.get('/', (request, response) => {
    response.send('<h1>Hello!<h1>')
})

// Information how many people on the list & Fetching Time/Date
app.get('/info', (request, response) => {
    //Get Server time
    const dateTime = new Date()
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${dateTime}</p>`)
})

// Get All Info From JSON Table
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// Get Info By Id And Send Error If Not Found
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

// Delete Person By Id
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

// Generate Random Id Between 20 - 1000
const generateId = () => {
    const randomId = Math.floor(Math.random() * 1000) + 100
    randomId(...persons.map(n => n.id))

    return randomId
}
// Add Person To Persons JSON Table
app.post('/api/persons', (request, response) => {

    const body = request.body
    // Error Handling For Missing Data
    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    else if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number

    }

    persons = persons.concat(person)
    console.log(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
}) 