import { Divider, Flex, Heading, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import BasicButton from '../../components/buttons/BasicButton'
import MoneyInput from '../../components/inputs/MoneyInput'
import { formatNumberWithCommas } from '../../utils/numberUtils'

const FinalCheckForm = ({ previousStep, nextStep }) => {
  const [isFilled, setIsFilled] = useState(false)
  const startDate = '2024-04-18'
  const endDate = '2024-05-20'
  const type = '목표형'
  const krw = 500000
  const availablePoint = 1200
  const [targetExchangeRate, setTargetExchangeRate] = useState(0)
  const [point, setPoint] = useState(0)

  const labelStyles = {
    color: 'gray.400',
    fontWeight: 600,
  }

  useEffect(() => {
    if (type !== '목표형') {
      return
    }

    if (targetExchangeRate > 0) {
      setIsFilled(true)
    }

    if (!targetExchangeRate) {
      setIsFilled(false)
    }
  }, [targetExchangeRate])

  return (
    <Flex flex={1} direction={'column'}>
      <Heading size={'lg'} color={'black.soft'}>
        최종 확인
      </Heading>
      <Flex
        mt={'20px'}
        w={'100%'}
        direction={'column'}
        alignItems="center"
        fontSize={'md'}
      >
        <Flex w={'90%'} justifyContent={'space-between'}>
          <Text {...labelStyles}>거래 시작일</Text>
          <Text>{format(startDate, 'yyyy년 MM월 dd일')}</Text>
        </Flex>
        <Flex w={'90%'} mt={4} justifyContent={'space-between'}>
          <Text {...labelStyles}>거래 종료일</Text>
          <Text>{format(endDate, 'yyyy년 MM월 dd일')}</Text>
        </Flex>

        <Divider color={'gray.200'} my={6}></Divider>

        <Flex w={'90%'} justifyContent={'space-between'}>
          <Text {...labelStyles}>거래 유형</Text>
          <Text>{type}</Text>
        </Flex>
        {type === '목표형' && (
          <Flex w={'90%'} mt={4} justifyContent={'space-between'}>
            <Text {...labelStyles}>목표 환율</Text>
            <Flex direction={'column'}>
              <Flex alignItems={'center'}>
                <MoneyInput
                  defaultNumber={targetExchangeRate}
                  getNumber={setTargetExchangeRate}
                // TODO: 최근 6개월 평균 환율로 최저값 설정
                ></MoneyInput>
                <Text ml={2}>원</Text>
              </Flex>
            </Flex>
          </Flex>
        )}
        <Divider color={'gray.200'} my={6}></Divider>
        <Flex
          w={'90%'}
          justifyContent={'space-between'}
          alignItems={'flex-start'}
        >
          <Text {...labelStyles}>충전금</Text>
          <Text>{formatNumberWithCommas(krw)} 원</Text>
        </Flex>
        <Flex w={'90%'} mt={4} justifyContent={'space-between'}>
          <Text {...labelStyles}>포인트 사용</Text>
          <Flex direction={'column'}>
            <Flex alignItems={'center'}>
              <MoneyInput
                defaultNumber={point}
                getNumber={setPoint}
                max={availablePoint}
              ></MoneyInput>
              <Text ml={2}>P</Text>
            </Flex>
            <Text
              fontSize={'16px'}
              textAlign={'right'}
              mt={1}
              mr={'30px'}
              color={'blue.600'}
            >
              {`(보유 포인트: ${formatNumberWithCommas(availablePoint)} P)`}
            </Text>
          </Flex>
        </Flex>
        <Flex
          w={'100%'}
          justifyContent={'space-between'}
          alignItems={'center'}
          bg={'mint.100'}
          py={3}
          px={6}
          my={8}
        >
          <Heading size={'md'}>계좌출금금액</Heading>
          <Heading size={'md'} color={'main'}>
            {formatNumberWithCommas(krw - point)} 원
          </Heading>
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
          width={'220px'}
          fontSize={'18px'}
          onClick={nextStep}
          styles={!isFilled && { isDisabled: true }}
        >
          송금하고 거래 시작하기
        </BasicButton>
      </Flex>
    </Flex>
  )
}

export default FinalCheckForm
