import { Box, Flex, Heading, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { formatNumberWithCommas } from '../../utils/numberUtils'

const MoneyInputForm = () => {
  const [krw, setKrw] = useState()
  const [exchangeRate, setExchangeRate] = useState(1379.7)

  const handleNumberInput = (e) => {
    let inputValue = e.target.value

    // 맨 앞 0 제거
    if (inputValue.length > 0 && inputValue[0] === '0') {
      inputValue = inputValue.slice(1)
    }

    // 문자 제거
    inputValue = inputValue.replace(/[^0-9]/g, '')
    setKrw(inputValue)
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
            <Input
              size="md"
              borderColor={'gray.300'}
              focusBorderColor="main"
              type="text"
              textAlign={'right'}
              placeholder="0"
              value={formatNumberWithCommas(krw)}
              onChange={handleNumberInput}
            />
          </Box>
          <Text ml={'10px'}>원</Text>
        </Flex>
        <Flex direction={'column'} mt={'20px'}>
          <Flex w={'100%'} alignItems={'center'}>
            <Text w={'90px'} mr={'40px'}>
              예상 환전 금액
            </Text>
            <Box w={'300px'} alignSelf={'center'}>
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
                value={formatNumberWithCommas((krw / exchangeRate).toFixed(2))}
              />
            </Box>
            <Text ml={'10px'}>미국달러</Text>
          </Flex>
          <Box
            alignSelf={'flex-end'}
            mt={'4px'}
            mr={'64px'}
            pr={'16px'}
            color={'gray.500'}
          >
            현재 기준 1달러 = {exchangeRate} 원
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default MoneyInputForm
