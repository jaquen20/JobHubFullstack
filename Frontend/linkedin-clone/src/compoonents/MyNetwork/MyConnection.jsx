// import React, { useEffect, useState } from "react";
// import MyConnectionCard from "./MyConnectionCard";
// import Styles from "./MyConnection.module.css";

// const MyConnection = () => {
//   const [Connections, setConnections] = useState([]);
//   const [error, setError] = useState("");
//   useEffect(() => {
//     const fetchUserDetails = async () => {
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
//           const errorData =  response.json;
//           setError(errorData.error);
//           console.error(errorData);
//           return;
//         }
//         const data = await response.json();
//         setConnections(data.message);
//         console.log("this is connection info" + data.message);
//       } catch (error) {
//         setError("un expected error occurred");
//         console.error("error", error);
//       }
//     };
//     fetchUserDetails();
//   }, []);
//   if (error) {
//     return <div>Error:{error}</div>;
//   }
//   if (!Connections) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className={Styles.Container}>
//       <div className={Styles.TopContainer}>
//         <div className={Styles.ConnectionNo}>31 Connections</div>
//         <div className={Styles.SearchContainer}>
//           <div className={Styles.SortBy}>Sort by: Recently Added</div>
//           <div className={Styles.SearchByName}>
//             <form action="get">
//               <input
//                 type="text"
//                 placeholder="Search by name"
//                 className={Styles.Search}
//               />
//             </form>
//           </div>
//           <div className={Styles.Filter}>Search With filters</div>
//         </div>
//       </div>
//       <hr />
//       <div className={Styles.MyConnectionCard}>
//         {Connections.map((data, id) => {
//           if (id < 6) {
//             return <MyConnection key={id} data={data} />;
//           }
//           return null;
//         })}
//         <MyConnectionCard />
//       </div>
//       <hr />
//     </div>
//   );
// };

// export default MyConnection;

import React, { useEffect, useState } from "react";
import MyConnectionCard from "./MyConnectionCard";
import Styles from "./MyConnection.module.css";

const MyConnection = () => {
  const [connections, setConnections] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await fetch("http://localhost:8080/myConnections", {
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
          return;
        }

        const data = await response.json();
        setConnections(data.message);
        console.log("This is connection info:", data.message);
      } catch (error) {
        setError("Unexpected error occurred");
        console.error("Error:", error);
      }
    };

    fetchUserDetails();
  }, []); // Empty dependency array ensures this runs only once

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!connections.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form>{/* Your form elements */}</form>
      <div className={Styles.Filter}>Search With filter</div>
      <hr />
      <div className={Styles.MyConnectionCard}>
        {connections.slice(0, 6).map((data, id) => (
          <MyConnectionCard key={id} data={data} />
        ))}
      </div>
      <hr />
    </div>
  );
};

export default MyConnection;
