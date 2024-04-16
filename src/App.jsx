import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import './assets/fonts/suite/suite.css'
import DefaultLayout from './components/layout/DefaultLayout'
import Account from './pages/Account'
import Exchange from './pages/Exchange'
import FlightInsurance from './pages/FlightInsurance'
import Home from './pages/Home'
import MyPage from './pages/MyPage'
import OAuthKakao from './pages/OAuthKakao'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

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
          path="/oauth/kakao"
          element={
            <DefaultLayout hasNavbar={false} hasFooter={false}>
              <OAuthKakao />
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
