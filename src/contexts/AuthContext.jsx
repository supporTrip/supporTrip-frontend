import React, { createContext, useContext, useEffect, useState } from 'react'
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
  const [isLoggedIn, setIsLoggedIn] = useState(getAccessToken() || false)
  const [user, setUser] = useState({ name: null, profileImageUrl: null })

  useEffect(() => {
    const checkLoginStatus = async () => {
      const accessToken = getAccessToken()
      const refreshToken = getRefreshToken()

      if (!accessToken) {
        setIsLoggedIn(false)
        return
      }

      const userData = await isAccessTokenValid(accessToken)
      if (userData) {
        //TODO: 마이페이지 api 응답 사용 -> accessToken api 교체 필요
        setUser({ name: userData.name, profileImageUrl: userData.profilePic })
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
