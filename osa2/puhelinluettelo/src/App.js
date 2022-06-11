import { useState } from 'react'

const Person = (props) => {
  return (
    <p>
      {props.name}
    </p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }
    if (duplicateName) {
      window.alert(`${newName} is alreade added to phonebook`)
      return
    }
      setPersons(persons.concat(personObject))
      setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const duplicateName = (persons, name) => persons.map(person => person.name).includes(name)

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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => 
          <Person key={person.name} name={person.name}/>)}
    </div>
  )

}

export default App