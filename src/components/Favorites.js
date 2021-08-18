import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Delete from './Delete'
import { navigate} from '@reach/router'

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
                if(err.response.status === 401) {
					navigate('/login');
				}
            })  
    }, [])
    const favoritesUpdate = (movieId) => {
        let updatedFavoritesArray = favoriteMovies.filter((favorite) => {
            return favorite._id !== movieId
        })
        setFavoriteMovies(updatedFavoritesArray)
    }

    return (
        <div style={{textAlign:"center", backgroundColor:"#EFEFEF"}} >
            <h1 style={{margin:"0px"}}>Favorite Movies</h1>
            {
                favoriteMovies.map((favorite, index) => {
                    
                    return (
                        <>
                            <div style = {{textAlign:"center"}} key={index}>
                                <h3>{favorite.title}</h3>
                                <img style={{width:"200px", display:"inline-block", margin:"auto"}} src={baseURL + favorite.poster_path} alt={favorite.title} />
                                <p style={{ margin: "0px", display: "inline-block", fontWeight: "bold", verticalAlign: "top", width: "100px" }}>{favorite.tagline}</p>
                                <Delete movieId={favorite._id} afterDelete={ favoritesUpdate }/>
                                
                            </div>
                            
                        </>
                    )
                })
            }
            
            
        </div>
    )
    
}

export default Favorites