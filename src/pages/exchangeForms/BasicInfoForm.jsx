import { Box, Flex, Heading, Input, Select, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import BasicButton from '../../components/buttons/BasicButton'

const country = ['미국달러', '일본엔화', '유럽유로']

const BasicInfoForm = ({ previousStep, nextStep }) => {
  const [isFilled, setIsFilled] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [foreignCurrency, setForeignCurrency] = useState('')

  useEffect(() => {
    if (
      startDate.length > 0 &&
      endDate.length > 0 &&
      foreignCurrency.length > 0
    ) {
      setIsFilled(true)
    }
  }, [startDate, endDate, foreignCurrency])

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
          <Box flex={1} mr={'30px'}>
            <Input
              size="md"
              borderColor={'gray.300'}
              focusBorderColor="main"
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value)
              }}
            />
          </Box>
          <Box flex={1}>
            <Input
              size="md"
              borderColor={'gray.300'}
              focusBorderColor="main"
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value)
              }}
            />
          </Box>
        </Flex>
        <Flex w={'100%'} alignItems={'center'} mt={'20px'}>
          <Text mr={'50px'}>외화</Text>

          <Box flex={1}>
            <Select
              placeholder="외화 선택"
              borderColor={'gray.300'}
              focusBorderColor="main"
              value={foreignCurrency}
              onChange={(e) => {
                setForeignCurrency(e.target.value)
              }}
            >
              {country.map((c, idx) => {
                return (
                  <option key={idx} value={c}>
                    {c}
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
