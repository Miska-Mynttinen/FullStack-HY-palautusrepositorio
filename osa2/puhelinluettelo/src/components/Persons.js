import React from 'react'

const Persons = ({filterShown, removeName}) => {
    return (
      <>
        {filterShown.map(person => 
        <li key={person.name}>
          <Person key={person.name} name={person.name} number={person.number} />
          <Button handleClick={() => removeName(person)} />
        </li> 
        )}
      </>
    )
  }
  
const Person = (props) => {
    return (
      <>
        {props.name} {props.number}
      </>
    )
}

const Button = ({handleClick}) => (
  <button onClick={handleClick}>
    delete
  </button>
)

export default Persons