import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";

const Welcome = () => {
    return (
        <div className="welcome-container">
            <div className="welcome-title">Welcome to</div>
            <img className="welcome-image" src="" alt="logo" />
            <div className="welcome-text">About the social network.</div>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
};

export default Welcome;
