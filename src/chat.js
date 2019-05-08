import React from "react";
import { connect } from "react-redux";
import { socket } from "./socketClient";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        if (e.which === 13) {
            const newChat = e.target.value;
            socket.emit("newChatMessage", newChat);
            console.log("this.myDiv: ", this.myDiv);
        }
    }

    //find out when there is a new chat message.

    componentDidUpdate() {
        this.myDiv.scrollTop = "100px";
    }

    render() {
        return (
            <div>
                <h1>chat!</h1>
                <div
                    className="chat-container"
                    ref={chatsContainer => (this.myDiv = chatsContainer)}
                >
                    {/* <span>chat messages</span>
                    <span>chat messages</span>
                    <span>chat messages</span>
                    <span>chat messages</span>
                    <span>chat messages</span>
                    <span>chat messages</span>
                    <span>chat messages</span>
                    <span>chat messages</span>
                    <span>chat messages</span>
                    <span>chat messages</span> */}
                </div>
                <textarea onKeyDown={this.handleInput} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

export default connect(mapStateToProps)(Chat);
