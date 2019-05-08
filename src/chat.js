import React from "react";
import { connect } from "react-redux";
import { socket } from "./socketClient";
import * as moment from "moment";

class ChatTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date()
        };
        // this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({ time: new Date() });
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <span className="chat-timestamp">
                {moment(this.props.time).fromNow()}
            </span>
        );
    }
}

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
            <div>
                <h1>chat!</h1>
                <div
                    className="chat-container"
                    ref={chatsContainer => (this.myDiv = chatsContainer)}
                >
                    {this.props.chatMessages.map((message, i) => (
                        <div key={i}>
                            <div>
                                {message.first_name} {message.last_name}
                            </div>
                            <img
                                className="chat-image"
                                src={message.users_image}
                            />
                            <span className="chat-message">{message.chat}</span>
                            <br />
                            <ChatTime time={message.timestamp} />
                        </div>
                    ))}
                </div>
                <textarea onKeyDown={this.handleInput} />
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
