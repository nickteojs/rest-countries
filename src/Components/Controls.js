import React from 'react'

const Controls = () => {
  return (
    <div className="controls">
    <div className="search">
      <input type="text" placeholder='Search for country..' />
      {/* onChange={e => setSearchString(e.target.value)} */}
    </div>
    <div className="filter">
      <select name="filterType" id="filterType">
      {/* onChange={filterHandler}  */}
        <option value="0">Filter by region</option>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  </div>
  )
}

export default Controls