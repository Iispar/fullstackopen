import React from 'react'
import axios from 'axios'
import { useState } from 'react'


const Country = ({name, capital, area, languages, flag}) => {
    const [weather, setWeather] = useState('')
        axios
        .get(`http://api.weatherapi.com/v1/current.json?key=6127ef3f76194330a12191729222405&q=${name}&aqi=yes`)
        .then(response => {
            setWeather(response.data.current)
        
    })
        return (
            <div>
                <h1> {name} </h1>
                <div>Capital: {capital} </div>
                Area: {area}
                <h3> languages: </h3>
                    <ul>
                        {languages.map(({name}) => <li> {name} </li>)}
                    </ul>
                <p></p>
                <img src={flag} alt="No flag found" height="150" width="250"/>

                <h2> Weather in {capital}</h2>
                <div>
                <div> Temperature: {weather.temp_c} Celsius </div>
                Wind: {weather.wind_kph}
                </div>

            </div>
        )
}

  export default Country
