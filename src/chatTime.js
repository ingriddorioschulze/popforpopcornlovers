import React from "react";
import * as moment from "moment";

export default class ChatTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date()
        };
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
