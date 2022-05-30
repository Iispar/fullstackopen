import React from 'react'
import Country from './Country'


const Filter = ({countries, search, setCountries}) => {


    const filter = countries.filter(country => country.name.includes(search))

    if (filter.length > 10) {
        return (
        <p> Too many matches, specify another filter </p>
        )
    }
    if (filter.length === 1){
        return(
            <ul>
                {filter.map(({name, i, capital, area, languages, flag, latlng}) =>
                <Country 
                    name = {name} 
                    key = {i} 
                    capital = {capital} 
                    area = {area} 
                    languages = {languages} 
                    flag = {flag}
                    lat =  {latlng[0]}
                    lon = {latlng[1]}
                    />
                )}
            </ul>
        )
    }
    else { 
        return(
         <ul>
             {filter.map((country) =>
                <li>
                {country.name}
                <button onClick = {() =>  setCountries([country])}>
                    show
                </button>
            </li>
            )}
        </ul>
        )
    }
}
export default Filter