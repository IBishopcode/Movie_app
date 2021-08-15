import React from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';

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
		<div className="header">
			{/* <Link to="/restaurants">
				<img src="/restaurant.jpg" alt="logo" className="logo" />
			</Link> */}
			<div className="header-links">
                <Link to="/movie">View Movies</Link>
				<Link to="/movie/favorites">Favorites</Link>
				<button onClick={(e) => logout(e)}>Logout</button>
			</div>
		</div>
	)
}

export default Header;