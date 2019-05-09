import React from "react";
import axios from "./axios";

export default class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: ""
        };
        this.post = this.post.bind(this);
    }

    post() {
        axios
            .post(`/api/wall/${this.props.user}`, { post: this.state.post })
            .then(() => {
                this.setState({
                    post: ""
                });
                this.props.reloadPosts();
            });
    }

    render() {
        return (
            <div className="add-post-container">
                <textarea
                    placeholder="write here your post"
                    cols="50"
                    rows="2"
                    className="add-post-textarea"
                    onChange={e => {
                        this.setState({ post: e.target.value });
                    }}
                    value={this.state.post}
                />
                <div>
                    <button className="add-post-button" onClick={this.post}>
                        post
                    </button>
                </div>
            </div>
        );
    }
}
