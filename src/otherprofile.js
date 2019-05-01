import React from "react";
import axios from "./axios";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.loadUser = this.loadUser.bind(this);
    }

    loadUser() {
        axios
            .get(`/api/user/${this.props.match.params.id}`)
            .then(({ data }) => {
                this.setState({ notFound: false, ...data });
            })
            .catch(err => {
                if (err.response.status === 400) {
                    this.props.history.push("/");
                } else if (err.response.status === 404) {
                    this.setState({ notFound: true });
                }
            });
    }

    componentDidMount() {
        this.loadUser();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id != prevProps.match.params.id) {
            this.loadUser();
        }
    }

    render() {
        if (this.state.notFound) {
            return <h1>NOT FOUND</h1>;
        }
        if (!this.state.first_name) {
            return null;
        }
        return (
            <div className="other-profile">
                <img src={this.state.users_image} />
                <div className="other-profile-name">
                    {`${this.state.first_name} ${this.state.last_name}`}
                </div>
                <div className="other-profile-bio">{this.state.bio}</div>
            </div>
        );
    }
}
