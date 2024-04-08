import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Account from './pages/Account'
import Exchange from './pages/Exchange'
import FlightInsurance from './pages/FlightInsurance'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import MyPage from './pages/MyPage'
import DefaultLayout from './components/layouts/DefaultLayout'

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          }
        />
        <Route
          path="/account"
          element={
            <DefaultLayout>
              <Account />
            </DefaultLayout>
          }
        />
        <Route
          path="/exchange"
          element={
            <DefaultLayout>
              <Exchange />
            </DefaultLayout>
          }
        />
        <Route
          path="/flight-insurance"
          element={
            <DefaultLayout>
              <FlightInsurance />
            </DefaultLayout>
          }
        />
        <Route
          path="/signin"
          element={
            <DefaultLayout hasNavbar={false} hasFooter={false}>
              <SignIn />
            </DefaultLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <DefaultLayout hasNavbar={false} hasFooter={false}>
              <SignUp />
            </DefaultLayout>
          }
        />
        <Route
          path="/mypage"
          element={
            <DefaultLayout>
              <MyPage />
            </DefaultLayout>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
