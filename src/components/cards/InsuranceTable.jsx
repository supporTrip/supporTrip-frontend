import { Flex, Text, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'

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
        <Grid w="100%" templateColumns="repeat(5, 1fr)" gap={10}>
          <GridItem w="100%" h="6">
            <Text fontWeight={title ? 'bold' : 'normal'}>{issueDate}</Text>
          </GridItem>
          <GridItem w="100%" h="6">
            <Text fontWeight={title ? 'bold' : 'normal'}>
              {corporationName}
            </Text>
          </GridItem>
          <GridItem w="100%" h="6">
            <Text fontWeight={title ? 'bold' : 'normal'}>{name}</Text>
          </GridItem>
          <GridItem w="100%" h="6">
            <Text fontWeight={title ? 'bold' : 'normal'}>{faceAmt}</Text>
          </GridItem>
          <GridItem w="100%" h="6">
            <Text fontWeight={title ? 'bold' : 'normal'}>{status}</Text>
          </GridItem>
        </Grid>
      </Flex>
    </>
  )
}

export default InsuranceTable
