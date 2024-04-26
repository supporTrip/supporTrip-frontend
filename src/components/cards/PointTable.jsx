import { Flex, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import HoverText from './HoverText'

function PointTable(props) {
  const { transactionDate, detail, point, totalPoint, title, type } = props
  const pointTitle = title ? point : type + point
  const textColor = title ? 'black' : type === '+' ? 'green.500' : 'red.500'

  return (
    <>
      <Flex
        alignItems="baseline"
        borderBottom="1px solid"
        borderColor={'gray.200'}
        pt={5}
        pb={5}
      >
        <Grid w="100%" templateColumns="1fr 2fr 1fr 1fr" gap={6}>
          <GridItem w="100%" h="6">
            <HoverText
              title={title}
              content={transactionDate}
              maxLength={8}
            ></HoverText>
          </GridItem>
          <GridItem w="100%" h="6">
            <HoverText
              title={title}
              content={detail}
              maxLength={18}
            ></HoverText>
          </GridItem>
          <GridItem w="100%" h="6">
            <HoverText
              title={title}
              content={pointTitle}
              maxLength={8}
              textColor={textColor}
            ></HoverText>
          </GridItem>
          <GridItem w="100%" h="6">
            <HoverText
              title={title}
              content={totalPoint}
              maxLength={8}
            ></HoverText>
          </GridItem>
        </Grid>
      </Flex>
    </>
  )
}

export default PointTable
