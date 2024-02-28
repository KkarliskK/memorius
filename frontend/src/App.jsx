import './style/App.css'
import LandingPage from './components/LandingPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';

function App() {

  return (
    <>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<LandingPage />}/>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
