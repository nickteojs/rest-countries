import { useContext } from 'react'
import { CountryContext } from './CountryContext'

const Controls = () => {
  const {searchString, searchHandler, currentFilter, setCurrentFilter} = useContext(CountryContext);

  return (
    <div className="controls">
    <div className="search">
      <input type="text" value={searchString} onChange={e => searchHandler(e.target.value)} placeholder='Search for country..' />  
    </div>
    <div className="filter">
      <select value={currentFilter} name="filterType" onChange={e => setCurrentFilter(e.target.value)} id="filterType">
        <option value="all">All Countries</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  </div>
  )
}

export default Controls