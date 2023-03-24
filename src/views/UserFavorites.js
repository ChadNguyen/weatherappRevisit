import { useState, useEffect, useContext } from 'react'
import { DataContext } from '../contexts/DataProvider'
import { Link } from 'react-router-dom'

export default function UserFavorites() {
  const { addCity, cities } = useContext(DataContext)
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const myAPI = process.env.REACT_APP_WEATHER_API_KEY

  async function getWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myAPI}&units=metric`)
    const data = await response.json()
    setWeatherData(data)
    addCity(city) 
  }

  return (
    <div className="user-favorites">
      <form onSubmit={(e) => {
        e.preventDefault()
        getWeatherData(city)
      }}>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        <button type="submit">Add city</button>
      </form>
      { cities.map((city) => <city city={city} key={city.id} />) }
      
    </div>
  )
}


