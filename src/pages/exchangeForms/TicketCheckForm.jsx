import { Flex, Heading, Input, Text } from '@chakra-ui/react'
import axios from 'axios'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BasicButton from '../../components/buttons/BasicButton'
import { getAccessToken } from '../../utils/tokenStore'

const BASE_URL = import.meta.env.VITE_BASE_URL

const TicketCheckForm = ({ nextStep, exchangeData, updateExchangeData }) => {
  const navigate = useNavigate()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [ticketSerial, setTicketSerial] = useState(exchangeData.pnrNumber || '')
  const accessToken = getAccessToken()

  useEffect(() => {
    if (!accessToken) {
      alert('로그인 정보가 없습니다. 로그인 페이지로 이동합니다.')
      navigate('/signIn')
      return
    }
    if (exchangeData.pnrNumber) {
      setIsAuthorized(true)
    }
  }, [accessToken, exchangeData.pnrNumber])

  const authorizeTicket = async () => {
    // TODO: 문구 수정 및 필요시 토스트 알람 구현, api 호출
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/airplain/certification`,
        {
          pnrNumber: ticketSerial,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )

      if (response.status === 200) {
        const data = response.data
        setIsAuthorized(true)
        updateExchangeData({
          pnrNumber: ticketSerial,
          countryId: data.countryId,
          departAt: data.departAt,
          countryCurrency: data.countryCurrency,
        })
        alert(
          `유효한 비행기 티켓입니다.\n\n- 도착지: ${data.country}\n- 출국 예정 일시: ${format(data.departAt, 'yyyy년 MM월 dd일 HH시 mm분')}`,
        )
      }
    } catch (error) {
      if (error.response.status >= 400 && error.response.status < 600) {
        alert('알 수 없는 에러가 발생했습니다.\n잠시 후에 다시 시도해주세요.')
        navigate('/')
      }
    }
  }

  return (
    <Flex flex={1} direction={'column'}>
      <Heading size={'lg'} color={'black.soft'}>
        비행기 티켓 인증
      </Heading>
      <Text mt={'20px'} color={'gray.600'}>
        환전을 위해 비행기 티켓이 필요해요.
      </Text>
      <Text mt={'10px'} color={'gray.600'}>
        유효한 비행기 티켓 일련 번호를 입력해주세요.
      </Text>
      <Flex
        flex={1}
        justifyContent={'space-between'}
        alignItems="center"
        gap={2}
      >
        <Input
          size="md"
          borderColor={'gray.300'}
          focusBorderColor="main"
          placeholder="비행기 티켓 일련 번호"
          value={ticketSerial}
          onChange={(e) => {
            setTicketSerial(e.target.value)
          }}
          isReadOnly={isAuthorized}
          bg={isAuthorized && 'gray.50'}
        />
        <BasicButton
          border="1px solid "
          bgColor="transparent"
          color="main"
          onClick={authorizeTicket}
          styles={
            (!ticketSerial.length || isAuthorized) && { isDisabled: true }
          }
        >
          인증하기
        </BasicButton>
      </Flex>

      <Flex w={'100%'} justifyContent={'flex-end'}>
        <BasicButton
          bgColor={'main'}
          color="white"
          size={'lg'}
          width={'130px'}
          fontSize={'18px'}
          onClick={nextStep}
          styles={!isAuthorized && { isDisabled: true }}
        >
          다음
        </BasicButton>
      </Flex>
    </Flex>
  )
}

export default TicketCheckForm
