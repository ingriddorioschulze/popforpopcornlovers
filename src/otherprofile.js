import React from "react";
import axios from "./axios";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios
            .get(`/api/user/${this.props.match.params.id}`)
            .then(({ data }) => {
                this.setState(data);
            });
    }
    render() {
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
