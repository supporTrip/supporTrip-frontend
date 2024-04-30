import { Box, Flex, Heading, Input, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BasicButton from '../../components/buttons/BasicButton'
import MoneyInput from '../../components/inputs/MoneyInput'
import { formatNumberWithCommas } from '../../utils/numberUtils'
import { getAccessToken } from '../../utils/tokenStore'

const BASE_URL = import.meta.env.VITE_BASE_URL

const MoneyInputForm = ({
  previousStep,
  nextStep,
  exchangeData,
  updateExchangeData,
}) => {
  const accessToken = getAccessToken()
  const [isFilled, setIsFilled] = useState(false)
  const [tradingAmount, setTradingAmount] = useState(
    exchangeData.tradingAmount || 0,
  )
  const [exchangeRate, setExchangeRate] = useState(
    exchangeData.startingExchangeRate || 0,
  )
  const [unit, setUnit] = useState(exchangeData.startingExchangeUnit || 0)

  useEffect(() => {
    if (!exchangeRate) {
      fetchExchangeRate(exchangeData.targetCurrencyId)
    }

    if (tradingAmount > 0) {
      updateExchangeData({ tradingAmount: tradingAmount })
      setIsFilled(true)
    }
  }, [tradingAmount])

  const fetchExchangeRate = async (targetCurrencyId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/exchange-rates/${targetCurrencyId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )

      if (response.status === 200) {
        const data = response.data
        setExchangeRate(data.exchangeRate)
        setUnit(data.unit)
        updateExchangeData({
          startingExchangeRateId: data.id,
          startingExchangeRate: data.exchangeRate,
          startingExchangeUnit: data.unit,
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Flex flex={1} direction={'column'}>
      <Heading size={'lg'} color={'black.soft'}>
        환전 금액
      </Heading>
      <Text mt={'20px'} color={'gray.600'}>
        환전할 금액을 입력하세요.
      </Text>
      <Flex mt={'50px'} flex={1} direction={'column'} alignItems="flex-start">
        <Flex alignItems={'center'}>
          <Text w={'90px'} mr={'40px'}>
            충전 금액
          </Text>
          <Box w={'300px'}>
            <MoneyInput
              size="md"
              defaultNumber={tradingAmount}
              getNumber={setTradingAmount}
            // TODO: 환전 가능 최대 금액 설정
            ></MoneyInput>
          </Box>
          <Text ml={'10px'}>원</Text>
        </Flex>
        <Flex direction={'column'} mt={'20px'}>
          <Flex w={'100%'} alignItems={'center'}>
            <Text w={'90px'} mr={'40px'}>
              예상 환전 금액
            </Text>
            <Box w={'300px'} alignSelf={'center'} position={'relative'}>
              <Input
                variant="flushed"
                size="md"
                borderColor={'gray.300'}
                focusBorderColor="gray.300"
                cursor={'default'}
                type="text"
                isReadOnly={true}
                textAlign={'right'}
                placeholder="0"
                pr={'16px'}
                value={
                  exchangeRate &&
                  formatNumberWithCommas(
                    ((tradingAmount / exchangeRate) * unit).toFixed(2),
                  )
                }
              />

              <Box
                bottom={-8}
                right={3}
                color={'blue.600'}
                position={'absolute'}
              >
                {exchangeRate &&
                  `현재 기준 ${unit} ${exchangeData.targetCurrencyName} = ${formatNumberWithCommas(exchangeRate.toFixed(2))} 원`}
              </Box>
            </Box>
            <Text ml={'10px'}>{exchangeData.targetCurrencyName}</Text>
          </Flex>
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

export default MoneyInputForm
