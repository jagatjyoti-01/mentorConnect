import React from 'react';
import './App.css';
// import './i18n';
import { Home } from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './components/shared/AuthLayout';
import JoinMeeting from './pages/Meeting/JoinMeeting';
import VideoCallInterface from './pages/Meeting/ReadyToJoin';
import Live from './pages/Live';
import StreamingPage from './pages/Streaming/StreamingPage';
import EventRegistration from './pages/UpcomingEvent/EventRegistration';
import EventDetail from './pages/UpcomingEvent/EventDetail';
import UpcomingEvent from './pages/UpcomingEvent/UpcomingEvent';
import PopularVideo from './pages/PopularVideo';
import VideoCalling from './pages/Meeting/VideoCalling';
// import VideoCalling1 from './pages/Meeting/VideoCalling1';
// import VideoCalling from './pages/Meeting/Old';
import HostMeeting from './pages/Meeting/HostMeeting';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CodeOfConduct from './pages/CodeOfConduct';
import ScheduleMeeting from './pages/Meeting/ScheduleMeeting';
import Podcast from './pages/Podcast';
import PodcastDetails from './pages/PodcastDetails';
import OurTeam from './pages/OurTeam';
import LoginPage from './pages/Account/Login';
import SignupPage from './pages/Account/Signup';
import ForgotPassword from './pages/Account/ForgotPassword';
import ResetPassword from './pages/Account/ResetPassword';
import ProfileDetails from './pages/Account/Profile';
import StreamForm from './pages/Streaming/StreamForm';
// import HostLiveStreaming from './pages/Streaming/HostLiveStreaming';
import JoinLiveStreaming from './pages/Streaming/JoinLiveStreaming';
import PrivateRoute from './components/shared/PrivateRoute';
import Calendly from './pages/Calendly';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Home />}></Route>
          {/* <Route path="/join-meeting" element={<JoinMeeting />}></Route>
          <Route path='/host-meeting' element={<HostMeeting />} /> */}
          {/* <Route path='/profile' element={<ProfileDetails />}></Route> */}
          {/* <Route path="/live" element={<Live />}></Route>
          <Route path='/host-streaming' element={<StreamForm />}></Route>
          <Route path='/join-streaming' element={<JoinLiveStreaming />}></Route>
          <Route path="/stream" element={<StreamingPage />}></Route> */}


          <Route path="/upcoming" element={<UpcomingEvent />}></Route>
          <Route path="/popular-videos" element={<PopularVideo />}></Route>
          <Route path="/podcast" element={<Podcast />}></Route>
          <Route path='/podcast/:title' element={<PodcastDetails />}></Route>
          <Route path="/ready-to-join" element={<VideoCallInterface />}></Route>
          <Route path="/event-registration" element={<EventRegistration />}></Route>
          <Route path="/event-detail" element={<EventDetail />}></Route>
          <Route path="/terms-conditions" element={<TermsConditions />} ></Route>
          <Route path="/privacy-policy" element={<PrivacyPolicy />} ></Route>
          <Route path="/code-of-conduct" element={<CodeOfConduct />} ></Route>
          <Route path='/our-team' element={<OurTeam />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/signup' element={<SignupPage />}></Route>
          <Route path='/calendly' element={<Calendly />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
          <Route path='/reset-password' element={<ResetPassword />}></Route>
          <Route path="/join-meeting" element={<JoinMeeting />} />
        </Route>
        <Route path='/room/:roomId' element={<VideoCalling />} />
      </Routes>
      <PrivateRoute path='/schedule-meeting' component={ScheduleMeeting} />
      <PrivateRoute path="/host-meeting" component={HostMeeting} />
      <PrivateRoute path="/profile" component={ProfileDetails} />
      <PrivateRoute path="/live" component={Live} />
      <PrivateRoute path="/host-streaming" component={StreamForm} />
      <PrivateRoute path="/join-streaming" component={JoinLiveStreaming} />
      <PrivateRoute path="/stream/:roomId" component={StreamingPage} />
    </BrowserRouter>
  );
}

export default App;

