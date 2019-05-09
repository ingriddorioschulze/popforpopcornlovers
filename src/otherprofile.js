import React from "react";
import axios from "./axios";
import FriendButton from "./friendbutton";
import Wall from "./wall";

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
            <React.Fragment>
                <div className="other-profile">
                    <div className="other-profile-area">
                        <img
                            className="other-profile-picture-image"
                            src={this.state.users_image}
                        />
                        <div className="other-profile-name">
                            {`${this.state.first_name} ${this.state.last_name}`}
                            <div className="other-profile-bio">
                                {this.state.bio}

                                <div className="friend-button">
                                    <FriendButton
                                        recipient={this.props.match.params.id}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Wall user={this.props.match.params.id} />
            </React.Fragment>
        );
    }
}
