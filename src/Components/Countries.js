import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Countries = () => {
    // API Links
    // https://restcountries.com/v3.1/all
    // https://restcountries.com/v3.1/name/japan

    const [countries, setCountries] = useState([])
    const [searchString, setSearchString] = useState('')
    const [loading, setLoading] = useState(false)
    const [currentFilter, setCurrentFilter] = useState('all')

    const fetchCountries = async () => {
        let defaultUrl = "https://restcountries.com/v3.1/region/Asia"
        let regionalUrl = `https://restcountries.com/v3.1/region/${currentFilter}`
        setLoading(true)
        if (currentFilter === 'all') {
            const response = await axios.get(defaultUrl)
            const countryData = await response.data
            setCountries(countryData)
        } else {
            const response = await axios.get(regionalUrl)
            const countryData = await response.data
            setCountries(countryData)
        }
        setLoading(false)
    }

    const filterHandler = e => {
        setCurrentFilter(e.target.value)
    }
    
    useEffect(() => {
        fetchCountries()
    }, [currentFilter])

    return (
        <div className="App">
        {loading ? <p>Loading countries...</p> :
          <div className="container">
            {countries.filter(c => {
              if (searchString === "") {
                return c
              } else if (c.name.common.toLowerCase().includes(searchString.toLowerCase())) {
                return c
              }
            }).sort((a,b) => a.name.common<b.name.common ? -1 : 1)
              .sort((a,b) => {
              const nameA = a.name.common.toLowerCase()
              const nameB = b.name.common.toLowerCase()
              if (nameA.indexOf(searchString.toLowerCase()) < nameB.indexOf(searchString.toLocaleLowerCase())) {
                return -1
              }
              if (nameA.indexOf(searchString.toLowerCase()) > nameB.indexOf(searchString.toLocaleLowerCase())) {
                return 1
              }
            }).map(country => {
              const {name, flags, population, region, capital} = country;
              return <div className='card' key={country.ccn2}>
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