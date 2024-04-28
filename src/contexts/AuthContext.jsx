import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getAccessToken,
  getRefreshToken,
  isAccessTokenValid,
  refreshAccessToken,
  removeTokens,
  replaceAccessToken,
  replaceRefreshToken,
} from '../utils/tokenStore'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkLoginStatus = async () => {
      const accessToken = getAccessToken()
      const refreshToken = getRefreshToken()

      if (!accessToken) {
        setIsLoggedIn(false)
        return
      }

      const isValid = await isAccessTokenValid(accessToken)
      if (isValid) {
        setIsLoggedIn(true)
        return
      }

      if (!refreshToken) {
        setIsLoggedIn(false)
        return
      }

      try {
        const newAccessToken = await refreshAccessToken(refreshToken)
        replaceAccessToken(newAccessToken)
        setIsLoggedIn(true)
      } catch (error) {
        console.error('Access Token 재발급 에러: ', error)
        setIsLoggedIn(false)
      }
    }

    checkLoginStatus()
  }, [])

  const login = async (accessToken, refreshToken, userData) => {
    setUser(userData)
    replaceAccessToken(accessToken)
    replaceRefreshToken(refreshToken)
    setIsLoggedIn(true)

    if (!userData.name) {
      navigate('/signup')
    } else {
      navigate('/')
    }
  }

  const logout = () => {
    removeTokens()
    setIsLoggedIn(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
