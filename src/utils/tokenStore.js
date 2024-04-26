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
