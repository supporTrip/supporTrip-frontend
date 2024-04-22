import { Box, Flex, Heading, Input, Select, Text } from '@chakra-ui/react'
import axios from 'axios'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BasicButton from '../../components/buttons/BasicButton'
import { getAccessToken } from '../../utils/tokenStore'

const BASE_URL = import.meta.env.VITE_BASE_URL
const today = format(new Date(), 'yyyy-MM-dd')

const BasicInfoForm = ({
  previousStep,
  nextStep,
  exchangeData,
  updateExchangeData,
}) => {
  const navigate = useNavigate()
  const accessToken = getAccessToken()
  const [isFilled, setIsFilled] = useState(false)
  const [endDate, setEndDate] = useState('')
  const [foreignCurrency, setForeignCurrency] = useState(null)
  const [exchangeableCurrencies, setExchangeableCurrencies] = useState([])
  const departDate = format(exchangeData.departAt, 'yyyy-MM-dd')

  console.log('exchangeData ', exchangeData)
  useEffect(() => {
    if (endDate.length > 0 && foreignCurrency) {
      setIsFilled(true)
    }

    if (exchangeableCurrencies.length === 0) {
      getExchangeableCurrencies()
    }
  }, [accessToken])

  const getExchangeableCurrencies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/exchange/currency`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (response.status === 200) {
        const data = response.data
        setExchangeableCurrencies(data.currencies)
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
        거래 설정
      </Heading>
      <Text mt={'20px'} color={'gray.600'}>
        환전에 필요한 정보를 입력하세요.
      </Text>
      <Flex mt={'50px'} flex={1} direction={'column'} alignItems="flex-start">
        <Flex w={'100%'} alignItems={'center'}>
          <Text mr={'50px'}>기간</Text>
          <Box flex={1}>
            <Input
              size="md"
              borderColor={'gray.300'}
              focusBorderColor="main"
              type="date"
              value={today}
              isReadOnly={true}
              variant="unstyled"
              textAlign={'center'}
            />
          </Box>
          <Text mx={'15px'}>~</Text>
          <Box flex={1}>
            <Input
              size="md"
              borderColor={'gray.300'}
              focusBorderColor="main"
              type="date"
              value={endDate}
              min={today}
              max={departDate}
              onChange={(e) => {
                setEndDate(e.target.value)
                updateExchangeData({
                  startDate: today,
                  endDate: e.target.value,
                })
              }}
            />
          </Box>
        </Flex>
        <Flex w={'100%'} alignItems={'center'} mt={'20px'}>
          <Text mr={'50px'}>외화</Text>

          <Box flex={1}>
            <Select
              placeholder="선택"
              borderColor={'gray.300'}
              focusBorderColor="main"
              value={foreignCurrency}
              onChange={(e) => {
                setForeignCurrency(e.target.value.currency_name)
                updateExchangeData({
                  exchangeCountry: e.target.value,
                })
              }}
            >
              {exchangeableCurrencies.map((currency, idx) => {
                return (
                  <option key={idx} value={currency.country}>
                    {currency.country.currency_name}
                  </option>
                )
              })}
            </Select>
          </Box>
        </Flex>
      </Flex>
      <Flex w={'100%'} justifyContent={'space-between'}>
        <BasicButton
          bgColor={'gray.100'}
          color="gray.400"
          size={'lg'}
          width={'130px'}
          fontSize={'18px'}
          onClick={previousStep}
        >
          이전
        </BasicButton>
        <BasicButton
          bgColor={'main'}
          color="white"
          size={'lg'}
          width={'130px'}
          fontSize={'18px'}
          onClick={nextStep}
          styles={!isFilled && { isDisabled: true }}
        >
          다음
        </BasicButton>
      </Flex>
    </Flex>
  )
}

export default BasicInfoForm
