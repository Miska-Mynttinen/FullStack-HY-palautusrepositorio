const Countries = ({filtered}) => {
    return (
        <ul>
            {filtered.map(country => 
            <li key={country.name.common}> {country.name.common}</li>)}
        </ul>
    )
}

export default Countries