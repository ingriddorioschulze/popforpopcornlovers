const INITIAL_STATE = {
    friends: [],
    friendRequests: [],
    searchResults: [],
    resultsVisible: false
};
export function reducer(state = INITIAL_STATE, action) {
    if (action.type === "FRIENDS_LOADED") {
        return {
            ...state,
            friends: action.friends.filter(friend => friend.request_accepted),
            friendRequests: action.friends.filter(
                friend => !friend.request_accepted
            )
        };
    } else if (action.type === "REQUEST_ACCEPTED") {
        const newFriend = state.friendRequests.find(
            friendRequest => friendRequest.id === action.friend
        );
        newFriend.request_accepted = true;
        return {
            ...state,
            friends: state.friends.concat(newFriend),
            friendRequests: state.friendRequests.filter(
                friendRequest => friendRequest.id !== action.friend
            )
        };
    } else if (action.type === "UNFRIEND") {
        return {
            ...state,
            friends: state.friends.filter(friend => friend.id !== action.friend)
        };
    } else if (action.type === "SEARCH_DATA") {
        return {
            ...state,
            searchResults: action.data,
            resultsVisible: true
        };
    } else if (action.type === "CLOSE_SEARCH_RESULTS") {
        return {
            ...state,
            resultsVisible: false
        };
    } else {
        return state;
    }
}
