import React, { useState, useEffect } from 'react'
import axios from 'axios'
//import configdata from './config.json'
import { Link, navigate } from '@reach/router'

const baseURL = 'https://image.tmdb.org/t/p/w300'

const Details = (props) => {
    const [movie, setMovie] = useState({})
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false)
    const { id, setFavoriteMovies } = props
    useEffect(() => {
        // console.log(configdata.api_key)
        axios.get('http://localhost:7894/api/movie/'+ id)
                 //https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
            .then((res) => {
                console.log(res.data)
                setMovie(res.data)
            })
            .catch((err) => {
                console.log("There was an error")
               // console.log(res.status(400).json(err))
            })  
    }, [])

    const favoritesHandler = (e) => {
        axios.post('http://localhost:7894/api/movie/favorites', movie,
            { withCredentials: true})
        .then((res )=> {
            console.log(res.data)
        }
        )
        .catch((err) => {
            console.log("Error Message: " + err)
            
    })
    }
    if (!movie.genres) {
        return <span>Loading...</span>;
    }
    return (
        <div style={{ textAlign: "center", background: "#EFEFEF", color:"black" }}>
            <div><h1 style={{display:'inline-block'}}>{movie.original_title}</h1>
        </div>
            <img style={{ display: 'inline-block', margin: "10px" }} src={baseURL + movie.poster_path} alt={movie.title} />
            <p style={{ margin: "auto", width: "400px" }}>{movie.overview}</p>
            <p>Duration(minutes): { movie.runtime}</p>
            <p>Genre: { movie.genres[0]["name"]}</p>
            <p>voter rating : {movie.vote_average}</p>
            {/* {successMessage ? <p>Added to Favorites</p> : ""}
            {errorMessage ? <p>Could not add to Favorites</p> : ""} */}
            <button style={{border:"1px solid gray ", background:"gray", fontSize:"20px", color:"yellow", padding:" 6px 8px", borderRadius:"5px",}}onClick={(e) => favoritesHandler(e,movie) }>Add to Favorites</button>
        </div>
    )
    
}

export default Details