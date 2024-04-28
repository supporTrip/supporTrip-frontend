import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import DefaultLayout from './components/layouts/DefaultLayout'
import Account from './pages/Account'
import Exchange from './pages/Exchange'
import ExchangeResult from './pages/ExchangeResult'
import FlightInsurance from './pages/FlightInsurance'
import FlightInsuranceDetail from './pages/FlightInsuranceDetail'
import Home from './pages/Home'
import MyPage from './pages/MyPage'
import OAuthKakao from './pages/OAuthKakao'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

import { AuthProvider } from './contexts/AuthContext'
import AuthRequiredPage from './pages/AuthRequiredPage'
import NotFoundPage from './pages/NotFoundPage'
import NewExchangeStarter from './pages/exchangeForms/NewExchangeStarter'
import PinNumberForm from './pages/exchangeForms/PinNumberForm'

function App() {
  return (
    <Router>
      <AuthProvider>
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
              <AuthRequiredPage>
                <DefaultLayout>
                  <Account />
                </DefaultLayout>
              </AuthRequiredPage>
            }
          />
          <Route
            path="/exchange"
            element={
              <AuthRequiredPage>
                <DefaultLayout>
                  <Exchange />
                </DefaultLayout>
              </AuthRequiredPage>
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
            path="/flight-insurance/:insuranceId"
            element={
              <DefaultLayout>
                <FlightInsuranceDetail />
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
              <AuthRequiredPage>
                <DefaultLayout>
                  <MyPage />
                </DefaultLayout>
              </AuthRequiredPage>
            }
          />
          <Route
            path="/new-exchange"
            element={
              <AuthRequiredPage>
                <DefaultLayout hasNavbar={true} hasFooter={true}>
                  <NewExchangeStarter />
                </DefaultLayout>
              </AuthRequiredPage>
            }
          />
          <Route
            path="/new-exchange/thankyou"
            element={
              <AuthRequiredPage>
                <DefaultLayout>
                  <ExchangeResult />
                </DefaultLayout>
              </AuthRequiredPage>
            }
          />
          <Route
            path="/new-exchange/payment"
            element={
              <AuthRequiredPage>
                <PinNumberForm />
              </AuthRequiredPage>
            }
          />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
