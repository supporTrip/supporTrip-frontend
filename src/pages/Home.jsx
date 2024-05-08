import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import mainVideo from '../assets/video/sky.mp4'
import Navbar from '../components/navbars/Navbar'
import { motion } from 'framer-motion'
import BtnBg from '../images/scooter.jpg'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Home = () => {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

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
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            y: 30,
          }}
          transition={{
            delay: 1,
            duration: 4,
          }}
        >
          <Box fontSize={'65px'} fontWeight={600} color={'#fff'}>
            우리의 여행 비서,
          </Box>
          <Box fontSize={'65px'} fontWeight={600} color={'#fff'}>
            서포트립에서 미리 준비하세요
          </Box>
          <Flex w={'100%'}>
            <Button
              px={10}
              py={7}
              fontSize={'25px'}
              color="white"
              cursor={'pointer'}
              bgImage={BtnBg}
              bgSize={'cover'}
              _hover={{ bgColor: 'none' }}
              _focus={{ bgColor: 'none' }}
              _active={{ bgColor: 'none' }}
              onClick={() => {
                if (isLoggedIn) {
                  navigate('/exchange')
                } else {
                  navigate('/signin')
                }
              }}
              zIndex={10}
            >
              {isLoggedIn ? '편하게 환전하러 가기' : '편하게 여행 준비하기'}
            </Button>
          </Flex>
        </motion.div>
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
