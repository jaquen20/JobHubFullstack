import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./compoonents/Users/Login.jsx";
import UserProfile from "./compoonents/Users/UserProfile.jsx";
import Profile from "./compoonents/Profile/Profile.jsx";
import Connection from "./compoonents/MyNetwork/Connection.jsx";
import DropdownProfile from "./compoonents/Others/DropdownProfile.jsx";
import JobList from "./compoonents/Jobs/JobList.jsx";
import MyConnection from "./compoonents/MyNetwork/MyConnection.jsx";
import RegistrationForm from "./compoonents/Users/RegistrationForm.jsx";
import Success from "./compoonents/RegistrationProcess/Success.jsx";
import { useEffect, useState } from "react";
import Signup from "./compoonents/Users/Signup.jsx";
import Home from "./compoonents/Home/Home.jsx";
import CommentPage from "./compoonents/Comment/CommentPage.jsx";
import NotificationPage from "./compoonents/Notificationn/NotificationPage.jsx";
import PostJobForm from "./compoonents/PostJobs/PostJobForm.jsx";
import ProfileEditor from "./compoonents/Edit/ProfileEditor.jsx";
import EducationEditor from "./compoonents/Edit/EducationEditor.jsx";
import JobDescription from "./compoonents/Jobs/JobDescription.jsx";
import ApplySteps from "./compoonents/Jobs/ApplySteps.jsx";
import JobPreferences from "./compoonents/Jobs/JobPreferences.jsx";
import EditJobPreferences from "./compoonents/Jobs/EditJobPreferences.jsx";
import ExperienceAdd from "./compoonents/Edit/ExperienceAdd.jsx";
import EducationAdd from "./compoonents/Education/EducationAdd.jsx";
import AddExperiences from "./compoonents/Experiences/AddExperiences.jsx";
import ProfileSection from "./compoonents/ProfileSection/ProfileSection.jsx";
import JobSection from "./compoonents/JobSection/JobSection.jsx";
import ApplyJobs from "./compoonents/Jobs/ApplyJobs.jsx";
import Another from "./compoonents/Jobs/Another.jsx";
import NewsCard from "./compoonents/Rightbar/NewsCard.jsx";
import PostPage from "./compoonents/Middle/PostPage.jsx";
import JobDetails from "./compoonents/Users/JobDetails.jsx";
import EducationDetails from "./compoonents/Users/EducationDetails.jsx";
import PersonalDetails from "./compoonents/Users/PersonalDetails.jsx";
import Navbar from "./compoonents/Navbar/Navbar.jsx";
import Network from "./compoonents/Network/Network.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {};
  });
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="*" element={<Navigate to={"/login"} />} /> */}
        <Route path="/enterDetails" element={<RegistrationForm />} />
      </Routes>

      <Routes>
        <Route
          path="/home"
          element={
            <>
              <Home />
            </>
          }
        />

        <Route path="/success" element={<Success />} />
        <Route path="/postJob" element={<PostJobForm />} />
        <Route path="/jobprefer" element={<JobPreferences />} />
        <Route path="/editJob" element={<EditJobPreferences />} />
        <Route path="/another" element={<Another />} />

        <Route path="/jd" element={<JobDetails />} />
        <Route path="/rd" element={<EducationDetails />} />
        <Route path="/rdp" element={<PersonalDetails />} />

        <Route path="/prof" element={<ProfileSection />} />
        <Route path="/jobSection" element={<JobSection />} />
        <Route path="/news" element={<NewsCard />} />
        <Route path="/post" element={<PostPage />} />

        <Route path="/profileEdit" element={<ProfileEditor />} />
        <Route path="/educationEditor" element={<EducationEditor />} />
        <Route path="/expr" element={<ExperienceAdd />} />
        <Route path="/Addexpr" element={<AddExperiences />} />
        <Route path="/addEdu" element={<EducationAdd />} />

        <Route path="/jobdesc" element={<JobDescription />} />
        <Route path="/applyStep" element={<ApplySteps />} />
        <Route path="/applyJobs" element={<ApplyJobs />} />

        <Route path="/comments" element={<CommentPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/jobs" element={<JobList />} />

        <Route path="/details" element={<UserProfile />} />
        {/* <Route path="/messages" element={<SendMessages />} /> */}

        <Route path="/profile" element={<Profile />} />
        <Route path="/drop" element={<DropdownProfile />} />
        <Route path="/connection" element={<Connection />} />
        <Route path="/MyConnection" element={<MyConnection />} />
      </Routes>
    </Router>
  );
}

export default App;
