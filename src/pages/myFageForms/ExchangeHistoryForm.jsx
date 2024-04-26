import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import ExchangeTable from '../../components/cards/ExchangeTable'

function ExchangeHistoryForm() {
  const [userData, setUserData] = useState([
    {
      transactionDate: '2024.03.15',
      name: '첫 휴가 기념 LA 여행ㅁㅂㅂㅂㅂㅂ',
      tradingAmount: '500,000',
      targetAmount: '400USD',
      targetAvg: '1,300원',
    },
    {
      transactionDate: '2024.03.15',
      name: '첫 휴가 기념 LA 여행',
      tradingAmount: '500,000',
      targetAmount: '400USD',
      targetAvg: '1,300원',
    },
    {
      transactionDate: '2024.03.15',
      name: '첫 휴가 기념 LA 여행',
      tradingAmount: '500,000',
      targetAmount: '400USD',
      targetAvg: '1,300원',
    },
    {
      transactionDate: '2024.03.15',
      name: '첫 휴가 기념 LA 여행',
      tradingAmount: '500,000',
      targetAmount: '400USD',
      targetAvg: '1,300원',
    },
    {
      transactionDate: '2024.03.15',
      name: '첫 휴가 기념 LA 여행',
      tradingAmount: '500,000',
      targetAmount: '400USD',
      targetAvg: '1,300원',
    },
    {
      transactionDate: '2024.03.15',
      name: '첫 휴가 기념 LA 여행',
      tradingAmount: '500,000',
      targetAmount: '400USD',
      targetAvg: '1,300원',
    },
    {
      transactionDate: '2024.03.15',
      name: '첫 휴가 기념 LA 여행',
      tradingAmount: '500,000',
      targetAmount: '400USD',
      targetAvg: '1,300원',
    },
    {
      transactionDate: '2024.03.15',
      name: '첫 휴가 기념 LA 여행',
      tradingAmount: '500,000',
      targetAmount: '400USD',
      targetAvg: '1,300원',
    },
    {
      transactionDate: '2024.03.15',
      name: '첫 휴가 기념 LA 여행',
      tradingAmount: '500,000',
      targetAmount: '400USD',
      targetAvg: '1,300원',
    },
    {
      transactionDate: '2024.03.15',
      name: '첫 휴가 기념 LA 여행',
      tradingAmount: '500,000',
      targetAmount: '400USD',
      targetAvg: '1,300원',
    },
  ])
  return (
    <>
      <Flex width="100%" flex={1} direction={'column'}>
        <Flex direction="column" flex={1}>
          <Flex alignItems="baseline" borderBottom="2px solid" pb={5}>
            <Box width={300}>
              <Text
                fontSize={'xl'}
                mr={3}
                fontWeight={'bold'}
                letterSpacing={2}
              >
                환전거래내역
              </Text>
            </Box>
          </Flex>
          <ExchangeTable
            transactionDate="거래일자"
            name="거래이름"
            tradingAmount="원금"
            targetAmount="환전금"
            targetAvg="최종평균환율"
            title={true}
          ></ExchangeTable>
          {userData.map((data, index) => {
            return (
              <ExchangeTable
                key={index}
                transactionDate={data.transactionDate}
                name={data.name}
                tradingAmount={data.tradingAmount}
                targetAmount={data.targetAmount}
                targetAvg={data.targetAvg}
              />
            )
          })}
        </Flex>
      </Flex>
    </>
  )
}

export default ExchangeHistoryForm
