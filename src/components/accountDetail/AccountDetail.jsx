import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  Stack,
  VStack,
  HStack,
  Text,
  Box,
  Flex,
  Spacer,
} from '@chakra-ui/react'

function AccountDetail(props) {
  const { detail } = props
  return (
    <>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow="hidden"
        variant="outline"
        alignItems={'center'}
        width={'100%'}
        height={100}
        pl={10}
        pr={10}
      >
          <Flex direction={'column'} alignItems={'left'}>
            <Text fontFamily={'Pretendard-Bold'} fontSize={20}>{detail.date}</Text>
            <Text color={'gray.500'} fontSize={16}>
              {detail.time}
            </Text>
          </Flex>
          <Flex marginLeft={8} direction={'column'} alignItems={'left'}>
            <Text fontSize={20}>
              {detail.unit + '로 환전'}
            </Text>
            <Text color={'gray.500'} fontSize={15}>
              {'적용환율 | ' + detail.exchangeRate}
            </Text>
          </Flex>
          <Spacer></Spacer>
          <Flex direction={'column'} alignSelf={'right'} alignItems={'right'}>
            <Text letterSpacing={'1%'} color='teal.300' fontFamily={'Pretendard-SemiBold'} fontSize={23}>
              {detail.sign + detail.transactionMoney}
            </Text>
            <Text letterSpacing={'1%'} color={'gray.500'} fontSize={16}>
              {detail.sign + detail.totalMoney}
            </Text>
          </Flex>
      </Card>
    </>
  )
}

export default AccountDetail
