import { useEffect, useState } from 'react'
import axios from 'axios'
import FilterForm from './components/FilterForm'
import Countries from './components/Countries'
import Country from './components/Country'

const Display = ({filtered}) => {
  if (filtered.length > 10) {
    return(
      <>Too many matches, specify another filter</>
    )
  }
  if (filtered.length === 1) {
    return (
        <Country filtered={filtered} />
      )
  }
  if (filtered.length === 0) {
    return (
        <>No matches</>
      )
  }
  if ((filtered.length <= 10)) {
    return (
      <Countries filtered={filtered} />
    )
  }
  
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [showSelected, setShowSelected] = useState('')

  useEffect(() => {
    axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
          setCountries(response.data)
        })
  }, [])

  const handleFilterChange = (event) => {
    setShowSelected(event.target.value)
  }

  const caseInsensitive = (props) => props.name.common.toUpperCase().includes(showSelected.toUpperCase())

  const filtered = countries.filter(caseInsensitive)

  return (
    <div>
      <FilterForm showSelected={showSelected} handleFilterChange={handleFilterChange}/>
      <Display filtered={filtered} />
    </div>
  )

}

export default App