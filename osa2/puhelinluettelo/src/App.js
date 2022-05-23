
import { useState } from 'react'
import List from './components/List'
import Form from './components/Form'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
    nro: '0406117282',
    id: 1 },
    { name: 'Grace Hopper',
    nro: '0407118293',
    id: 2 }
  ]) 

  const [all, setAll] = useState([
    { name: 'Arto Hellas',
    nro: '0406117282',
    id: 1 },
    { name: 'Grace Hopper',
    nro: '0407118293',
    id: 2 }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNro, setNewNro] = useState('')
  const [newFilter, setNewFilter] = useState('')


  const addName = (event) => {
    event.preventDefault()
    const is = persons.filter((person) => person.name === newName)

    if (is.length !== 0){
      alert(`${newName} is already added to the phonebook`)
      setNewName('')
    }

    else {
      const person = {
        name: newName,
        nro: newNro,
        id: persons.length + 1,
      }

    setPersons(persons.concat(person))
    setAll(all.concat(person))
    setNewName('')
    setNewNro('')

    }
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
      <h2>Phonebook</h2>

      <Form name = {"filter shown with"} value = {newFilter} handle = {handleFilterChange}/>

        <h2> Add a new </h2>

        <form onSubmit={addName}>
        <Form name = {"name"} value = {newName} handle = {handleNameChange}/>
        <Form name = {"Phone number"} value = {newNro} handle = {handleNroChange} />

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      

      <h2>Numbers</h2>

      <List persons = {persons} all = {all} filter = {newFilter} />

    </div>
  )
}

export default App