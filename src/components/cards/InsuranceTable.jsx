import { Flex, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import HoverText from './HoverText'

function InsuranceTable(props) {
  const { issueDate, corporationName, name, faceAmt, status, title } = props

  return (
    <>
      <Flex
        alignItems="baseline"
        borderBottom="1px solid"
        borderColor={'gray.200'}
        pt={5}
        pb={5}
      >
        <Grid w="100%" templateColumns="1fr 1fr 2fr 1fr 1fr" gap={10}>
          <GridItem w="100%" h="6">
            <HoverText
              title={title}
              content={issueDate}
              maxLength={10}
            ></HoverText>
          </GridItem>
          <GridItem w="100%" h="6">
            <HoverText
              title={title}
              content={corporationName}
              maxLength={6}
            ></HoverText>
          </GridItem>
          <GridItem w="100%" h="6">
            <HoverText title={title} content={name} maxLength={13}></HoverText>
          </GridItem>
          <GridItem w="100%" h="6">
            <HoverText
              title={title}
              content={faceAmt}
              maxLength={7}
            ></HoverText>
          </GridItem>
          <GridItem w="100%" h="6">
            <HoverText title={title} content={status} maxLength={7}></HoverText>
          </GridItem>
        </Grid>
      </Flex>
    </>
  )
}

export default InsuranceTable
