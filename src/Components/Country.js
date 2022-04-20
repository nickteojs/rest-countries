import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loading from './Loading'

const Country = () => {
    const [error, setError] = useState(null)
    const [country, setCountry] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    let params = useParams()

    let countryObject = {
        // name: ,
        // flag: ,
        // nativeName: ,
        // population: ,
        // region: ,
        // subRegion: ,
        // capital: ,
        // topLevelDomain: ,
        // currencies: [],
        // languages: [],
        // borderCountries: []
    }

    const fetchCountry = async () => {
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/alpha/${params.countryID}`)
            const countryData = await response.data
            setCountry(countryData)
            setLoading(false)
        }
        catch (error) {
            setError(error)
        }
    }

    // const {name, flags, population, region, subregion, capital, tld, currencies, languages, borders}
    useEffect(() => {
        fetchCountry()
    }, [])

    return (
        <>
            {error}
            {loading ? <Loading/> : 
            <div>
                <button onClick={() => navigate("/")}>Return</button>
                {<img style={{width: '20%'}}src={country[0].flags.png} alt={`${country[0].name.common} flag`} />}
                <p>{country[0].name.common}</p>
                <p>
                    <strong>Native name:</strong> 
                    {(Object.values(country[0].name.nativeName)[0]).official}
                </p>
                <p>
                    <strong>Population:</strong> 
                    {country[0].population}
                </p>
                <p>
                    <strong>Region:</strong> 
                    {country[0].region}
                </p>
                <p>
                    <strong>Subregion:</strong> 
                    {country[0].subregion}
                </p>
                <p>
                    <strong>Capital:</strong> 
                    {country[0].capital}
                </p>
                {Object.keys(country[0]).includes('tld') &&
                    <p>
                        <strong>Top Level Domain:</strong> 
                        {country[0].tld[0]}
                    </p>
                }
                <p>
                    <strong>Currencies:</strong>
                    {Object.values(country[0].currencies).map((keyName, i) => {
                        return <p key={i}>{keyName.name} ({keyName.symbol})</p>
                    })}
                </p>
                <p>
                    <strong>Languages:</strong>
                    {Object.values(country[0].languages).map((keyName, i) => {
                        return <p key={i}>{keyName}</p>
                    })}
                </p>
                <p>
                    <strong>Borders:</strong> 
                    {Object.keys(country[0]).includes('borders') &&
                    Object.values(country[0].borders).map((keyName, i) => {
                        return <p key={i}>{keyName}</p>
                    })
                    }
                </p>
            </div>
            }
            
        </>
    )
}

export default Country