
import React from "react";
import Login from "../components/Login";
import RegisterUser from "../components/RegisterUser";

const LogReg = () => {
    return (
        <div className="container-flex">
            <Login />
            <hr />
            <RegisterUser />
        </div>
    );
};

export default LogReg;