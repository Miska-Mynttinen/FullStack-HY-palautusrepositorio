import Countries from './Countries'
import Country from './Country'

const Display = ({filtered, countryNew, setCountryNew}) => {
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
        <Countries filtered={filtered} countryNew={countryNew} setCountryNew={setCountryNew} />
      )
    }
    
  }

export default Display