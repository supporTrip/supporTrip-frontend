import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import Home from './pages/Home'
import Account from './pages/Account'
import Exchange from './pages/Exchange'
import FlightInsurance from './pages/FlightInsurance'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import MyPage from './pages/MyPage'
import Navbar from "./components/navbar/Navbar"

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/flight-insurance" element={<FlightInsurance />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  )
}

export default App
