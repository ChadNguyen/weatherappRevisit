import { useState, useEffect, createContext, useContext } from 'react'
import { getFirestore, getDoc, getDocs, collection, doc, addDoc, Timestamp, collectionGroup, query } from '@firebase/firestore'
import { AuthContext } from './AuthProvider'

export const DataContext = createContext()

export const DataProvider = function(props) {
    const [cities, setCities] = useState([])
    const [data, setData] = useState()
    const { user } = useContext(AuthContext)
    const db = getFirestore()
    const myAPI = process.env.REACT_APP_WEATHER_API_KEY

    useEffect (() => {
        async function getCities() {
            const postQuery = query(collectionGroup(db, 'cities'))
            const querySnapshot = await getDocs(postQuery)
            const loadedPosts = []
            querySnapshot.forEach((doc) => {
                loadedPosts.push({
                    id: doc.id,
                    uid: doc.ref.parent.parent,
                    ...doc.data()
                })
            })           
            setCities(loadedPosts)
            setData(data)
        }
        getCities()
    }, [])

    async function getCity(uid, id) {
        const docRef = doc(db, 'users', uid, 'cities', id)
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
            throw new Error
        }

        return docSnap.data()
    }

    async function getCityData(city, state) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&units=metric&appid=${myAPI}`
        )

        const data = await response.json()
        setData(data)
        return data
      }

    async function addCity(city) {
        const newCity = {
            city, 
            dateCreated: Timestamp.now(),
            userName: user.displayName
        }

        const docRef = await addDoc(collection(db, 'users', user.uid, 'cities'), newCity)
        newCity.id = docRef.id
        setCities([
            ...cities,
            newCity
        ])
        return newCity
    }
        
    const value = {
        cities,
        getCity,
        getCityData,
        addCity
    }

    return (
        <DataContext.Provider value={value}>
            { props.children }
        </DataContext.Provider>
    )
}
