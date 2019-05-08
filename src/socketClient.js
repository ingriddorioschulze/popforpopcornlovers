import * as io from "socket.io-client";
import { onlineUsers, userJoined, userLeft } from "./actions";

export let socket;

export function init(store) {
    if (!socket) {
        socket = io.connect();

        // socket.on("chatMessageRedux", data => {
        //     store.dispatch(addNewChatToRedux(data))
        // });

        // socket.on("chatMessages", data => {
        //     store.dispatch(getMostRecentChats(data));
        // });

        socket.on("onlineUsers", users => {
            store.dispatch(onlineUsers(users));
        });

        socket.on("userJoined", user => {
            store.dispatch(userJoined(user));
        });

        socket.on("userLeft", userId => {
            store.dispatch(userLeft(userId));
        });
    }
}
