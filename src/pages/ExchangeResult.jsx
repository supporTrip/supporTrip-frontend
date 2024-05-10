import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Card, Divider, Flex, Heading, Text } from '@chakra-ui/react'
import { useAnimation } from '@codechem/chakra-ui-animations'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import BasicButton from '../components/buttons/BasicButton'
import { useAuth } from '../contexts/AuthContext'
import { formatNumberWithCommas } from '../utils/numberUtils'
import { getAccessToken } from '../utils/tokenStore'
import LoadingPage from './LoadingPage'
import Lottie from 'lottie-react'
import CreatingLottie from '../assets/lottie/creating.json'
import Ticketing from '../assets/lottie/ticketing.json'

const BASE_URL = import.meta.env.VITE_BASE_URL

const ExchangeResult = () => {
  const location = useLocation()
  const data = { ...location.state }
  const errorMsg = data.message || '비정상적인 접근입니다'
  const [isLoading, setIsLoading] = useState(true)

  // TODO: 실패 화면
  if (!data.success || !data.from || !data.to) {
    return <>{errorMsg}</>
  }

  const departAt = data.from + 'T00:00:00'
  const arrivalAt = data.to

  const { user } = useAuth()
  const accessToken = getAccessToken()
  const navigate = useNavigate()
  const flashAnimation = useAnimation('', {
    duration: 2000,
    iterationCount: 1,
  })

  const [recommendInsurances, setRecommendInsurances] = useState([])

  useEffect(() => {
    const fetchRecommendInsurances = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/flight-insurances/recomands?departAt=${departAt}&arrivalAt=${arrivalAt}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )

        if (response.status === 200) {
          const data = response.data
          setRecommendInsurances(data.insuranceList)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchRecommendInsurances()

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => {
      return clearTimeout(timer)
    }
  }, [])

  return (
    <>
      {isLoading ? (
        <LoadingPage>
          <Box w={'700px'}>
            <Lottie animationData={CreatingLottie} />
          </Box>
        </LoadingPage>
      ) : (
        <Flex
          minH={'full'}
          direction={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          mt={'30px'}
          position={'relative'}
        >
          <Box w={'400px'} position={'absolute'} top={'10px'}>
            <Lottie animationData={Ticketing} loop={false} />
          </Box>
          <Heading size={'lg'} mt={'300px'}>
            환전이 성공적으로 시작되었어요!
          </Heading>
          <Box mt={'20px'} fontSize={'18px'} textAlign={'center'}>
            <Text>앞으로 환전은 자동으로 해드릴게요.</Text>
            <Text mt={'8px'}>거래가 종료되면 SMS으로 알려드려요.</Text>
          </Box>
          <Flex mt={'30px'} gap={4}>
            <BasicButton
              width={'150px'}
              size={'lg'}
              onClick={() => {
                navigate('/')
              }}
            >
              홈으로
            </BasicButton>
            <BasicButton
              width={'200px'}
              size={'lg'}
              bgColor={'main'}
              color={'white'}
              onClick={() => {
                navigate('/exchange')
              }}
            >
              거래 내역 확인하기
            </BasicButton>
          </Flex>
          <Divider marginY={'60px'} color={'gray.200'}></Divider>
          <Flex direction={'column'} w={'100%'} mb={'80px'}>
            <Flex alignItems={'center'}>
              <Box fontSize={'22px'} fontWeight={'bold'}>
                <Text color="main" as="span" mr="1">
                  {user.name}
                </Text>
                님을 위한 해외 여행자 보험이에요
              </Box>
              <ArrowForwardIcon
                boxSize={7}
                ml={'4px'}
                cursor={'pointer'}
                onClick={() => {
                  navigate('/flight-insurance')
                }}
              ></ArrowForwardIcon>
            </Flex>
            <Flex w={'100%'} mt={'20px'} justifyContent={'space-between'}>
              {recommendInsurances.map((insurance, idx) => {
                return (
                  // TODO: 클릭 시 디테일 페이지로 이동
                  <Card
                    key={idx}
                    minW={'350px'}
                    fontSize={'18px'}
                    fontWeight={'bold'}
                    size={'md'}
                    p={'30px'}
                    paddingX={'50px'}
                    bg={'mint.100'}
                    cursor={'pointer'}
                    shadow={'none'}
                    animation={flashAnimation}
                  >
                    <Text color={'gray.500'}>{insurance.companyName}</Text>
                    <Text fontSize={'22px'}>{insurance.insuranceName}</Text>
                    <Flex
                      mt={'50px'}
                      w={'100%'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      gap={4}
                    >
                      <Text color={'gray.500'}>예상 보험료</Text>
                      <Text fontSize={'24px'} color={'main'}>
                        {formatNumberWithCommas(insurance.premium)}원
                      </Text>
                    </Flex>
                  </Card>
                )
              })}
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  )
}

export default ExchangeResult
