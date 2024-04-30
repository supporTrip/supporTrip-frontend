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

export const isAccessTokenValid = async (accessToken) => {
  try {
    // NOTE: 액세스토큰이 유효한지 확인하는 api 없어서 임의로 마이페이지 api 호출
    const response = await axios.get(`${BASE_URL}/api/v1/mypages`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    if (response.status === 200) {
      return response.data
    }
    return null
  } catch (error) {
    console.error('error: ', error)
  }
}

export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/auth/regenerate`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
    return response.data.accessToken
  } catch (error) {
    console.error('error: ', error)
  }
}
