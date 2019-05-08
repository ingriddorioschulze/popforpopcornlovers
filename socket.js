const socketIo = require("socket.io");
const db = require("./db");

exports.init = (server, cookieSessionMiddleware) => {
    const io = socketIo(server);

    io.use(function(socket, next) {
        cookieSessionMiddleware(socket.request, socket.request.res, next);
    });

    const onlineUsers = {};
    const chatMessages = [];

    io.on("connection", socket => {
        if (!socket.request.session || !socket.request.session.userId) {
            return socket.disconnect(true);
        }
        console.log(`socket with the id ${socket.id} is now connected`);

        const userId = socket.request.session.userId;

        socket.emit("chatMessages", chatMessages);

        db.getUsersByIds(Object.values(onlineUsers)).then(({ rows }) => {
            socket.emit("onlineUsers", rows);
        });

        db.getUserData(userId).then(user => {
            socket.broadcast.emit("userJoined", user);
        });

        onlineUsers[socket.id] = userId;

        socket.on("disconnect", () => {
            console.log(`socket with the id ${socket.id} is now disconnected`);
            delete onlineUsers[socket.id];
            socket.broadcast.emit("userLeft", userId);
        });

        socket.on("newChatMessage", message => {
            db.getUserData(socket.request.session.userId).then(user => {
                let newChatObj = {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    users_image: user.users_image,
                    chat: message,
                    id: socket.request.session.userId,
                    timestamp: new Date()
                };
                chatMessages.push(newChatObj);
                if (chatMessages.length > 10) {
                    chatMessages.shift();
                }

                socket.broadcast.emit("newChatMessage", newChatObj);
                socket.emit("newChatMessage", newChatObj);
            });
        });
    });
};
