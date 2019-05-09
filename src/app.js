import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Logo from "./logo";
import Profile from "./profile";
import BioEditor from "./bioeditor";
import OtherProfile from "./otherprofile";
import SearchBox from "./searchbox";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Friends from "./friends";
import Chat from "./chat";
import Online from "./online";
import Wall from "./wall";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    logout() {
        axios.post("/logout").then(() => {
            window.location = "/welcome";
        });
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
            <React.Fragment>
                <BrowserRouter>
                    <div className="app">
                        <header className="app-header">
                            <Logo />
                            <SearchBox className="header-searchbox" />
                            <Link className="header-home-button" to="/">
                                home
                            </Link>
                            <Link
                                className="header-friends-button"
                                to="/friends"
                            >
                                friends
                            </Link>
                            <Link
                                className="header-profile-button"
                                to="/profile"
                            >
                                profile
                            </Link>
                            <Link className="header-chat-button" to="/chat">
                                chat
                            </Link>
                            <a
                                onClick={this.logout}
                                className="header-logout-button"
                            >
                                logout
                            </a>

                            {profilePic}
                        </header>
                        <main>
                            <Route
                                exact
                                path="/"
                                render={() => <Wall user={this.state.id} />}
                            />
                            <Route
                                path="/profile"
                                render={() => (
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
                                )}
                            />
                            <Route path="/friends" component={Friends} />
                            <Route path="/user/:id" component={OtherProfile} />
                            <Route path="/chat" component={Chat} />
                            <Route path="/online" component={Online} />
                        </main>

                        {this.state.isUploaderVisible && (
                            <Uploader
                                closeModal={() =>
                                    this.setState({
                                        isUploaderVisible: false
                                    })
                                }
                                setImage={users_image =>
                                    this.setState({
                                        users_image,
                                        isUploaderVisible: false
                                    })
                                }
                            />
                        )}
                        <footer className="copyright">
                            © 2019 pop | for popcorn lovers by Ingrid do Rio
                            Schulze
                        </footer>
                    </div>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}
