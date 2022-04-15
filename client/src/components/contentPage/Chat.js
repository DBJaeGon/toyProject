import React, { useCallback, useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addMsg } from "../../_reducer/chatReducer";
import ChatForm from "components/chatPage/ChatForm";
import ChatCard from "components/chatPage/ChatCard";
import { Upload } from "antd";
import moment from "moment";
import io from "socket.io-client";
import axios from "axios";

const { Dragger } = Upload;

const socket = io("/", { path: "/api/message" });

const Chat = () => {
  const [cnt, setCnt] = useState(0);
  const user = useSelector((state) => state.user.authState.userInfo, shallowEqual);
  const message = useSelector((state) => state.chat.message);
  const messagesEnd = useRef();
  const dispatch = useDispatch();

  const makeChat = useCallback(
    (msg, msgType) => {
      const chatMessage = msg;
      const userId = user.uid;
      const userName = user.lastName + user.firstName;
      const userImages = user.userImage;
      const sendTime = moment();
      const type = msgType;
      return {
        chatMessage,
        userId,
        userName,
        userImages,
        sendTime,
        type,
      };
    },
    [user]
  );

  useEffect(() => {
    if (!user.isAuth) return;
    // console.log("useEffect run");
    const userName = user.lastName + user.firstName;

    socket.on("sendMsg", (msg) => {
      dispatch(addMsg(msg));
    });

    socket.on("user cnt", (cnt) => {
      setCnt(cnt);
    });

    socket.emit("in", makeChat(`<< ${userName}님이 들어오셨습니다. >>`, "text"));

    return () => {
      // console.log("useEffect return");
      socket.emit("out", makeChat(`<< ${userName}님이 나가셨습니다. >>`, "text"));
      socket.off("sendMsg");
      socket.off("user cnt");
    };
  }, [dispatch, makeChat, user]);

  useEffect(() => {
    if (message.length !== 0) {
      setTimeout(() => {
        messagesEnd.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 300);
    }
  }, [message]);

  const handlerBeforeDragger = async (file, fileList) => {
    return false;
  };

  const handleDrop = async (e) => {
    const file = e.dataTransfer.files[0];
    const formData = new FormData();
    formData.append("chatFile", file);
    const { data } = await axios.post("/api/chat/upload/chatFiles", formData);
    // console.log(data);
    socket.emit("chatMsg", makeChat(data.filePath, file.type.split("/")[0]));
  };

  return (
    <div style={{ maxWidth: "80vh", margin: "0 auto" }}>
      {`현재 인원 수 : ${cnt} 명`}
      <Dragger
        style={{
          borderStyle: "none",
          cursor: "auto",
          textAlign: "unset",
        }}
        name="chatFile"
        onDrop={handleDrop}
        maxCount={1}
        openFileDialogOnClick={false}
        showUploadList={false}
        beforeUpload={handlerBeforeDragger}
      >
        <div className="infinite-container">
          {message.map((msg, i) => (
            <ChatCard key={i} msg={msg} />
          ))}
          <div ref={messagesEnd} style={{ float: "left", clear: "both" }}></div>
        </div>
      </Dragger>
      <ChatForm socket={socket} makeChat={makeChat} />
    </div>
  );
};

export default Chat;
