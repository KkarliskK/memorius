import './style/App.css'
import LandingPage from './view/LandingPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Login from './view/Login';
import Register from './view/Register';
import GameWindow from './view/GameWindow';
import Leaderboard from './view/Leaderboard';
import Profile from './view/Profile';
import Error404 from './view/Error404';
import Settings from './view/Settings';

function App() {

  return (
    <>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path='/gamewindow' element={<GameWindow />} /> 
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='/:username' element={<Profile />} /> 
        <Route path='/settings' element={<Settings />} /> 
        <Route path='*' element={<Error404 />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
