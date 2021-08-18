import React, { useState } from "react";
import axios from "axios";

const Register = props => {
const [confirmReg, setConfirmReg] = useState("");
const [errs, setErrs] = useState({});

  // CHECK THIS OUT!!!!
  //    using a single state object to hold all data!
const [ user, setUser ] = useState({
    username: "",
    email: "", 
    password: "", 
    confirmPassword: "",
})

  // using a single function to update the state object
  //    we can use the input's name attribute as the key in to the object
const handleChange = (e) => {
    setUser({
    ...user,
    [e.target.name]: e.target.value,
    })
}

const register = e => {
    e.preventDefault();

    axios.post("http://localhost:7894/api/users/register", 
      user,             // the user state is already an object with the correct keys and values!
    {
        // this will force the sending of the credentials / cookies so they can be updated
        //    XMLHttpRequest from a different domain cannot set cookie values for their own domain 
        //    unless withCredentials is set to true before making the request
        withCredentials: true,
    })
    .then(res => {
        console.log(res.data);

        // when we successfully created the account, reset state for registration form
        //    We do this if we are NOT navigating automatically away from the page
        setUser({
        firstName: "",
        lastName: "", 
        email: "", 
        password: "", 
        confirmPassword: "",
        })

        setConfirmReg("Thank you for Registering, you can now log in!");
        setErrs({});  // remember to reset errors state if it was successful
    })
    .catch((err) => {
        console.log(err);
        console.log(err.response.data);
        setErrs(err.response.data.errors);
    });
};

return (
    <div className="registerContainer">
    <h2>Register</h2>
    {
        confirmReg ? 
        <h4 style={{color: "green"}}>{confirmReg}</h4>
        : null
    }
    <form onSubmit={register}>
        <div>
        <label>Username</label>
        {
            errs.username ? 
            <p className="error-text">{ errs.username.message }</p>
            : null
        }
        <input
            type="text"
            name="username"
            value={user.username}
            onChange={(e) => handleChange(e)}
        />
        </div>
        <div>
        <label>Email</label>
        {
            errs.email? 
            <p className="error-text">{ errs.email.message }</p>
            : null
        }
        <input
            type="email"
            name="email"
            value={user.email}
            onChange={ handleChange }
        />
        </div>
        <div>
        <label>Password</label>
        {
            errs.password ? 
            <p className="error-text">{ errs.password.message }</p>
            : null
        }
        <input
            type="password"
            name="password"
            value={user.password}
            onChange={ handleChange }
        />
        </div>
        <div>
        <label>Confirm Password</label>
        {
            errs.confirmPassword? 
            <p className="error-text">{ errs.confirmPassword.message }</p>
            : null
        }
        <input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={ handleChange }
        />
        </div>
        <div className="center">
        <button 
            type="submit"
        >Register Me</button>
        </div>
    </form>
    </div>
);
};

export default Register;