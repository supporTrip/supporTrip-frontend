import { Card, Flex, Spacer, Text } from '@chakra-ui/react'
import React from 'react'

function TimelineCard(props) {
  const { detail, sign, unit } = props
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
          <Text fontWeight={'bold'} fontSize={20}>
            {detail.date}
          </Text>
          <Text color={'gray.500'} fontSize={16}>
            {detail.time}
          </Text>
        </Flex>
        <Flex marginLeft={8} direction={'column'} alignItems={'left'}>
          <Text fontSize={20}>{unit + '로 환전'}</Text>
          <Text color={'gray.500'} fontSize={15}>
            {'적용환율 | ' + detail.exchangeRate}
          </Text>
        </Flex>
        <Spacer></Spacer>
        <Flex direction={'column'} alignSelf={'right'} alignItems={'right'}>
          <Text
            letterSpacing={'1%'}
            color="blue.400"
            fontWeight={'SemiBold'}
            fontSize={23}
          >
            {sign + detail.transactionMoney}
          </Text>
          <Text letterSpacing={'1%'} color={'gray.500'} fontSize={16}>
            {sign + detail.totalMoney}
          </Text>
        </Flex>
      </Card>
    </>
  )
}

export default TimelineCard
