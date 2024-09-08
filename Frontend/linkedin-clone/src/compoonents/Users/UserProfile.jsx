import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await fetch("http://localhost:8080/user/myProfile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.details);
          console.log(data);
        } else {
          const errorData = response.json;
          setError(errorData.error);
          console.error(errorData);
        }
      } catch (error) {
        setError("un expected error occurred");
        console.error("error", error);
      }
    };
    fetchUserDetails();
  }, []);
  if (error) {
    return <div>Error:{error}</div>;
  }
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>user details</h2>
      {console.log(user.fullName)}
      <p>{user.fullName}</p>
      <p>{user.city}</p>
      {/* <p>{user.educations}</p> */}
      <p>{user.dob}</p>
      {/* <p>{user.experiences}</p> */}
      <p>{user.webLink}</p>
      <p>{user.phoneNo}</p>
    </div>
  );
};

export default UserProfile;
