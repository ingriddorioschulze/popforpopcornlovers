import React from "react";
import Registration from "./registration";

const Welcome = () => {
    return (
        <div>
            <div className="welcome-title">Welcome to</div>
            <img className="welcome-image" src="" alt="logo" />
            <div className="welcome-text">
                Small text explaining the social network
            </div>
            <div className="welcome-text-two">Join the social network!</div>
            <Registration />
        </div>
    );
};

export default Welcome;
