import React from "react";
import { connect } from "react-redux";
import { loadFriends, acceptRequest, unfriend } from "./actions";

const FriendRequest = ({ friendRequest, accept }) => (
    <div>
        <img
            className="friend-requests-image"
            src={friendRequest.users_image}
        />
        <div className="friend-requests-name">
            {`${friendRequest.first_name} ${friendRequest.last_name}`}
            <br />
            <button
                onClick={() => accept(friendRequest.id)}
                className="friend-requests-accept-button"
            >
                accept friend request
            </button>
        </div>
    </div>
);

const Friend = ({ friend, unfriend }) => (
    <div>
        <img className="friend-image" src={friend.users_image} />
        <div className="friend-name">
            {`${friend.first_name} ${friend.last_name}`}
            <br />
            <button
                onClick={() => unfriend(friend.id)}
                className="friend-unfriend-button"
            >
                unfriend
            </button>
        </div>
    </div>
);

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
        },
        acceptRequest(id) {
            dispatch(acceptRequest(id));
        },
        unfriend(id) {
            dispatch(unfriend(id));
        }
    };
};

class Friends extends React.Component {
    componentDidMount() {
        this.props.loadFriends();
    }
    render() {
        return (
            <div className="friends-container">
                <div className="friend-requests-text">friend requests</div>
                <div className="friend-requests">
                    {this.props.friendRequests.map(friendRequest => (
                        <FriendRequest
                            key={friendRequest.id}
                            friendRequest={friendRequest}
                            accept={this.props.acceptRequest}
                        />
                    ))}
                </div>
                <div className="friends-text">friends</div>
                <div className="friends-friends">
                    {this.props.friends.map(friend => (
                        <Friend
                            key={friend.id}
                            friend={friend}
                            unfriend={this.props.unfriend}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Friends);
