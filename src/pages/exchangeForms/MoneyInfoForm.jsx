import { Box, Flex, Heading, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import BasicButton from '../../components/buttons/BasicButton'
import MoneyInput from '../../components/inputs/MoneyInput'
import { formatNumberWithCommas } from '../../utils/numberUtils'

const MoneyInputForm = ({ previousStep, nextStep }) => {
  const [isFilled, setIsFilled] = useState(false)
  const [krw, setKrw] = useState(0)
  const [exchangeRate, setExchangeRate] = useState(1379.7) // TODO: api 응답받아서 처리

  useEffect(() => {
    if (krw > 0) {
      setIsFilled(true)
    }
  }, [krw])

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
              defaultNumber={krw}
              getNumber={setKrw}
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
