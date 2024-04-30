import { Input } from '@chakra-ui/react'
import React from 'react'
import { formatNumberWithCommas } from '../../utils/numberUtils'

const MoneyInput = ({ size, defaultNumber, max, getNumber, styles }) => {
  const handleNumberInput = (e) => {
    let inputValue = e.target.value

    // 맨 앞 0 제거
    if (inputValue.length > 1 && inputValue[0] === '0') {
      inputValue = inputValue.slice(1)
    }

    // 문자 제거
    inputValue = inputValue.replace(/[^0-9]/g, '')

    if (inputValue < 0 || inputValue > max) {
      return
    }

    getNumber(inputValue)
  }

  return (
    <Input
      size={size}
      borderColor={'gray.300'}
      focusBorderColor="main"
      type="text"
      textAlign={'right'}
      placeholder="0"
      value={formatNumberWithCommas(defaultNumber)}
      onChange={handleNumberInput}
      {...styles}
    />
  )
}

export default MoneyInput
