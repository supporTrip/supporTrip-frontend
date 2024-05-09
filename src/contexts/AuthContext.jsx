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
  const [user, setUser] = useState({
    name: null,
    profileImageUrl: null,
    role: null,
  })

  useEffect(() => {
    const checkLoginStatus = async () => {
      const accessToken = getAccessToken()

      if (!accessToken) {
        setIsLoggedIn(false)
        return
      }

      try {
        const response = await isAccessTokenValid(accessToken)
        const userData = response.data
        if (!window.location.href.endsWith('/signup') && userData.initialUser) {
          alert(
            '서비스를 이용하려면 회원가입이 필요해요. 회원가입 페이지로 이동할게요.',
          )
          window.location.href = '/signup'
          return
        }

        if (userData) {
          setUser({
            name: userData.name,
            profileImageUrl: userData.profileImageUrl,
            role: userData.role,
          })
          setIsLoggedIn(true)
        }
      } catch (error) {
        try {
          if (error.response.data.message.errorCode === '401-03') {
            await regenerateAccessToken()
            return
          } else {
            console.error(error)
          }
        } catch (err) {
          console.error(err)
        }

        setIsLoggedIn(false)
        removeTokens()
      }
    }

    checkLoginStatus()
  }, [])

  const regenerateAccessToken = async () => {
    const refreshToken = getRefreshToken()
    if (!refreshToken) {
      throw new Error('Refresh token is empty')
    }

    const response = await refreshAccessToken(refreshToken)
    const newAccessToken = response.data.accessToken
    replaceAccessToken(newAccessToken)
  }

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
