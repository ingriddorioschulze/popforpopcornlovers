import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import Logo from "./logo";
// import * as popCornMachine from "./popCornMachine";

class Welcome extends React.Component {
    // componentDidMount() {
    //     popCornMachine.start();
    // }
    // componentWillUnmount() {
    //     popCornMachine.reset();
    // }

    render() {
        return (
            <div className="welcome-container">
                <Logo />
                <div className="popcorn-machine-origin" />
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                    </div>
                </HashRouter>
            </div>
        );
    }
}

export default Welcome;
