import './style/App.css'
import LandingPage from './view/LandingPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Login from './view/Login';
import Register from './view/Register';
import GameWindow from './view/GameWindow';

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
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
