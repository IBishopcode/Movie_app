import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, navigate } from '@reach/router'

const baseURL = 'https://image.tmdb.org/t/p/w300'

const Favorites = (props) => {
    const[favoriteMovies, setFavoriteMovies] = useState([])
    useEffect(() => {
        axios.get('http://localhost:7894/api/users/favorites', { withCredentials: true})
            .then((res) => {
                console.log(res.data)
                setFavoriteMovies(res.data)
            })
            .catch((err) => {
                console.log("There was an error")
            })  
    }, [])

    return (
        <div style={{ textAlign: "center" }}>
            <div>
                <h1 style={{display:'inline-block'}}>Favorite Movies</h1>
                <Link style={{ display: 'inline-block' }} to="/">Home</Link>
            </div>
            {
                favoriteMovies.map((favorite, index) => {
                    
                    return (
                        <>
                            <span key={index}>{favorite.title}</span>
                            <img style={{ display: 'inline-block', margin: "10px" }} src={baseURL + favorite.poster_path} alt={favorite.title} />
                        </>
                    )
                })
            }
            
            
        </div>
    )
    
}

export default Favorites