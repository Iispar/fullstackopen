
import { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './components/Form'
import Filter from './components/Filter'



const App = () => {

  const [allCountries, setAllCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    console.log("Alkoi")
    axios
    .get('https://restcountries.com/v2/all')
    .then(response => {
      setAllCountries(response.data)
      console.log(response.data)
    })
  }, [])



  const handleNewSearch = (event) => (
    setNewSearch(event.target.value)
  )



  return (
    <div>

    <Form name = {"Find countries"} value = {newSearch} handle = {handleNewSearch}/>
    
    <Filter countries = {allCountries} search = {newSearch} setCountries = {setAllCountries}/>

    </div>


  )
}

export default App