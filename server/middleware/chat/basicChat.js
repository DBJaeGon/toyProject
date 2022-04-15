module.exports = (io, socket) => {
  const getUserCnt = () => {
    return io.sockets.adapter.rooms.get("chat room")?.size;
  };

  const userInOut = (msg) => {
    socket.to("chat room").emit("sendMsg", msg);
    io.emit("user cnt", getUserCnt());
  };

  socket.on("in", (msg) => {
    socket.join("chat room");
    userInOut(msg);
  });

  socket.on("out", (msg) => {
    socket.leave("chat room");
    userInOut(msg);
  });

  socket.on("chatMsg", (msg) => {
    io.emit("sendMsg", msg);
  });
};
