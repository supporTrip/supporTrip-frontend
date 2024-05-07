import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import mainVideo from '../assets/video/airplane.mp4'
import Navbar from '../components/navbars/Navbar'

const Home = () => {
  return (
    <Flex
      direction={'column'}
      alignItems={'center'}
      overflow={'hidden'}
      width="100vw"
      height="100vh"
      position={'relative'}
    >
      <Flex
        width={'100vw'}
        justifyContent={'center'}
        shadow={'md'}
        bgColor={'transparent'}
        zIndex={10}
        position={'absolute'}
        top={'10px'}
        color={'white'}
      >
        <Navbar width={'60%'} bgColor={'transparent'}></Navbar>
      </Flex>
      <Flex
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        minH={'100%'}
        position={'absolute'}
        right={'30%'}
      >
        <Box fontSize={'70px'} fontWeight={800} color={'#fff'}>
          마음의 짐을 내려놓고
        </Box>
        <Box fontSize={'70px'} fontWeight={800} color={'#fff'}>
          서포트립과 여행을 떠나요
        </Box>
        <Button p={25}>가입하고 여행하기</Button>
      </Flex>
      <video
        src={mainVideo}
        autoPlay
        loop
        muted
        style={{ width: '100%', height: '100%', objectFit: 'fill' }}
      />
    </Flex>
  )
}

export default Home
