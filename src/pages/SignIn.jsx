import {
  Button,
  Card,
  Center,
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
    <Center h={'100vh'}>
      <Card width={'390px'} height={'455px'}>
        <VStack
          width={'100%'}
          height={'100%'}
          marginTop={'60px'}
          marginBottom={'35px'}
        >
          <HStack>
            <Image src={SupportripLogo} />
            <Text fontSize={'36'}>서포트립</Text>
          </HStack>
          <Spacer />
          <Text fontSize={'22'} textAlign={'center'}>
            여행 짐만 챙기세요, <br />
            나머지는 서포트립이!
          </Text>
          <Spacer />
          <Spacer />
          <Button
            width={'80%'}
            height={'50px'}
            bg={'#FEE102'}
            onClick={handleClick}
          >
            <Image src={KakaoLogo} marginRight={'7px'} />
            카카오로 로그인하기
          </Button>
        </VStack>
      </Card>
    </Center>
  )
}

export default SignIn
