import React from "react";
import { connect } from "react-redux";

class Online extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <div>Online Now</div>
                {this.props.onlineUsers.map(user => (
                    <div key={user.id}>
                        <div>
                            {user.first_name} {user.last_name}
                        </div>
                        <img src={user.users_image} />
                    </div>
                ))}
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
