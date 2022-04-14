import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  // API Links
  // https://restcountries.com/v3.1/all
  // https://restcountries.com/v3.1/name/japan

  const [countries, setCountries] = useState([])
  const [searchString, setSearchString] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchCountries = async () => {
    setLoading(true)
    const countryData = await axios.get("https://restcountries.com/v3.1/region/Asia")
    setLoading(false)
    setCountries(countryData.data)
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  return (
    <Router>
      <Routes>
        <div className="App">
          {loading ? <p>Loading countries...</p> :
            <div className="container">
              <div className="controls">
                <div className="search">
                  <input type="text" placeholder='Search for country..' onChange={e => setSearchString(e.target.value)}/>
                </div>
                <div className="filter">
                  <select name="filterType" id="filterType">
                    <option value="0">Filter by region</option>
                    <option value="africa">Africa</option>
                    <option value="america">America</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="oceania">Oceania</option>
                  </select>
                </div>
              </div>
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
      </Routes>
    </Router>
  );
}

export default App;
