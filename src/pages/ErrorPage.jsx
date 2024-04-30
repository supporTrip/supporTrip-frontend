import React from 'react'
import error from '../images/error.svg'
import dog from '../images/dog.svg'
import { Box, Image, Text, keyframes, Button } from '@chakra-ui/react'
function ErrorPage() {
  const float = keyframes`
  0% {
    transform: translate(-50%, -50%) translateY(0) translateX(-2px); // 왼쪽으로 약간 이동
  }
  50% {
    transform: translate(-50%, -50%) translateY(-10px)  // 오른쪽으로 약간 이동
  }
  100% {
    transform: translate(-50%, -50%) translateY(0) // 왼쪽으로 약간 이동
  }
`
  return (
    <Box position="relative" width="100%" height="100vh">
      <Image
        src={error}
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      />
      <Image
        src={dog}
        position="absolute"
        top="50%"
        left="52%"
        transform="translate(-50%, -50%)"
        animation={`${float} 2s infinite alternate`}
      />
      <Text
        position="absolute"
        top="10%"
        left="50%"
        transform="translate(-50%, -50%)"
        fontSize="64px"
        fontFamily={'Avenir Next Heavy'}
        color="#1C3177"
      >
        404
      </Text>
      <Text
        position="absolute"
        top="15%"
        left="50%"
        transform="translate(-50%, -50%)"
        fontSize="24px"
        fontFamily={'Avenir Next Bold'}
        fontWeight={'bold'}
        color="black"
      >
        you are lost
      </Text>
      {
        <Button
          position="absolute"
          size={'lg'}
          w={300}
          h={70}
          borderRadius={60}
          bgColor={'#99ADF9'}
          textColor={'white'}
          top="90%"
          left="50%"
          transform="translate(-50%, -50%)"
          colorScheme="gray"
          fontWeight={1000}
        >
          돌아가기
        </Button>
      }
    </Box>
  )
}

export default ErrorPage
