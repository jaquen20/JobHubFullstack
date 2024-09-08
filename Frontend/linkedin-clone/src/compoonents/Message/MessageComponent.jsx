// import React, { useEffect, useRef, useState } from "react";
// import Styles from "./MessageComponent.module.css";
// import ChatBox from "./ChatBox";
// import { over } from "@stomp/stompjs";
// import MyConnectionCard from "../MyNetwork/MyConnectionCard";
// import UserMessageCard from "./UserMessageCard";
// import SockJS from "sockjs-client";

// const MessageComponent = () => {
//   const [error, setError] = useState("");
//   const [users, setUsers] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [newMessages, setNewMessages] = useState("");
//   const stompClientRef = useRef(null);
//   const loggedUser = localStorage.getItem("LoggedUserEmail");

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const token = localStorage.getItem("Token");

//         const response = await fetch("http://localhost:8080/myConnections", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (!response.ok) {
//           const errorData = await response.json();
//           setError(errorData.error);
//           console.error(errorData);
//         }
//         const data = await response.json();
//         setUsers(data.message);

//         const socket = new SockJS("/ws");
//         stompClientRef.current = over(socket);
//         stompClientRef.current.connect({}, () => {
//           stompClientRef.current.subscribe(
//             "/user/queue/messages",
//             (messages) => {
//               const parsedMessage = JSON.parse(messages.body);
//               setMessages((prevMessages) => [...prevMessages, parsedMessage]);
//             }
//           );
//         });
//         return () => {
//           if (stompClientRef.current) {
//             stompClientRef.current.disconnect();
//           }
//         };
//       } catch (error) {}
//     };
//     fetchUsers();
//   }, []);

//   const handleSendMessage = () => {
//     if (newMessages.trim() === "") return;
//     const message = {
//       sender: loggedUser,
//       receiver: selectedUser.name,
//       messageChats: newMessages,
//       timestamp: new Date().toISOString(),
//     };
//     stompClientRef.current.send(
//       "http://localhost:8080/",
//       {},
//       JSON.stringify(message)
//     );
//     setMessages([...messages, message]);
//     setNewMessages("");
//   };

//   return (
//     <div className={Styles.body}>
//       <div className={Styles.container}>
//         <div className={Styles.userSecton}>
//           <div style={{ position: "sticky", top: "0" }}>
//             <form action="#" className={Styles.SearchSection}>
//               <input
//                 type="text"
//                 placeholder="Search users..."
//                 className={Styles.search}
//               />
//             </form>
//           </div>
//           <div className={Styles.cardSection}></div>
//           <div className={Styles.card}>
//             <UserMessageCard
//               users={users}
//               selectedUser={selectedUser}
//               setSelectedUser={setSelectedUser}
//             />
//           </div>
//         </div>
//         {selectedUser ? (
//           <div className={Styles.chatBox}>
//             <ChatBox
//               loggedUser={loggedUser}
//               selectedUser={selectedUser}
//               setNewMessages={setNewMessages}
//               handleSendMessage={handleSendMessage}
//             />
//           </div>
//         ) : (
//           <div>select a user to start chatting</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MessageComponent;
