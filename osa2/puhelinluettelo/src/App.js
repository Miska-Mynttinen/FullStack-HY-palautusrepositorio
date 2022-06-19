import { useEffect, useState } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import FilterForm from './components/FilterForm'
import NewPerson from './components/NewPerson'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showSelected, setShowSelected] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    let Duplicate = persons.find(person => person.name === newName)
    if (typeof Duplicate !== 'undefined') {
      window.alert(`${newName} is already added to phonebook`)
      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const removeName = personToDelete => {
    if (window.confirm(`Delete ${personToDelete}?`)) {
      personService
        .remove(personToDelete.id)
        .then(
          setPersons(persons.filter(person => person.id !== personToDelete.id))
        )
        .catch(error => {
          alert(
            `The number ${personToDelete} was already deleted from server`
          )
          setPersons(persons.filter(person => person.id !== personToDelete.id))
        }) 
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setShowSelected(event.target.value)
  }

  const caseInsensitive = (props) => props.name.toUpperCase().includes(showSelected.toUpperCase())

  const filterShown = persons.filter(caseInsensitive)

  return (
    <div>
      <h2>Phonebook</h2>
        <FilterForm text='filter shown with' showSelected={showSelected} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
        <NewPerson addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
        <Persons filterShown={filterShown} removeName={removeName} />
    </div>
  )

}

export default App