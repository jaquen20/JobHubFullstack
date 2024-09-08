import React, { useEffect, useRef, useState } from "react";
import Styles from "./ChatBox.module.css";

const ChatBox = ({
  loggedInUser,
  selectedUser,
  messages,
  newMessages,
  setNewMessages,
  handleSendMessage,
}) => {
  // const [messages, setMessages] = useState([]);
  // const [newMessages, setNewMessages] = useState();

  // const handleSendMessage = () => {
  //   if (newMessages.trim() === "") return;
  //   setMessages([
  //     ...messages,
  //     { sender: "Me", text: newMessages, avatar: "avatar" },
  //   ]);
  //   setNewMessages("");
  // };

  // const handleSendMessage = () => {
  //   if (newMessages.trim() === "") return;

  //   const message = {
  //     sender: loggedInUser,
  //     receiver: selectedUser.name,
  //     messageChats: newMessages,
  //     timestamp: new Date().toISOString(),
  //   };
  //   stompClientRef.current.send("/localhost", {}, JSON.stringify(message));
  //   setMessages([...messages, message]);
  //   setNewMessages("");
  // };

  return (
    <div>
      <div className={` ${Styles.Body} flex-grow-0   border-top`}>
        <div className={Styles.UserInfo}>
          <div>
            <img
              src="src/assets/images/Background.jpg"
              alt=""
              className={Styles.Image}
            />
          </div>
          <div>Sandeep verma</div>
        </div>
        <div className={Styles.Chats}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${Styles.message} ${
                message.sender === loggedInUser
                  ? Styles.SenderMsg
                  : Styles.ReceiverMsg
              } `}
            >
              {message.text}
            </div>
          ))}
        </div>
        <form action="#" className={`${Styles.FormContainer} input-group`}>
          <input
            type="text"
            className="form-control"
            placeholder="Type your message"
            value={newMessages}
            onChange={(e) => setNewMessages(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSendMessage}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
