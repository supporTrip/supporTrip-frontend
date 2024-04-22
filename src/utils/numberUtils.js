export const formatNumberWithCommas = (number) => {
  if (number == null || isNaN(number)) {
    return ''
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const shuffleNumbers = (numberArr) => {
  return numberArr.sort(() => {
    return Math.random() - 0.5
  })
}

export const generateAccountNumber = () => {
  const randomNumber = Math.floor(10000000 + Math.random() * 90000000)
  return randomNumber.toString().substring(0, 8)
}
