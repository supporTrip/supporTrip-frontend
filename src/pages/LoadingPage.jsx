import React from 'react'
import { Flex, Spinner } from '@chakra-ui/react'

function LoadingPage({ children }) {
  return (
    <>
      <Flex
        width={'100%'}
        height={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
        bgColor={'bg.default'}
      >
        {children || <Spinner />}
      </Flex>
    </>
  )
}

export default LoadingPage
