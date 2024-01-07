const express = require('express')
const app = express()
const cors = require('cors')
var morgan = require('morgan')
app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :body'));

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, res) => {
    res.send('<h1>Phonebook backend</h1>')
  })

app.get('/info', (req, res) => {
    const numOfPeople = persons.length
    const date = new Date().toString()
    res.send(`<p>Phonebook has info of ${numOfPeople} people. <br/>${date}</p>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => 
        p.id === id 
    )
    if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => 
        p.id !== id 
    )
    response.status(204).end()
})

app.post('/api/persons/', (req, res)=>{
    const { name, number } = req.body
    const randomId = function (max) {
        return Math.floor(Math.random() * max);
    }
    const person = {
        name: name,
        number: number,
        id: randomId(1000)
    }
    function detectSameName (inputName) {
        const person = persons.find(p =>  
            p.name.toLocaleLowerCase() === inputName.toLocaleLowerCase() 
        )
        if (person) {
            return true
        } else {
            return false
        }
    }

    if (!name || !number) {
        return res.status(400).json({ 
            error: 'content missing' 
        })
    }

    if (detectSameName(name)) {
        return res.status(400).json({ 
            error: 'name must be unique'
        })
    }

    persons = [...persons, person]
    res.status(201).json(`${name} has been added to the phonebook`);
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})