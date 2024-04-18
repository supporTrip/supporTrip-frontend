import { Flex, Heading, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { formatNumberWithCommas } from '../../utils/numberUtils'

const FinalCheckForm = ({ }) => {
  const startDate = '2024-04-18'
  const endDate = '2024-05-20'
  const type = '목표형'
  const krw = 500000
  const availablePoint = 1200
  const [point, setPoint] = useState(0)

  return (
    <Flex flex={1} direction={'column'}>
      <Heading size={'lg'} color={'black.soft'}>
        최종 확인
      </Heading>
      <Flex
        mt={'20px'}
        flex={1}
        direction={'column'}
        alignItems="flex-start"
        fontSize={'md'}
      >
        {/* 거래 기간, 원금, 환전금액, 거래유형 */}

        <Flex w={'100%'} justifyContent={'space-between'}>
          <Text>거래 시작일</Text>
          <Text>{startDate}</Text>
        </Flex>
        <Flex w={'100%'} justifyContent={'space-between'}>
          <Text>거래 종료일</Text>
          <Text>{endDate}</Text>
        </Flex>

        <Flex w={'100%'} justifyContent={'space-between'}>
          <Text>거래 유형</Text>
          <Text>{type}</Text>
        </Flex>
        {type === '목표형' && (
          <Flex w={'100%'} justifyContent={'space-between'}>
            <Text>목표 환율</Text>
            <Flex alignItems={'center'}>
              <Input placeholder="0" textAlign={'right'} />원
            </Flex>
          </Flex>
        )}
        <Flex w={'100%'} justifyContent={'space-between'}>
          <Text>충전금</Text>
          <Text>{formatNumberWithCommas(krw)}원</Text>
        </Flex>
        <Flex w={'100%'} justifyContent={'space-between'}>
          <Text>포인트 사용</Text>
          <Flex alignItems={'center'}>
            <Input placeholder="0" textAlign={'right'}></Input>P
          </Flex>
          {/* <Text>보유 포인트: {formatNumberWithCommas(availablePoint)}P</Text> */}
        </Flex>
        <Flex
          w={'100%'}
          justifyContent={'space-between'}
          alignItems={'center'}
          bg={'mint.100'}
          p={3}
        >
          <Heading size={'md'}>계좌출금금액</Heading>
          <Heading size={'md'} color={'main'}>
            {formatNumberWithCommas(krw - point)}원
          </Heading>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default FinalCheckForm
