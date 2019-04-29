import React from "react";
import axios from "./axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submit = this.submit.bind(this);
    }

    submit(e) {
        e.preventDefault();
        axios
            .post("/login", {
                email: e.target.email.value,
                password: e.target.password.value
            })
            .then(() => {
                location.replace("/");
            })
            .catch(error => {
                this.setState({
                    error: error.response.data.error
                });
            });
    }

    render() {
        let errorDiv;
        if (this.state.error) {
            errorDiv = (
                <div className="login-error-message">{this.state.error}</div>
            );
        }

        return (
            <React.Fragment>
                {errorDiv}
                <div className="login-area">
                    <div className="login-container">
                        <div className="login-title">Login</div>
                        <form className="login-form" onSubmit={this.submit}>
                            <input
                                name="email"
                                className="email"
                                type="text"
                                placeholder="email"
                                required
                            />
                            <input
                                name="password"
                                className="password"
                                type="password"
                                placeholder="password"
                                required
                            />
                            <button className="login-button" type="submit">
                                login
                            </button>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
