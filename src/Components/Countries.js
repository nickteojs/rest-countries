import { useContext, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { CountryContext } from './CountryContext'
import Controls from './Controls'
import Loading from './Loading'

const Countries = () => {
    const { fetched, searchString, loading, fetchCountries, filteredCountries } = useContext(CountryContext)

    useEffect(() => {
        if (!fetched)
        fetchCountries()
    }, [])

    return (
        <div className="app">
        <Controls/>
        {loading ? <Loading/> :
          <div className="container">
            {filteredCountries.filter(c => {
              if (searchString === "") {
                return c
              } else if (c.name.common.toLowerCase().includes(searchString.toLowerCase())) {
                return c
              }
            }).map(country => {
              const {name, flags, population, region, capital} = country;
              return <div className='card' key={country.cca2}>
                <Link style={{textDecoration: 'none', textDecorationStyle: 'none', color: 'white'}} to={`/${country.cca2}`}>
                <img src={flags.png} alt={`${name.common} flag`} />
                <div className="country-desc">
                  <h3>{name.common}</h3>
                  <p>Population: {population}</p>
                  <p>Region: {region}</p>
                  <p>Capital: {capital}</p>
                </div>
                </Link>
              </div>
            })}
          </div>
        }
      </div>
    )
}

export default Countries