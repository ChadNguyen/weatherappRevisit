import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { DataContext } from '../contexts/DataProvider'


export default function CityData() {
  const { city } = useParams()
  const [weatherData, setWeatherData] = useState(null)
  const myAPI = process.env.REACT_APP_WEATHER_API_KEY


  useEffect(() => {
    async function getWeatherData() {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myAPI}&units=metric`)
      const data = await response.json()
      setWeatherData(data)
    }
    getWeatherData()
  }, [city])

  return (
    <div className="weather-data">
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind speed: {weatherData.wind.speed} km/h</p>
        </div>
      )}
    </div>
  )
}
