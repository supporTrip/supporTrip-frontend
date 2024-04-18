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
