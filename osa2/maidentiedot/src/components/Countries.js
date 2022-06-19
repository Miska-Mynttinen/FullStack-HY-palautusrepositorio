import { useEffect } from 'react'
import Country from './Country'

const Countries = ({filtered, countryNew, setCountryNew}) => {

    //Works but cannot reset react state
    if (countryNew.length !== 0) {
      return (
        <>
          <Country filtered={countryNew} />
        </>
      )
    }

    
    return (
      <ul>
        {filtered.map(country => 
          <li key={country.name.common}> 
            {country.name.common}
            <Button handleClick={() => setCountryNew(new Array ( country ))} />
          </li>
        )}
      </ul>
    )

}

const Button = ({handleClick}) => (
  <button onClick={handleClick}>
    show
  </button>
)

export default Countries