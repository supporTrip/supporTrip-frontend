import { Box, useRadio } from '@chakra-ui/react'
import React from 'react'

const RadioCard = (props) => {
  const { getInputProps, getRadioProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as="label" flex={1}>
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        border={'1px solid'}
        height={'40px'}
        fontSize={'16px'}
        _checked={{
          bg: 'mint.400',
          color: 'white',
          borderColor: 'mint.400',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
        textAlign={'center'}
        alignContent={'center'}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export default RadioCard
