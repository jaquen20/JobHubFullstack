import React, { useEffect, useRef, useState } from "react";
import Styles from "./Message.module.css";
import MessageCard from "./MessageCardSend";
import MessageCardReceived from "./MessageCardReceived";

const Message = ({ chatUser, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    fetchMessages();
    ws.current = new WebSocket("ws://localhost:8080/ws/messages");
    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (
        (message.sender === chatUser && message.receiver === chatUser) ||
        (message.sender === chatUser && message.receiver === currentUser)
      ) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };
    return () => ws.current.close();
  }, [chatUser, currentUser]);
  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:8080/messages/{4}", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
        console.error(errorData);
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("error");
    }
  };
  const handleSendMessage = async () => {
    const message = {
      sender: currentUser,
      receiver: chatUser,
      content: newMessage,
    };
    try {
      const response = await fetch("http://localhost:8080/sendMsg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(message),
      });
      if (response.ok) {
        ws.current.send(JSON.stringify(message));
        setNewMessage("");
      } else {
        console.error("error");
      }
    } catch (error) {
      console.error("error");
    }
  };

  return (
    <div>
      <div className={Styles.MessageList}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              msg.sender === currentUser ? "sent" : "received"
            }`}
          >
            <p>{msg.content}</p>
            <small>{new Date(msg.timeStamp).toLocaleTimeString}</small>
          </div>
        ))}
      </div>
      <div className={Styles.MessageInput}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="type a message"
        />
        <button onClick={handleSendMessage}>send</button>
      </div>
    </div>
  );
};

export default Message;
