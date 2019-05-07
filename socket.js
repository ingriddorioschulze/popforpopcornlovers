const socketIo = require("socket.io");

exports.init = (server, cookieSessionMiddleware) => {
    const io = socketIo(server, { origins: "localhost:8080" });

    io.use(function(socket, next) {
        cookieSessionMiddleware(socket.request, socket.request.res, next);
    });

    io.on("connection", function(socket) {
        console.log(`socket with the id ${socket.id} is now connected`);

        socket.on("disconnect", function() {
            console.log(`socket with the id ${socket.id} is now disconnected`);
        });

        socket.on("thanks", function(data) {
            console.log(data);
        });

        socket.emit("welcome", {
            message: "Welcome. It is nice to see you"
        });
    });
};
