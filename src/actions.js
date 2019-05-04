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
