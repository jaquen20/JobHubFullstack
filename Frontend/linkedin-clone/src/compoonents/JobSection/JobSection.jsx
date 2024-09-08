import React, { useCallback, useState } from "react";
import JobList from "../Jobs/JobList";
import JobDescription from "../Jobs/JobDescription";
import Another from "../Jobs/Another";

const JobSection = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);

  const handleClick = useCallback((pageName, data) => {
    setCurrentPage(pageName);

    setData(data);
  }, []);

  const handleClick2 = useCallback((pageName, data) => {
    setCurrentPage(pageName);
    // console.log("home" + data);
    setData2(data);
  }, []);

  return (
    <div>
      {!currentPage && <JobList page={handleClick} />}
      {currentPage === "jobDescription" && (
        <JobDescription jobData={data} page={handleClick2} />
      )}
      {currentPage === "apply" && <Another job={data2} />}

      {/* {currentPage === "applySteps" && <EducationAdd />}
      {currentPage === "profileEditor" && <ProfileEditor />}
      {currentPage === "exprEditor" && <ProfileEditor />}
      {currentPage === "exprAdd" && <ExperienceAdd />}
      {currentPage === "skillEditor" && <ProfileEditor />}
      {currentPage === "skillAdd" && <ProfileEditor />}
      {currentPage === "jobPreferencesView" && <JobPreferences />}
      {currentPage === "jobPreferencesEdit" && <EditJobPreferences />} */}
    </div>
  );
};

export default JobSection;
