import { Divider, Flex, Heading, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { formatNumberWithCommas } from '../../utils/numberUtils'

const FinalCheckForm = ({}) => {
  const startDate = '2024-04-18'
  const endDate = '2024-05-20'
  const type = '목표형'
  const krw = 500000
  const availablePoint = 1200
  const [point, setPoint] = useState(0)

  const labelStyles = {
    color: 'gray.400',
    fontWeight: 600,
  }

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
          <Text>{startDate}</Text>
        </Flex>
        <Divider color={'gray.200'} my={4}></Divider>
        <Flex w={'90%'} justifyContent={'space-between'}>
          <Text {...labelStyles}>거래 종료일</Text>
          <Text>{endDate}</Text>
        </Flex>
        <Divider color={'gray.200'} my={4}></Divider>
        <Flex w={'90%'} justifyContent={'space-between'}>
          <Text {...labelStyles}>거래 유형</Text>
          <Text>{type}</Text>
        </Flex>
        <Divider color={'gray.200'} my={4}></Divider>
        {type === '목표형' && (
          <Flex w={'90%'} justifyContent={'space-between'}>
            <Text {...labelStyles}>목표 환율</Text>
            <Flex alignItems={'center'}>
              <Input placeholder="0" textAlign={'right'} />
              <Text ml={2}>원</Text>
            </Flex>
          </Flex>
        )}
        <Divider color={'gray.200'} my={4}></Divider>
        <Flex w={'90%'} justifyContent={'space-between'}>
          <Text {...labelStyles} my={4}>
            충전금
          </Text>
          <Text>{formatNumberWithCommas(krw)} 원</Text>
        </Flex>
        <Divider color={'gray.200'}></Divider>
        <Flex w={'90%'} justifyContent={'space-between'}>
          <Text {...labelStyles} my={4}>
            포인트 사용
          </Text>
          <Flex direction={'column'}>
            <Flex alignItems={'center'}>
              <Input placeholder="0" textAlign={'right'}></Input>
              <Text ml={2}>P</Text>
            </Flex>
            <Text
              fontSize={'16px'}
              textAlign={'right'}
              mr={'30px'}
              color={'blue.600'}
            >
              {`(보유 포인트: ${formatNumberWithCommas(availablePoint)}P)`}
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
          mb={6}
          mt={4}
        >
          <Heading size={'md'}>계좌출금금액</Heading>
          <Heading size={'md'} color={'main'}>
            {formatNumberWithCommas(krw - point)} 원
          </Heading>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default FinalCheckForm
