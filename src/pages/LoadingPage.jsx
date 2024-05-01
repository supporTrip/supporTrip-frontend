import React from 'react'
import { Flex, Spinner } from '@chakra-ui/react'

function LoadingPage() {
  return (
    <>
      <Flex justifyContent={'center'} alignItems={'center'} height={500}>
        <Spinner />
      </Flex>
    </>
  )
}

export default LoadingPage
