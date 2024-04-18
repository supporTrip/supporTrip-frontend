export const generateAccountNumber = () => {
  const randomNumber = Math.floor(10000000 + Math.random() * 90000000)
  return randomNumber.toString().substring(0, 8)
}
