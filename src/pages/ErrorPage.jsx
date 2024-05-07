import React from 'react'
import error from '../images/error.svg'
import dog from '../images/dog.svg'
import { Box, Image, Text, keyframes, Button, Flex } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'
import FloatDog from '../assets/lottie/float-dog.json'
function ErrorPage() {
  const navigate = useNavigate()

  const onClickHandler = () => {
    navigate('/')
  }
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
    <Flex
      minW={'screen'}
      minH={'100%'}
      direction={'column'}
      bgImage={error}
      justifyContent={'center'}
      alignItems={'center'}
      position={'relative'}
    >
      {/* <Image
        src={error}
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      /> */}
      {/* <Image
        src={dog}
        position="absolute"
        top="50%"
        left="52%"
        transform="translate(-50%, -50%)"
        animation={`${float} 2s infinite alternate`}
      /> */}
      <Box
        fontSize="30px"
        // fontFamily={'Avenir Next Heavy'}
        fontWeight={600}
        color="#1C3177"
        // position={'absolute'}
        // top={'60px'}
      >
        앗! 알 수 없는 페이지에요
      </Box>

      <Flex alignItems={'center'} gap={10}>
        <Box
          fontSize="300px"
          fontFamily={'Avenir Next Bold'}
          color="#1C3177"
          // position={'absolute'}
          // top={'60px'}
        >
          4
        </Box>
        <Box w={'650px'}>
          <Lottie animationData={FloatDog} />
        </Box>
        <Box
          fontSize="300px"
          fontFamily={'Avenir Next Bold'}
          color="#1C3177"
          // position={'absolute'}
          // top={'60px'}
        >
          4
        </Box>
      </Flex>
      <Flex
        w={'100%'}
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={4}
        // position={'absolute'}
        // bottom={'60px'}
      >
        <Box
          textAlign={'center'}
          fontSize="20px"
          fontFamily={'Avenir Next Bold'}
          fontWeight={'bold'}
          color="#1C3177"
        >
          입력한 주소가 정확한지 다시 한번 확인해주세요
        </Box>

        <Button
          size={'lg'}
          w={300}
          h={70}
          borderRadius={60}
          bgColor={'#99ADF9'}
          textColor={'white'}
          colorScheme="gray"
          fontWeight={1000}
          onClick={onClickHandler}
        >
          돌아가기
        </Button>
      </Flex>
    </Flex>
  )
}

export default ErrorPage
