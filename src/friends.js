import React from "react";
import { connect } from "react-redux";
import { loadFriends, acceptRequest, unfriend } from "./actions";
import { Link } from "react-router-dom";

const FriendRequest = ({ friendRequest, accept }) => (
    <div>
        <Link to={`/user/${friendRequest.id}`}>
            <img
                className="friend-requests-image"
                src={friendRequest.users_image}
            />
        </Link>
        <div className="friend-requests-name">
            <Link to={`/user/${friendRequest.id}`}>
                {`${friendRequest.first_name} ${friendRequest.last_name}`}{" "}
            </Link>

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
        <Link to={`/user/${friend.id}`}>
            <img className="friend-image" src={friend.users_image} />
        </Link>
        <div className="friend-name">
            <Link to={`/user/${friend.id}`}>
                {`${friend.first_name} ${friend.last_name}`}{" "}
            </Link>

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
        let friendRequests;
        let friends;

        if (this.props.friendRequests.length > 0) {
            friendRequests = (
                <React.Fragment>
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
                </React.Fragment>
            );
        }
        if (this.props.friends.length > 0) {
            friends = (
                <React.Fragment>
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
                </React.Fragment>
            );
        }

        if (friends || friendRequests) {
            return (
                <div className="friends-container">
                    {friendRequests}
                    {friends}
                </div>
            );
        } else {
            return (
                <div className="empty-friends">
                    no friends or friend requests yet
                </div>
            );
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Friends);
