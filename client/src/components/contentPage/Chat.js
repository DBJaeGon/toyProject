import React from "react";
import ChatForm from "components/chatPage/ChatForm";

const Chat = () => {
  return (
    <>
      <div>
        <p style={{ fontSize: "2rem", textAlign: "center" }}>Real Time Chat</p>
      </div>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div className="infinite-container">
          {/* <div
            ref={(el) => {
              this.messagesEnd = el;
            }}
            style={{ float: "left", clear: "both" }}
          ></div> */}
        </div>
        <ChatForm />
      </div>
    </>
  );
};

export default Chat;
