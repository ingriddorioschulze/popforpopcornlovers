import React from "react";
import { connect } from "react-redux";
import { socket } from "./socketClient";
import { Link } from "react-router-dom";
import ChatTime from "./chatTime";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        if (e.which === 13) {
            e.preventDefault();
            const newChat = e.target.value;
            if (!newChat) {
                return;
            }
            socket.emit("newChatMessage", newChat);
            e.target.value = "";
        }
    }

    componentDidUpdate() {
        this.myDiv.scrollTop = this.props.chatMessages.length * 136;
    }

    render() {
        return (
            <div className="chat">
                <div
                    className="chat-container"
                    ref={chatsContainer => (this.myDiv = chatsContainer)}
                >
                    <Link className="chat-others-online" to="/online">
                        see other poplovers online
                    </Link>
                    <div className="chat-area">
                        {this.props.chatMessages.map((message, i) => (
                            <div className="chat-content" key={i}>
                                <img
                                    className="chat-image"
                                    src={message.users_image}
                                />
                                <div className="chat-name">
                                    {message.first_name} {message.last_name} |{" "}
                                    <ChatTime time={message.timestamp} />
                                    <br />
                                    <div className="chat-message">
                                        {message.chat}
                                    </div>
                                </div>
                                <br />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chat-textarea-container">
                    <textarea
                        className="chat-textarea"
                        placeholder="write here your message"
                        onKeyDown={this.handleInput}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        chatMessages: state.chatMessages
    };
};

export default connect(mapStateToProps)(Chat);
