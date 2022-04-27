import { useState, createContext, useEffect, useMemo } from 'react'
import axios from 'axios';

export const CountryContext = createContext();

export const CountryProvider = props => {
    // API Links
    // https://restcountries.com/v3.1/all
    // https://restcountries.com/v3.1/name/japan
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])
    const [searchString, setSearchString] = useState('')
    const [loading, setLoading] = useState(true)
    const [currentFilter, setCurrentFilter] = useState('all')
    const [fetched, setFetched] = useState(false)

    const sortCountries = countryInfo => {
        // Sort modifies original array
        countryInfo.sort((a,b) => a.name.common<b.name.common ? -1 : 1)
        .sort((a,b) => {
        const nameA = a.name.common.toLowerCase()
        const nameB = b.name.common.toLowerCase()
        if (nameA.indexOf(searchString.toLowerCase()) < nameB.indexOf(searchString.toLocaleLowerCase())) {
          return -1
        }
        if (nameA.indexOf(searchString.toLowerCase()) > nameB.indexOf(searchString.toLocaleLowerCase())) {
          return 1
        }
      })
    }

    const fetchCountries = async () => {
        let defaultUrl = "https://restcountries.com/v3.1/all"
        let regionalUrl = `https://restcountries.com/v3.1/region/${currentFilter}`
        setLoading(true)
        if (currentFilter === 'all') {
            const response = await axios.get(defaultUrl)
            // Don't call sort in await
            const countryData = await response.data
            sortCountries(countryData)
            setCountries(countryData)
            setFilteredCountries(countryData)
            setFetched(true)
        } else {
            // If filter is not all, don't replace original country array with filtered data,
            // so that when returning from individual page you can swap back to other filters
            const response = await axios.get(regionalUrl)
            const countryData = await response.data
            sortCountries(countryData)
            // setCountries(countryData)
            setFilteredCountries(countryData)
            setFetched(true)
        }
        setLoading(false)
    }

    const filterHandler = () => {
        if (currentFilter === "all") {
            setFilteredCountries(countries)
            return;
        }
        setFilteredCountries(countries.filter(c => c.region === currentFilter))
    }

    const searchHandler = value => {
        setSearchString(value.toLowerCase())
    }

    const value = {
        countries,
        filteredCountries,
        fetched,
        searchString, 
        loading, 
        currentFilter, 
        fetchCountries,
        filterHandler,
        setSearchString,
        searchHandler,
        setCurrentFilter,
    }

    useEffect(() => {
        filterHandler()
    }, [currentFilter])
    
    return (
        <CountryContext.Provider value={value}>
            {props.children}
        </CountryContext.Provider>
    )
}
