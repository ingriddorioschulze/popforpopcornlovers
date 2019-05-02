const INITIAL_STATE = {
    friends: [],
    friendRequests: []
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
    } else {
        return state;
    }
}
