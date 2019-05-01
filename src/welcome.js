import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import Logo from "./logo";

const Welcome = () => {
    return (
        <div className="welcome-container">
            <Logo />
            <div className="welcome-text">for popcorn lovers.</div>
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
