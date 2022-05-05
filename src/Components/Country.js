import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import axios from 'axios'
import Loading from './Loading'
import { codes } from '../country-codes'

const Country = () => {
    const navigate = useNavigate()
    let params = useParams()

    const fetchCountry = async () => {
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${params.countryID}`)
        // Check if borders exist, if they don't the key doesn't exist
        const borders = response.data[0].borders
        if (Object.keys(response.data[0]).includes('borders')) {
            const initialLength = borders.length
            const countryBorders = Object.values(borders)
            countryBorders.forEach(border => {
                codes.forEach(code => {
                    if (border === Object.keys(code)[0]) {
                        borders.push(Object.values(code)[0])
                    }
                })
            })
            borders.splice(0, initialLength);
        }
        return response.data
    }

    const { isLoading, isFetching, isError, data, error } = useQuery(['country', params], fetchCountry)

    return (
        <>
            {/* <ReactQueryDevtools/> */}
            {isLoading ? <Loading/> :
            isError ? <div>Error: {error.message}</div> :
            // isFetching ? <p>Refreshing</p> : 
            <div className='country-container'>
                <div className='return-container'> 
                    <button className='return-button' onClick={() => navigate("/")}>Return</button>
                </div>
                {/* <div>{isFetching ? "Background Updating..." : " "}</div> */}
                <div className='country-box'>
                    <div className='flag-box'>
                        <img className="country-flag" src={data[0].flags.png} alt={`${data[0].name.common} flag`} />
                    </div>
                    <div className='desc-box'>
                        <h1 className='title'>{data[0].name.common}</h1>
                        <div className='country-description'>
                            <div className='desc-1'>
                                {Object.keys(data[0].name).includes('nativeName') &&
                                    <div className='country-info'>
                                        <strong>Native Name:</strong>
                                        <p>{(Object.values(data[0].name.nativeName)[0]).official}</p>
                                    </div>
                                }
                                <div className='country-info'>
                                    <strong>Population:</strong>
                                    <p>{data[0].population}</p>
                                </div>
                                <div className='country-info'>
                                    <strong>Region:</strong>
                                    <p>{data[0].region}</p>
                                </div>
                                <div className='country-info'>
                                    <strong>Subregion:</strong>
                                    <p>{data[0].subregion}</p>
                                </div>
                                <div className='country-info'>
                                    <strong>Capital:</strong>
                                    <p>{data[0].capital}</p>
                                </div>
                            </div>
                            <div className='desc-2'>
                                {Object.keys(data[0]).includes('tld') &&
                                    <div className='country-info'>
                                        <strong>Top Level Domain:</strong>
                                        <p>{data[0].tld[0]}</p>
                                    </div>
                                }
                                {Object.keys(data[0]).includes('currencies') &&
                                    <div className='country-info'>
                                        <strong>Currencies:</strong>
                                        {Object.values(data[0].currencies).map((keyName, i) => {
                                            return <p key={i}>{keyName.name} ({keyName.symbol})</p>
                                        })}
                                    </div>
                                }
                                {Object.keys(data[0]).includes('languages') &&
                                    <div className='country-info'>
                                        <strong>Languages:</strong>
                                        {Object.values(data[0].languages).map((keyName, i) => {
                                            return <p class="language" key={i}>{keyName}</p>
                                        })}
                                    </div>
                                }
                            </div>
                        </div>
                        {Object.keys(data[0]).includes('borders') &&
                            <div className='borders'>
                              <strong>Borders Countries:</strong>
                                {Object.values(data[0].borders).map((keyName, i) => {
                                    return <p className="border-country" key={i}>
                                        {keyName}
                                    </p>
                                })}
                            </div>
                        }
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default Country