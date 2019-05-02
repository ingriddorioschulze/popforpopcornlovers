import React from "react";
import { connect } from "react-redux";
import { loadFriends } from "./actions";

const mapStateToProps = state => {
    return {
        friends: state.friends,
        friendRequests: state.friendRequests
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadFriends() {
            dispatch(loadFriends());
        }
    };
};

class Friends extends React.Component {
    componentDidMount() {
        this.props.loadFriends();
    }
    render() {
        return <div>Friends:</div>;
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Friends);
