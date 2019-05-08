import * as io from "socket.io-client";
import {
    onlineUsers,
    userJoined,
    userLeft,
    chatMessages,
    newChatMessage
} from "./actions";

export let socket;

export function init(store) {
    if (!socket) {
        socket = io.connect();

        socket.on("newChatMessage", message => {
            store.dispatch(newChatMessage(message));
        });

        socket.on("chatMessages", messages => {
            store.dispatch(chatMessages(messages));
        });

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
