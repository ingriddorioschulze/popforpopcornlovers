import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Logo from "./logo";
import Profile from "./profile";
import BioEditor from "./bioeditor";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get("/users").then(({ data }) => {
            this.setState(data);
        });
    }
    render() {
        if (!this.state.id) {
            return null;
        }
        const profilePic = (
            <ProfilePic
                image={this.state.users_image}
                firstname={this.state.first_name}
                lastname={this.state.last_name}
                clickHandler={() => this.setState({ isUploaderVisible: true })}
            />
        );
        return (
            <div className="app">
                <header className="app-header">
                    <Logo />
                    {profilePic}
                </header>
                <Profile
                    profilePic={profilePic}
                    firstname={this.state.first_name}
                    lastname={this.state.last_name}
                    bioEditor={
                        <BioEditor
                            bio={this.state.bio}
                            setBio={bio =>
                                this.setState({
                                    bio
                                })
                            }
                        />
                    }
                />

                {this.state.isUploaderVisible && (
                    <Uploader
                        setImage={users_image =>
                            this.setState({
                                users_image,
                                isUploaderVisible: false
                            })
                        }
                    />
                )}
            </div>
        );
    }
}
