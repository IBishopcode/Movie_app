import React, { useState, useEffect } from 'react'
import axios from 'axios'
//import configdata from './config.json'
import { navigate } from '@reach/router'

const baseURL = 'https://image.tmdb.org/t/p/w300'

const WelcomeToMovies = (props) => {
    const [popularMovies, setPopularMovies] = useState([])
    useEffect(() => {
        axios.get('http://localhost:7894/api/movie')
            .then((res) => {
                console.log(res.data.results)
                setPopularMovies(res.data.results)
            })
            .catch((err) => {
                console.log("There was an error")
            })  
    }, [])

    return (
        <div style={{ textAlign: "center", background:"#EFEFEF" }}>
            <div>
                <h2 style={{display:'inline-block', color:"black",fontWeight:"bold"}}>Popular Movies</h2>
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