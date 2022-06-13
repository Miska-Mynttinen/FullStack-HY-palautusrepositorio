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
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showSelected, setShowSelected] = useState('')

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

  const handleFilterChange = (event) => {
    setShowSelected(event.target.value)
  }

  const caseInsensitive = (props) => props.name.toUpperCase().includes(showSelected.toUpperCase())

  const filterShown = persons.filter(caseInsensitive)

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with <input
          value={showSelected}
          onChange={handleFilterChange}
          />
        </div>
      <h2>add a new</h2>
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
        {filterShown.map(person => 
          <Person key={person.name} name={person.name} number={person.number}/>)}
    </div>
  )

}

export default App