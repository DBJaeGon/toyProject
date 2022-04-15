const { Server } = require("socket.io");
const registerChat = require("./basicChat");

module.exports = (httpServer) => {
  const io = new Server(httpServer, { path: "/api/message" });

  const onConnection = (socket) => {
    // console.log(socket.id);
    registerChat(io, socket);
  };

  io.on("connection", onConnection);
};
