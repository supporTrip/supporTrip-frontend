import { Center, Heading, Spinner, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { replaceAccessToken, replaceRefreshToken } from '../utils/tokenStore'

const BASE_URL = import.meta.env.VITE_BASE_URL

const OAuthKakao = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')

    axios
      .get(`${BASE_URL}/api/v1/auth/login?code=${code}`)
      .then((response) => {
        const { accessToken, refreshToken } = response.data

        replaceAccessToken(accessToken)
        replaceRefreshToken(refreshToken)

        window.location.href = '/'
      })
      .catch((error) => {
        if (error.response.status >= 400 && error.response.status < 600) {
          alert('카카오 로그인에 실패했습니다. 다시 시도해주세요.')
          window.location.href = '/signin'
        }
        console.error(error)
      })
  }, [])

  return (
    <Center h={'100vh'}>
      <VStack>
        <Heading fontSize={'26'} marginBottom={'20px'}>
          카카오 로그인 중...
        </Heading>
        <Spinner
          speed="0.5s"
          thickness="5px"
          width={'100px'}
          height={'100px'}
          emptyColor="gray.200"
          color="mint.600"
        />
      </VStack>
    </Center>
  )
}

export default OAuthKakao
