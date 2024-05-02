import { InfoOutlineIcon } from '@chakra-ui/icons'
import { Box, Divider, Flex, Image, Text, Tooltip } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BasicButton from '../components/buttons/BasicButton'
import axios from 'axios'
import ApplyModal from '../components/modals/ApplyModal'
import { getAccessToken } from '../utils/tokenStore'

const BASE_URL = import.meta.env.VITE_BASE_URL

const FlightInsuranceDetail = () => {
  const [responseData, setResponseData] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const accessToken = getAccessToken()
  const [userInfoData, setUserInfoData] = useState('')

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleOpenModal = async () => {
    if (!accessToken) {
      alert('로그인 후 이용해주세요')
      navigate('/signIn')
      return
    }
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/users`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      if (response.status === 200) {
        setUserInfoData(response.data)
        setIsOpen(true)
      } else {
        console.error('api 요청 실패')
      }
    } catch (error) {
      if (error.response.status >= 400 && error.response.status < 600) {
        alert('로그인 정보를 불러오는데 실패했습니다. 다시 로그인해주세요.')
        navigate('/signIn')
      }
      console.error(error)
    }
  }

  const formatPrice = (price) => {
    if (price >= 100000000) {
      const billion = Math.floor(price / 100000000)
      const million = Math.floor((price % 100000000) / 10000)
      if (million === 0) {
        return `${billion}억원`
      } else {
        return `${billion}억 ${million}만원`
      }
    } else if (price >= 10000) {
      return `${Math.floor(price / 10000)}만원`
    } else {
      return `${price.toLocaleString()}원`
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`
  }

  const params = useParams()

  const searchParams = new URLSearchParams(location.search)
  const planName = searchParams.get('planName')
  const premium = searchParams.get('premium')
  const coverageStartAt = searchParams.get('coverageStartAt')
  const coverageEndAt = searchParams.get('coverageEndAt')

  useEffect(() => {
    const fetchData = async () => {
      const requestData = {
        premium,
        planName,
        coverageStartAt,
        coverageEndAt,
      }

      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/flight-insurances/${params.insuranceId}`,
          {
            params: requestData,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        setResponseData(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Flex py={10} flexDirection={'column'}>
        <Flex justifyContent={'space-between'} h={200}>
          <Flex alignItems={'center'}>
            <Image
              borderRadius="full"
              boxSize="120px"
              src={responseData?.logoImageUrl}
            />
            <Flex flexDirection={'column'} justifyContent={'center'} pl={20}>
              <Text fontSize="2xl">{responseData?.companyName}</Text>

              <Text fontSize="3xl" fontWeight="bold">
                {responseData?.insuranceName}
              </Text>
            </Flex>
          </Flex>
          <Flex>
            <Flex alignItems={'center'} textAlign={'right'}>
              <Flex flexDirection={'column'} pr={'50px'}>
                <Text fontSize={'md'}>가입 시작일</Text>
                <Text fontSize={'md'}>가입 종료일</Text>
              </Flex>
              <Flex flexDirection={'column'}>
                <Text fontSize={'md'}>
                  {formatDate(responseData?.coverageStartAt)}
                </Text>

                <Text fontSize={'md'}>
                  {formatDate(responseData?.coverageEndAt)}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Divider color={'gray.200'} mt={'60px'}></Divider>
        <Flex justifyContent={'space-between'} mt={10}>
          <Flex>
            <Text fontSize={'2xl'} fontWeight={'bold'}>
              보장 세부사항
            </Text>
          </Flex>
          <Flex>
            <Flex
              border={'1px solid'}
              width={'100px'}
              height={'35px'}
              bgColor={'white'}
              color={
                responseData?.planName === 'standard' ? 'main' : 'yellow.800'
              }
              borderRadius={10}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Text fontSize={'lg'}>
                {responseData?.planName === 'standard'
                  ? '표준플랜'
                  : '고급플랜'}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex
          flexDirection={'column'}
          mt={5}
          mb={5}
          pb={10}
          px={12}
          // mx={10}
          bgColor={'white'}
        >
          {responseData?.specialContracts.map((specialContract, index) => {
            return (
              <Flex
                key={index}
                justifyContent={'space-between'}
                pt={10}
                borderColor={'gray.200'}
              >
                <Flex key={index} borderColor={'gray.200'}>
                  <Flex w={400}>
                    <Text
                      mr={3}
                      color="main"
                      fontSize={'sm'}
                      fontWeight={'bold'}
                    >
                      특약
                    </Text>
                    <Box pr={2}>
                      <Tooltip hasArrow label={specialContract?.description}>
                        <Box>
                          <InfoOutlineIcon
                            color={'gray.400'}
                            _hover={{ color: 'gray.800' }}
                            borderRadius="md"
                          />
                        </Box>
                      </Tooltip>
                    </Box>
                    <Text fontSize={'md'}>{specialContract?.name}</Text>
                  </Flex>
                </Flex>

                <Flex w={120} justifyContent={'end'}>
                  <Text fontWeight={'bold'} fontSize={'md'}>
                    {formatPrice(
                      responseData?.planName === 'standard'
                        ? specialContract.standardPrice
                        : specialContract.advancedPrice,
                    )}
                  </Text>
                </Flex>
              </Flex>
            )
          })}
        </Flex>
        <Flex alignItems={'center'} flexDirection={'row-reverse'} mt={10}>
          <BasicButton
            height={50}
            width={150}
            bgColor={'main'}
            color={'white'}
            _hover={{}}
            onClick={handleOpenModal}
          >
            <Text fontSize={'20px'}>신청</Text>
          </BasicButton>

          <Flex
            w={300}
            h={50}
            borderRadius={10}
            bgColor={'gray.50'}
            alignItems={'center'}
            justifyContent={'space-around'}
            mr={5}
          >
            <Text fontSize={18} fontWeight={'bold'}>
              총 보험료
            </Text>
            {responseData?.premium && (
              <Text fontSize={20} fontWeight={'bold'}>
                {`${responseData.premium.toLocaleString()}원`}
              </Text>
            )}
          </Flex>
        </Flex>
      </Flex>
      <ApplyModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        responseData={responseData}
        formatDate={formatDate}
        userInfoData={userInfoData}
        flightInsuranceId={params.insuranceId}
      />
    </>
  )
}

export default FlightInsuranceDetail
