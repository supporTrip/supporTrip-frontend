import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import DefaultLayout from './components/layouts/DefaultLayout'
import Account from './pages/Account'
import Exchange from './pages/Exchange'
import ExchangeResult from './pages/ExchangeResult'
import FlightInsurance from './pages/FlightInsurance'
import Home from './pages/Home'
import MyPage from './pages/MyPage'
import OAuthKakao from './pages/OAuthKakao'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import NewExchange from './pages/exchangeForms/NewExchange'

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
        <Route
          path="/new-exchange"
          element={
            <DefaultLayout hasNavbar={false} hasFooter={false}>
              <NewExchange />
            </DefaultLayout>
          }
        />
        <Route
          path="/new-exchange/thankyou"
          element={
            <DefaultLayout>
              <ExchangeResult />
            </DefaultLayout>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
