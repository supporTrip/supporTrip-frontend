import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const AuthRequiredPage = ({ children }) => {
  const isLoggedIn = useAuth()

  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스에요.\n로그인 페이지로 이동할게요.')
    }
  })

  return isLoggedIn ? children : <Navigate to="/signin" />
}

export default AuthRequiredPage
