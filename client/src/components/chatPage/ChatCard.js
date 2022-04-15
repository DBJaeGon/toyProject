import React from "react";
import { Comment, Tooltip, Avatar, Image, Button } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import axios from "axios";

const ChatCard = ({ msg }) => {
  const { uid } = useSelector((state) => state.user.authState.userInfo);

  const handleDownload = async (e) => {
    const ImgSrc = e.target.parentNode.previousSibling.firstElementChild.src;
    const fileData = await axios.get(ImgSrc, {
      responseType: "blob",
    });
    // console.log(fileData);
    const fileName = ImgSrc.split("/").pop();
    const url = window.URL.createObjectURL(new Blob([fileData.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Comment
      author={<strong style={{ color: "black" }}>{msg.userName}</strong>}
      avatar={
        msg.userImage ? (
          <Avatar src={msg.userImage} alt={msg.userName} />
        ) : (
          <Avatar style={{ background: "#722ed1" }}>{msg.userName}</Avatar>
        )
      }
      content={
        msg.type === "image" ? (
          <>
            <Image src={msg.chatMessage} style={{ maxWidth: "35vh" }} preview={{ mask: false }} />
            <Button
              type="link"
              onClick={handleDownload}
              style={{ padding: "0", margin: "0 0 0 3px" }}
            >
              저장
            </Button>
          </>
        ) : msg.type === "video" ? (
          <video style={{ maxWidth: "50vh" }} src={msg.chatMessage} type="video/mp4" controls />
        ) : (
          <p
            style={
              uid === msg.userId
                ? {
                    display: "inline-flex",
                    padding: "5px",
                    backgroundColor: "#ffd500",
                    borderRadius: "5px",
                  }
                : {
                    display: "inline-flex",
                    padding: "5px",
                    backgroundColor: "#ffffff",
                    borderRadius: "5px",
                  }
            }
          >
            {msg.chatMessage}
          </p>
        )
      }
      datetime={
        <Tooltip title={moment(msg.sendTime).format("YYYY-MM-DD HH:mm:ss")}>
          <span style={{ color: "#7f7f7f", marginLeft: "10px" }}>
            {moment(msg.sendTime).fromNow()}
          </span>
        </Tooltip>
      }
    />
  );
};

export default ChatCard;
