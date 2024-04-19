import { Input, Text } from '@chakra-ui/react'
import React from 'react'

const ValidationInput = ({
  placeholder,
  handleChange,
  validationError,
  ...props
}) => {
  const hasError = () => {
    return validationError !== '' && validationError !== null
  }

  return (
    <>
      <Input
        placeholder={placeholder}
        onChange={handleChange}
        marginTop={'10px'}
        marginBottom={'4px'}
        {...props}
        {...(hasError() && { color: 'red', marginBottom: '0px' })}
      />
      {hasError() && (
        <Text color={'red'} fontSize={'14px'}>
          {validationError}
        </Text>
      )}
    </>
  )
}

export default ValidationInput
