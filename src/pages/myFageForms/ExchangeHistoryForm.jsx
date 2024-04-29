import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import ExchangeTable from '../../components/cards/ExchangeTable'

function ExchangeHistoryForm({ data }) {
  const exchangeData = data.exchanges || []

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
          />
          {exchangeData.map((exchange, index) => {
            return (
              <ExchangeTable
                key={index}
                transactionDate={exchange.transactionDate}
                name={exchange.name}
                tradingAmount={exchange.tradingAmount}
                targetAmount={exchange.targetAmount}
                targetAvg={exchange.targetAvg}
              />
            )
          })}
        </Flex>
      </Flex>
    </>
  )
}

export default ExchangeHistoryForm
