import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Logo from "./logo";

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
        return (
            <div>
                <Logo />
                <ProfilePic
                    image={this.state.users_image}
                    firstname={this.state.first_name}
                    lastname={this.state.last_name}
                    clickHandler={() =>
                        this.setState({ isUploaderVisible: true })
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
