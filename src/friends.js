import React from "react";
import { connect } from "react-redux";
import { loadFriends, acceptRequest, unfriend } from "./actions";

const FriendRequest = ({ friendRequest, accept }) => (
    <React.Fragment>
        <div className="friend-requests-image">
            <img src={friendRequest.users_image} />
        </div>
        <div className="friend-requests-name">
            {`${friendRequest.first_name} ${friendRequest.last_name}`}
        </div>
        <button
            onClick={() => accept(friendRequest.id)}
            className="friend-requests-accept-button"
        >
            accept friend request
        </button>
    </React.Fragment>
);

const Friend = ({ friend, unfriend }) => (
    <React.Fragment>
        <div className="friend-image">
            <img src={friend.users_image} />
        </div>
        <div className="friend-name">
            {`${friend.first_name} ${friend.last_name}`}
        </div>
        <button
            onClick={() => unfriend(friend.id)}
            className="friend-unfriend-button"
        >
            unfriend
        </button>
    </React.Fragment>
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
            <div className="friends-area">
                <div className="friend-requests">
                    <div className="friend-requests-text">friend requests</div>

                    {this.props.friendRequests.map(friendRequest => (
                        <FriendRequest
                            key={friendRequest.id}
                            friendRequest={friendRequest}
                            accept={this.props.acceptRequest}
                        />
                    ))}
                </div>
                <div className="friends">
                    <div className="friends-text">friends</div>
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
