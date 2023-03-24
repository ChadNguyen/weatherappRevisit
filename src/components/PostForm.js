import { useState, useContext } from 'react'
import { DataContext } from '../contexts/DataProvider'

export default function PostForm() {
    const [city, setCity] = useState('')
    const { addCity } = useContext(DataContext)

    async function handleSubmit(e) {
        e.preventDefault()
        const newCity = await addCity(city)
        setCity('') // Once Submitted
       
    }

    return (
        <form onSubmit={ handleSubmit }>
            <div>
                <input 
                    placeholder='Search City'
                    type="text" 
                    name="city" 
                    id="city" 
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                />
            </div>
            <button>Add City</button>
        </form>
    )
}