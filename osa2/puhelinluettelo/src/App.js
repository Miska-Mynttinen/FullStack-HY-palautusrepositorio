import { useState } from 'react'

const Person = (props) => {
  return (
    <p>
      {props.name} {props.number}
    </p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    let Duplicate = persons.find(person => person.name === newName)
    if (typeof Duplicate !== 'undefined') {
      window.alert(`${newName} is alreade added to phonebook`)
      return
    }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
          value={newName}
          onChange={handleNameChange}
        />
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}
        />
        </div>
        <div> 
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => 
          <Person key={person.name} name={person.name} number={person.number}/>)}
    </div>
  )

}

export default App