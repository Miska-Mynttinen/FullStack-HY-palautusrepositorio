import React from 'react'

const Persons = ({filterShown}) => {
    return (
      <>
      {filterShown.map(person => 
        <Person key={person.name} name={person.name} number={person.number}/>)}
      </>
    )
  }
  
const Person = (props) => {
    return (
      <p>
        {props.name} {props.number}
      </p>
    )
}

export default Persons