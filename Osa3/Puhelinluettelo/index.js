const express = require('express')
const app = express()
var morgan = require('morgan')


app.use(express.json())

let persons = [
          {
            "name": "Arto Hellas",
            "nro": "040-123456",
            "id": 1
          },
          {
            "name": "Ada Lovelace",
            "nro": "39-44-5323523",
            "id": 2
          },
          {
            "name": "Dan Abramov",
            "nro": "12-43-234345",
            "id": 3
          },
          {
            "name": "Mary Poppendick",
            "nro": "39-23-6423122",
            "id": 4
          }
]

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(
    `
    <div>
        <p> Phonebook has info for ${persons.length} people </p>
    </div>
    <div>
        <p>${date}</p>
    </div>
    `
  )
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    console.log("Toimi")
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    console.log(person)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end
    }
  })

  app.delete('/api/persons', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()

})

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)

    if (!body.name) {
        return response.status(400).json({ 
          error: 'Name missing' 
        })
      }
    
    if (!body.nro) {
      return response.status(400).json({ 
        error: 'Number missing' 
      })
    }

    if (persons.filter(person => person.name === body.name).length > 0){
        return response.status(400).json({ 
            error: 'Name already in list' 
          })
    }

    const person = {
      name: body.name,
      nro: body.nro,
      id: Math.random().toString(16).slice(2),
    }
    

    persons = persons.concat(person)
    response.json(person)

})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})