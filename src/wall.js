import React from "react";
import axios from "./axios";
import PostList from "./postList";
import PostForm from "./postForm";

export default class Wall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allowed: false,
            posts: []
        };
    }

    loadPosts() {
        axios
            .get(`/api/wall/${this.props.user}`)

            .then(({ data }) => {
                this.setState({ allowed: true, posts: data });
            });
        // .catch(error => {
        //     this.setState({
        //         error: error.response.data
        //     });
        // });
    }

    componentDidMount() {
        this.loadPosts();
    }

    render() {
        if (!this.state.allowed) {
            return null;
        }

        return (
            <div>
                <PostList posts={this.state.posts} />
                <PostForm
                    reloadPosts={() => this.loadPosts()}
                    user={this.props.user}
                />
            </div>
        );
    }
}
