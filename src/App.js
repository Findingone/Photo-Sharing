import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Profile from './components/Public/Profile';
import CustomNavbar from './components/common/NavBar';
import UserLogin from './components/User/Login';
import HomePage from './components/Public/Homepage';
import EditProfile from './components/User/EditProfile';
import PublicPhotos from './components/Public/UserPhotos';
import PublicLikedPhotos from './components/Public/UserLikedPhotos';
import PublicCollections from './components/Public/UserCollections';
import PublicStats from './components/Public/UserStats';
import UserPhotos from './components/User/Photos';
import UserLikedPhotos from './components/User/LikedPhotos';
import UserCollections from './components/User/Collections';
import UserStats from './components/User/Stats';

function App() {
  return (
    <BrowserRouter>
      <CustomNavbar />
      <Routes>
        <Route path="/login" exact element={<UserLogin />} />
        <Route path="/home" exact element={<HomePage />} />
        <Route path="/" exact element={<HomePage />} />
        <Route path="/profile" exact element={<EditProfile />} />
        <Route path="/photos" exact element={<UserPhotos />} />
        <Route path="/liked_photos" exact element={<UserLikedPhotos />} />
        <Route path="/collections" exact element={<UserCollections />} />
        <Route path="/stats" exact element={<UserStats />} />


        <Route path="/public/profile" exact element={<Profile />} />
        <Route path="/public/photos" exact element={<PublicPhotos />} />
        <Route path="/public/liked_photos" exact element={<PublicLikedPhotos />} />
        <Route path="/public/collections" exact element={<PublicCollections />} />
        <Route path="/public/stats" exact element={<PublicStats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
