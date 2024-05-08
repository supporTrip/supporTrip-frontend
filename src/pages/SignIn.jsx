import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import KakaoLogo from '../images/kakao-logo.svg'
import SupportripLogo from '../images/logo.svg'
import Bg from '../images/paradise.jpg'

const KAKAO_OAUTH_CLIENT_ID = import.meta.env.VITE_KAKAO_OAUTH_CLIENT_ID
const KAKAO_OAUTH_REDIRECT_URI = import.meta.env.VITE_KAKAO_OAUTH_REDIRECT_URI
const KAKAO_OAUTH_SCOPE = import.meta.env.VITE_KAKAO_OAUTH_SCOPE

const KAKAO_OAUTH_CODE_REQUEST_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_OAUTH_CLIENT_ID}&redirect_uri=${KAKAO_OAUTH_REDIRECT_URI}&response_type=code&scope=${KAKAO_OAUTH_SCOPE}`

const SignIn = () => {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    if (isLoggedIn) {
      alert('이미 로그인 중이에요')
      navigate(-1)
    }
  }, [])

  const handleClick = () => {
    window.location.href = KAKAO_OAUTH_CODE_REQUEST_URL
  }

  return (
    <Flex w={'100%'} h={'100%'} justifyContent={'center'} alignItems={'center'}>
      <Flex borderRadius={'8px'} overflow={'hidden'} boxShadow={'md'}>
        <Box>
          <Image src={Bg} w={'500px'} h={'500px'}></Image>
        </Box>
        <Flex justifyContent={'center'} alignItems={'center'}>
          <Flex
            direction={'column'}
            justifyContent={'space-between'}
            alignItems={'center'}
            width={'100%'}
            height={'100%'}
            p={20}
          >
            <HStack>
              <Image src={SupportripLogo} />
              <Text fontSize={'36'} fontWeight={'bold'}>
                서포트립
              </Text>
            </HStack>
            <Text fontSize={'22'} textAlign={'center'}>
              해외 여행, 짐만 챙기세요. <br />
              나머지는 서포트립이!
            </Text>
            <Button
              width={'100%'}
              height={'50px'}
              bg={'#FEE102'}
              onClick={handleClick}
            >
              <Image src={KakaoLogo} marginRight={'7px'} />
              카카오로 로그인하기
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SignIn
