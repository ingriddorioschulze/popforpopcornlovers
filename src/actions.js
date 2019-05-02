import axios from "./axios";

export function loadFriends() {
    return axios.get("/api/friends").then(response => {
        return {
            type: "FRIENDS_LOADED",
            friends: response.data
        };
    });
}
