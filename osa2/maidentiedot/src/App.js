import { useEffect, useState } from 'react'
import axios from 'axios'
import Display from './components/Display'
import FilterForm from './components/FilterForm'

const App = () => {
  const [countries, setCountries] = useState([])
  const [showSelected, setShowSelected] = useState('')
  const [countryNew, setCountryNew] = useState([])

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
      <Display filtered={filtered} countryNew={countryNew} setCountryNew={setCountryNew} />
    </div>
  )

}

export default App