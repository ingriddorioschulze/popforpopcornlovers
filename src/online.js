import React from "react";
import { connect } from "react-redux";

class Online extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <div className="online-now-container">
                        <div className="online-now-text">poplobvers online</div>
                        <div className="online-now-area">
                            {this.props.onlineUsers.map(user => (
                                <div key={user.id}>
                                    <img
                                        className="online-now-image"
                                        src={user.users_image}
                                    />
                                    <div className="online-now-name">
                                        {user.first_name} {user.last_name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        onlineUsers: state.onlineUsers
    };
};

export default connect(mapStateToProps)(Online);
