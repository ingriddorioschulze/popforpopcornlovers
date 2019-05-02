import React from "react";
import axios from "./axios";

export default class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
        this.send = this.send.bind(this);
        this.unfriend = this.unfriend.bind(this);
        this.cancel = this.cancel.bind(this);
        this.accept = this.accept.bind(this);
    }

    componentDidMount() {
        axios.get(`/api/friend/${this.props.recipient}`).then(({ data }) => {
            this.setState({ loading: false, ...data });
        });
    }

    send() {
        axios.post(`/api/friend/${this.props.recipient}/send`).then(() => {
            this.setState({
                request_accepted: false,
                id_recipient: this.props.recipient
            });
        });
    }

    unfriend() {
        axios.post(`/api/friend/${this.props.recipient}/unfriend`).then(() => {
            this.setState({
                request_accepted: undefined,
                id_recipient: undefined
            });
        });
    }

    cancel() {
        axios.post(`/api/friend/${this.props.recipient}/cancel`).then(() => {
            this.setState({
                request_accepted: undefined,
                id_recipient: undefined
            });
        });
    }

    accept() {
        axios.post(`/api/friend/${this.props.recipient}/accept`).then(() => {
            this.setState({
                request_accepted: true
            });
        });
    }

    render() {
        if (this.state.loading === true) {
            return null;
        } else if (this.state.request_accepted === undefined) {
            return (
                <div>
                    <button className="send-friend-request" onClick={this.send}>
                        send friend request
                    </button>
                </div>
            );
        } else if (this.state.request_accepted === true) {
            return (
                <div>
                    <button className="unfriend" onClick={this.unfriend}>
                        unfriend
                    </button>
                </div>
            );
        } else if (this.state.id_recipient === this.props.recipient) {
            return (
                <div>
                    <button
                        className="cancel-friend-request"
                        onClick={this.cancel}
                    >
                        cancel friend request
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    <button
                        className="accept-friend-request"
                        onClick={this.accept}
                    >
                        accept friend request
                    </button>
                </div>
            );
        }
    }
}
