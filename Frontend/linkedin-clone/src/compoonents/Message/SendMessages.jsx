// import React, { useState, useEffect } from "react";
// import SockJS from "sockjs-client";
// import { Stomp } from "@stomp/stompjs";

// const SendMessages = () => {
//   const [message, setMessage] = useState("");
//   const [privateMessage, setPrivateMessage] = useState("");
//   const [to, setTo] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [stompClient, setStompClient] = useState(null);
//   const [privateStompClient, setPrivateStompClient] = useState(null);
//   const [username, setUsername] = useState("");
//   setUsername("rohit@gmail.com");
//   const receiver = "sandeep@gmail.com";

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         if (receiver) {
//           const token = localStorage.getItem("Token");
//           const response = await fetch(
//             `http://localhost:8080/api/chat/messages/${receiver}`,
//             {
//               method: "GET",
//               headers: {
//                 // "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           if (response.ok) {
//             const data = await response.json();
//             setPrivateMessage(data.messageChats);
//             console.log("chat body" + data.messageChats);
//           }
//         }
//       } catch (error) {}
//     };
//     fetchUsers();
//   }, [receiver]);

//   useEffect(() => {
//     const socket = new SockJS("http://localhost:8080/ws");
//     const client = Stomp.over(socket);
//     client.connect({}, (frame) => {
//       console.log(frame);
//       client.subscribe("/all/messages", (result) => {
//         showMessage(JSON.parse(result.body));
//       });
//     });

//     const privateSocket = new SockJS("http://localhost:8080/ws");
//     const privateClient = Stomp.over(privateSocket);
//     privateClient.connect({}, (frame) => {
//       console.log(frame);
//       privateClient.subscribe(`/user/${username}/queue/messages`, (result) => {
//         showMessage(JSON.parse(result.body));
//       });
//     });

//     setStompClient(client);
//     setPrivateStompClient(privateClient);

//     return () => {
//       client.disconnect();
//       privateClient.disconnect();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (stompClient) {
//       stompClient.send(
//         "/app/application",
//         {},
//         JSON.stringify({ text: message })
//       );
//       setMessage("");
//     }
//   };

//   const sendPrivateMessage = () => {
//     const chat = { receiver: receiver, messageChats: message };
//     if (privateStompClient) {
//       privateStompClient.send(
//         "/app/chat",
//         {},
//         JSON.stringify({ receiver: receiver, messageChats: privateMessage })
//       );
//       //   setMessage("")
//       setPrivateMessage("");
//       //   setTo("");
//     }
//   };

//   const showMessage = (message) => {
//     setMessages((prevMessages) => [...prevMessages, message]);
//   };
//   return (
//     <div>
//       {/* <div>
//         <button onClick={sendMessage}>Send</button>
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Text"
//         />
//       </div> */}
//       <br />
//       <div>
//         <button onClick={sendPrivateMessage}>Send Private</button>
//         <input
//           type="text"
//           value={privateMessage}
//           onChange={(e) => setPrivateMessage(e.target.value)}
//           placeholder="Private Message"
//         />
//         <input
//           type="text"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           placeholder="To"
//         />
//       </div>
//       <br />
//       <br />
//       <br />
//       <div id="messages">
//         {messages.map((msg, index) => (
//           <p key={index}>message: {msg.text}</p>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SendMessages;
