const Country = ({filtered}) => {
  
    return(
      <>
        <h2>{filtered[0].name.common}</h2>
          <div>capital {filtered[0].capital}</div>
          <div>area {filtered[0].area}</div>
        <h4>languages:</h4>
          <ul>
            {Object.entries(filtered[0].languages).map(([key, value]) =>
              <li key={key}> {value}</li>
            )}
          </ul>
        <img src={filtered[0].flags.png} />
      </>
    )
}

export default Country