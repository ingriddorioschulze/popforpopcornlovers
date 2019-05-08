import axios from "./axios";

export function loadFriends() {
    return axios.get("/api/friends").then(response => {
        return {
            type: "FRIENDS_LOADED",
            friends: response.data
        };
    });
}

export function acceptRequest(id) {
    return axios.post(`/api/friend/${id}/accept`).then(() => {
        return {
            type: "REQUEST_ACCEPTED",
            friend: id
        };
    });
}

export function unfriend(id) {
    return axios.post(`/api/friend/${id}/unfriend`).then(() => {
        return {
            type: "UNFRIEND",
            friend: id
        };
    });
}

export function search(text) {
    return axios
        .get(`/api/search`, { params: { text: text } })
        .then(response => {
            return {
                type: "SEARCH_DATA",
                data: response.data
            };
        });
}

export function closeSearchResults() {
    return {
        type: "CLOSE_SEARCH_RESULTS"
    };
}

export function onlineUsers(users) {
    return {
        type: "ONLINE_USERS",
        onlineUsers: users
    };
}

export function userJoined(user) {
    return {
        type: "USER_JOINED",
        userJoined: user
    };
}

export function userLeft(userId) {
    return {
        type: "USER_LEFT",
        userLeft: userId
    };
}
