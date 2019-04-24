import React from "react";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submit = this.submit.bind(this);
    }

    submit(e) {
        e.preventDefault();
        console.log(e.target.firstname.value);
        console.log(e.target.lastname.value);
        console.log(e.target.email.value);
        console.log(e.target.password.value);
        this.setState({
            error: "Something went wrong. Please try again!"
        });
    }

    render() {
        let errorDiv;
        if (this.state.error) {
            errorDiv = (
                <div className="form-error-message">{this.state.error}</div>
            );
        }

        return (
            <React.Fragment>
                {errorDiv}
                <form onSubmit={this.submit}>
                    <input
                        name="firstname"
                        className="firstname"
                        type="text"
                        placeholder="first name"
                        required
                    />
                    <input
                        name="lastname"
                        className="lastname"
                        type="text"
                        placeholder="last name"
                        required
                    />
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
                    <button className="register-button" type="submit">
                        Register
                    </button>
                </form>
                <div className="Login">
                    Already a member? <a href="">Log in</a>
                </div>
            </React.Fragment>
        );
    }
}
