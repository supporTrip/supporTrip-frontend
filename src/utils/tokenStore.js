import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const getAccessToken = () => {
  return localStorage.getItem('access_token')
}

export const getRefreshToken = () => {
  return localStorage.getItem('refresh_token')
}

export const replaceAccessToken = (newAccessToken) => {
  localStorage.setItem('access_token', newAccessToken)
}

export const replaceRefreshToken = (newRefreshToken) => {
  localStorage.setItem('refresh_token', newRefreshToken)
}

export const removeTokens = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

export const isAccessTokenValid = (accessToken) => {
  return axios.get(`${BASE_URL}/api/v1/users`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const refreshAccessToken = async (refreshToken) => {
  return axios.post(
    `${BASE_URL}/api/v1/auth/regenerate`,
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  )
}
