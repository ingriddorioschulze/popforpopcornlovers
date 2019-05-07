import * as io from "socket.io-client";

const socket = io.connect();

socket.on("welcome", function(data) {
    console.log(data);
    socket.emit("thanks", {
        message: "Thank you. It is great to be here."
    });
});
