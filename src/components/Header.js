import React from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
// import tmdb from './assets/tmdb'


const Header = (props) => {
	const logout = (e) => {
    e.preventDefault();
    axios.post("http://localhost:7894/api/users/logout", { 
        // no body required for this request
				//		but a post requires data as a 2nd parameter
				//		if we plan to send it with the configuration
				//		settings so we give it an empty object
				// these comments don't count!  :P
    }, {
        withCredentials: true,
    })
    .then((res) => {
        console.log(res.data);
        navigate("/logreg");
    })
    .catch(err => {
        console.log(err);
    });
};

	return (
        <div className="header-links">
            
            <img style={{ width: "150px", marginTop: "10px", paddingLeft: "20px" }} src="/assets/tmdb.JPG" alt="tmdb-logo" />
            <Link to="/login" style={{ textDecoration: 'none', fontWeight:"bold", fontSize:"18px", color:"yellow",paddingLeft:"860px" }}>Login</Link>
            <Link to="/movie" style={{ textDecoration: 'none', fontWeight:"bold", fontSize:"18px", color:"yellow", paddingLeft:"15px" }}>Home</Link>
            <Link  to="/movie/favorites" style={{ textDecoration: 'none',fontWeight:"bold", fontSize:"18px", color:"yellow",paddingLeft:"15px" }}>Favorites</Link>
            <button className="logButton" onClick={(e) => logout(e)}>Logout</button>
		</div>
	)
}

export default Header;