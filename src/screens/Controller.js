import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import Header from "../common/header/Header";
import Home from "./home/Home.js";
import Details from "./details/Details.js";

const Controller = () => {
    const baseURL= "/api/v1/";

    return(
        <Router>
            
            <div className="main-container">
                <Route exact path="/" render = {(props) => <Home {...props} baseURL = {baseURL} />}/>

                <Route exact path="/movie/:id" render = {(props) => <Details {...props} baseURL = {baseURL} />}/>
            </div>

        </Router>
    )

};

export default Controller;