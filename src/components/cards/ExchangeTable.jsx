import { Flex, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import HoverText from './HoverText'

function ExchangeTable(props) {
  const {
    transactionDate,
    name,
    tradingAmount,
    targetAmount,
    targetAvg,
    title,
    children,
  } = props
  return (
    <>
      <Flex
        alignItems="baseline"
        borderBottom="1px solid"
        borderColor={'gray.200'}
        pt={5}
        pb={5}
      >
        <Grid w="100%" templateColumns="1fr 2fr 1fr 1fr 1fr" gap={6}>
          <GridItem w="100%" h="6">
            <HoverText
              title={title}
              content={transactionDate}
              maxLength={7}
            ></HoverText>
          </GridItem>
          <GridItem w="100%" h="6">
            <HoverText title={title} content={name} maxLength={18}></HoverText>
          </GridItem>
          <GridItem w="100%" h="6">
            <HoverText
              title={title}
              content={tradingAmount}
              maxLength={7}
            ></HoverText>
          </GridItem>
          <GridItem w="100%" h="6">
            <HoverText
              title={title}
              content={targetAmount}
              maxLength={7}
            ></HoverText>
          </GridItem>
          <GridItem w="100%" h="6">
            <HoverText
              title={title}
              content={targetAvg}
              maxLength={7}
            ></HoverText>
          </GridItem>
        </Grid>
        {children}
      </Flex>
    </>
  )
}

export default ExchangeTable
