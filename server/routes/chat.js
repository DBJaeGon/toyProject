module.exports = (io, socket) => {
  const chatMsg = (msg) => {
    // console.log(payload, socket.id);
    socket.emit("sendMsg", msg);
  };

  socket.on("chatMsg", chatMsg);
};
