import { Box, Flex, Heading, Input, Select, Text } from '@chakra-ui/react'
import { addDays, format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import BasicButton from '../../components/buttons/BasicButton'

const today = format(new Date(), 'yyyy-MM-dd')
const minDay = format(addDays(new Date(), 1), 'yyyy-MM-dd')

const BasicInfoForm = ({
  previousStep,
  nextStep,
  exchangeData,
  updateExchangeData,
  exchangeableCurrencies,
}) => {
  const [isFilled, setIsFilled] = useState(false)
  const [displayName, setDisplayName] = useState(exchangeData.displayName || '')
  const [completeDate, setCompleteDate] = useState(
    exchangeData.completeDate || '',
  )
  const [targetCurrency, setTargetCurrency] = useState(
    exchangeData.targetCurrencyId || null,
  )
  const departDate = format(exchangeData.departAt, 'yyyy-MM-dd')

  useEffect(() => {
    if (displayName.length > 0 && completeDate.length > 0 && targetCurrency) {
      setIsFilled(true)
    }
  }, [displayName, completeDate, targetCurrency])

  return (
    <Flex flex={1} direction={'column'}>
      <Heading size={'lg'} color={'black.soft'}>
        거래 설정
      </Heading>
      <Text mt={'20px'} color={'gray.600'}>
        환전에 필요한 정보를 입력하세요.
      </Text>
      <Flex mt={'50px'} w={'100%'} alignItems={'center'}>
        <Text mr={'30px'}>거래 이름</Text>

        <Box flex={1}>
          <Input
            size="md"
            borderColor={'gray.300'}
            focusBorderColor="main"
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value)
              updateExchangeData({
                displayName: e.target.value,
              })
            }}
          ></Input>
        </Box>
      </Flex>
      <Flex flex={1} direction={'column'} alignItems="flex-start">
        <Flex mt={'20px'} w={'100%'} alignItems={'center'}>
          <Text mr={'60px'}>기간</Text>
          <Box flex={1}>
            <Input
              size="md"
              bgColor={'gray.50'}
              border={'none'}
              _hover={{ bgColor: 'gray.50', border: 'none' }}
              _focus={{ bgColor: 'gray.50', border: 'none' }}
              blur={{ bgColor: 'gray.50', border: 'none' }}
              focusBorderColor="main"
              type="date"
              value={today}
              isReadOnly={true}
              textAlign={'center'}
              variant="filled"
            />
          </Box>
          <Text mx={'15px'}>~</Text>
          <Box flex={1}>
            <Input
              size="md"
              borderColor={'gray.300'}
              focusBorderColor="main"
              type="date"
              value={completeDate}
              min={minDay}
              max={departDate}
              onChange={(e) => {
                setCompleteDate(e.target.value)
                updateExchangeData({
                  completeDate: e.target.value,
                })
              }}
              textAlign={'center'}
            />
          </Box>
        </Flex>
        <Flex mt={'20px'} w={'100%'} alignItems={'center'}>
          <Text mr={'60px'}>외화</Text>

          <Box flex={1}>
            <Select
              placeholder="선택"
              borderColor={'gray.300'}
              focusBorderColor="main"
              value={
                exchangeData.targetCurrencyId
                  ? exchangeableCurrencies.find((cur) => {
                    return cur.id + '' === exchangeData.targetCurrencyId
                  })?.id
                  : ''
              }
              onChange={(e) => {
                setTargetCurrency(e.target.value)
                updateExchangeData({
                  targetCurrencyId: e.target.value,
                  targetCurrencyName: exchangeableCurrencies.find((cur) => {
                    return cur.id + '' === e.target.value
                  })?.country.currency_name,
                  tradingAmount: null,
                  startingExchangeRateId: null,
                  startingExchangeRate: null,
                  startingExchangeUnit: null,
                  targetExchangeRate: null,
                })
              }}
            >
              {exchangeableCurrencies.map((currency, idx) => {
                return (
                  <option key={idx} value={currency.id}>
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
