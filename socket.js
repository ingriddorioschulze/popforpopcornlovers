const socketIo = require("socket.io");
const db = require("./db");

exports.init = (server, cookieSessionMiddleware) => {
    const io = socketIo(server);

    io.use(function(socket, next) {
        cookieSessionMiddleware(socket.request, socket.request.res, next);
    });

    let onlineUsers = {};
    io.on("connection", socket => {
        if (!socket.request.session || !socket.request.session.userId) {
            return socket.disconnect(true);
        }
        console.log(`socket with the id ${socket.id} is now connected`);

        const userId = socket.request.session.userId;

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
    });

    // socket.on("newChatMessage", data => {
    //if using db method -- INSERT chat and userId
    //if using array method -- you need to push chat into the chats array
    //regard the methods you use you'll have to query to db to get info
    // about the user who posted the message (first name, last name, picture)
    // get users first name , last name, picture and chat message in to Redux
    //create an object that will store the users info and this object needs
    //to look like  the other objects in the chats array.

    // let newChatObject = {
    //     firstname: results.rows[0].first_name,
    //     lastname: results.rows[0].last_name,
    //     image: results.rows[0].userImage,
    //     chat: data,
    //     id: socket.request.session.userId,
    //     timestamp: results.rows[0].timestamp
    // }

    //     socket.broadcast("chatMessageRedux", newChatObject);
    // });
};
