
import { useEffect, useState } from 'react'
import List from './components/List'
import Form from './components/Form'
import noteService from './services/Notes.js'
import Notification from './components/Notification'
import index from './index.css'


const App = () => {


  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNro, setNewNro] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  console.log(persons)

  useEffect(() => {
    noteService
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])


  const addName = (event) => {
    event.preventDefault()
    const is = persons.filter((person) => person.name === newName)
    if (is.length !== 0){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new number?`)){
        const index = persons.findIndex((person => person.name === newName))
        noteService
        .newNro(persons[index].id, newNro, newName)
        .then(persons[index].nro = newNro)
        .catch(error => {
          setErrorMessage(
            `${persons[index].name} has already been deleted from the server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
        )

        setErrorMessage(
          `${persons[index].name}s number was changed`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
  
          setNewName('')
          setNewNro('')
        }
      }

    else {

      const person = {
        name: newName,
        nro: newNro,
        id: Math.random().toString(16).slice(2),
      }

       noteService
        .create(person)
        .then(response => {
        setPersons(persons.concat(response))
        console.log(response)
      })

      setErrorMessage(
        `${person.name} was added to phonebook`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

      setNewName('')
      setNewNro('')
    }
  }


  function deletePerson(id, name) {
    if (window.confirm("Are you sure you want to delete this")) {

    noteService
    .deleteName(id)
    .then(setPersons(persons.filter(person => person.id !== id)))

    }
    setErrorMessage(
      `${name} was deleted from the phonebook`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }


   const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNroChange = (event) => {
    setNewNro(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)

  }

  
  return (
    <div>

    <Notification message = {errorMessage}/>

      <h2>Phonebook</h2>

      <Form name = {"filter shown with"} value = {newFilter} handle = {handleFilterChange}/>

        <h2> Add a new </h2>

        <form onSubmit={addName}>

        <Form name = {"name"} value = {newName} handle = {handleNameChange}/>
        <Form name = {"Phone number"} value = {newNro} handle = {handleNroChange} />

        <button onClick = {addName}> add </button>
      </form>
      
      <h2>Numbers</h2>

      <List persons = {persons} filter = {newFilter} onDelete = {deletePerson}/>  

    </div>
  )
}

export default App