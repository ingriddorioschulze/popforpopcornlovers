import React from "react";
import ChatTime from "./chatTime";

export default class PostList extends React.Component {
    render() {
        return (
            <div>
                <div className="posts-list-container">
                    <div className="posts-text">wall</div>
                    <div className="posts-list-area">
                        {this.props.posts.map(post => (
                            <div className="posts-content" key={post.id}>
                                <img
                                    className="posts-image"
                                    src={post.users_image}
                                />
                                <div className="posts-name">
                                    {post.first_name} {post.last_name} | &nbsp;
                                    <ChatTime time={post.timestamp} />
                                    <br />
                                    <div className="posts-post">
                                        {post.post}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
