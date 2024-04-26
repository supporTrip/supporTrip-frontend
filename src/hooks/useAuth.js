import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  deleteAuthTokens,
  getAccessToken,
  getRefreshToken,
  isAccessTokenValid,
  refreshAccessToken,
  replaceAccessToken,
  replaceRefreshToken,
} from '../utils/tokenStore'

const useAuth = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  console.log('useAuth user ', user)

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
        console.log('토큰 유효 ', accessToken)
        setIsLoggedIn(true)
        return
      }

      if (!refreshToken) {
        setIsLoggedIn(false)
        return
      }

      try {
        const newAccessToken = await refreshAccessToken(refreshToken)
        console.log('토큰 재발급 ', newAccessToken)
        replaceAccessToken(newAccessToken)
        setIsLoggedIn(true)
      } catch (error) {
        console.error('Access Token 재발급 에러: ', error)
        setIsLoggedIn(false)
      }
    }

    checkLoginStatus()
  }, [])

  const login = async (accessToken, refreshToken, user) => {
    console.log('login ', user)

    setUser(user)
    console.log('setUser ', user)

    replaceAccessToken(accessToken)
    replaceRefreshToken(refreshToken)
    setIsLoggedIn(true)

    if (!user.name) {
      console.log('singup')
      navigate('/signup')
      return
    }
    console.log('navi /')
    navigate('/')
  }

  const logout = () => {
    console.log('로그아웃')
    deleteAuthTokens()
    setIsLoggedIn(false)
    setUser(null)
  }

  return [isLoggedIn, login, logout, user]
}

export default useAuth
