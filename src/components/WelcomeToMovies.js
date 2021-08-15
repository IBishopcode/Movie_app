import React, { useState, useEffect } from 'react'
import axios from 'axios'
//import configdata from './config.json'
import { Link, navigate } from '@reach/router'

const baseURL = 'https://image.tmdb.org/t/p/w300'

const WelcomeToMovies = (props) => {
    const [popularMovies, setPopularMovies] = useState([])
    useEffect(() => {
        axios.get('http://localhost:7894/api/movie')
                 //https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
            .then((res) => {
                console.log(res.data.results)
                setPopularMovies(res.data.results)
            })
            .catch((err) => {
                console.log("There was an error")
               // console.log(res.status(400).json(err))
            })  
    }, [])

    return (
        <div style={{ textAlign: "center" }}>
            <div>
                <h2 style={{display:'inline-block'}}>Popular Movies</h2>
                <Link style={{display:'inline-block'}}to="/movie/favorites">Favorites</Link> 
            </div>
            {
                popularMovies.map((movie, index) => {
                    
                    return (
                        <>
                            
                            <img onClick={(e) => navigate("/movie/" + movie.id)} style={{ display: 'inline-block', margin: "10px" }} key={index} src={baseURL + movie.poster_path} alt={movie.title} />
                        </>
                    )
                })
            }
            
            
        </div>
    )
    
}

export default WelcomeToMovies