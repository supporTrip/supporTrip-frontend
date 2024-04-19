import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

const LabelInput = ({ label, margin, onInputChange }) => {
  const [value, setValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleInputChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)

    if (onInputChange) {
      onInputChange(newValue)
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <FormControl margin={margin}>
      <FormLabel
        position={'absolute'}
        top={(isFocused || value.length > 0) && '-10px'}
        left={'10px'}
        fontSize={isFocused || value.length > 0 ? 'sm' : 'md'}
        color={isFocused ? 'main' : 'gray.400'}
        pointerEvents="none"
        // transition="top 0.1s, font-size 0.1s, color 0.1s, visibility 0.1s"
        transition="all 0.1s ease"
        px={'10px'}
        zIndex={10}
        bg={'white'}
      // visibility={isFocused || value.length > 0 ? 'visible' : 'hidden'}
      >
        {(isFocused || value.length > 0) && label}
        {label}
      </FormLabel>
      <Input
        type="text"
        placeholder={!isFocused && label}
        onFocus={handleFocus}
        onBlur={handleBlur}
        borderColor={isFocused ? 'main' : 'gray.300'}
        borderWidth="1px"
        borderRadius="md"
        px={3}
        py={2}
        zIndex={0}
        focusBorderColor={'main'}
        onChange={handleInputChange}
      />
    </FormControl>
  )
}

export default LabelInput
