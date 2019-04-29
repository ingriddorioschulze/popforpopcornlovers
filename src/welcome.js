import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import Logo from "./logo";

const Welcome = () => {
    return (
        <div className="welcome-container">
            <div className="welcome-title">welcome to</div>
            <Logo />
            <div className="welcome-text">make friends. share. be social.</div>
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
