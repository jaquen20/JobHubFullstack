import React, { useState } from "react";
import Profile from "../Profile/Profile";
import ProfileEditor from "../Edit/ProfileEditor";
import EducationAdd from "../Education/EducationAdd";
import ExperienceAdd from "../Edit/ExperienceAdd";
import JobPreferences from "../Jobs/JobPreferences";
import EditJobPreferences from "../Jobs/EditJobPreferences";

const ProfileSection = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const handleClick = (data) => {
    setCurrentPage(data);
  };
  return (
    <div>
      {!currentPage && <Profile page={handleClick} />}
      {currentPage === "educationEditor" && <EducationEditor />}
      {currentPage === "educationAdd" && <EducationAdd />}
      {currentPage === "profileEditor" && <ProfileEditor />}
      {currentPage === "exprEditor" && <ProfileEditor />}
      {currentPage === "exprAdd" && <ExperienceAdd />}
      {currentPage === "skillEditor" && <ProfileEditor />}
      {currentPage === "skillAdd" && <ProfileEditor />}
      {currentPage === "jobPreferencesView" && <JobPreferences />}
      {currentPage === "jobPreferencesEdit" && <EditJobPreferences />}

      {/* <Profile closeParent={handleClick} /> */}
    </div>
  );
};

export default ProfileSection;
