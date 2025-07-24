const socketIO = require('socket.io');

function initSocket(server) {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        // socket.on("chat", (msg) => {
        //     io.emit("chat", msg);
        // });

        socket.on("public chat", (msg) => {
            io.emit("public chat", msg);
        })

        socket.on("private chat", (msg) => {
            io.emit("private chat", msg);
        });

        socket.on("room chat", (roomID, msg) => {
            io.emit("room chat", msg);
        });

        socket.on("world chat", (msg) => {
            io.emit("world chat", msg);
        })
    });
}

module.exports = initSocket;
