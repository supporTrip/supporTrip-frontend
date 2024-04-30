export const formatNumberWithCommas = (number) => {
  if (number == null || isNaN(number)) {
    return ''
  }

  let formattedNumber = number.toString()

  const decimalIndex = formattedNumber.indexOf('.')
  if (decimalIndex !== -1) {
    const decimalPart = formattedNumber.substr(decimalIndex + 1)

    if (decimalPart === '00') {
      formattedNumber = formattedNumber.substr(0, decimalIndex)
    }
  }

  formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return formattedNumber
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
