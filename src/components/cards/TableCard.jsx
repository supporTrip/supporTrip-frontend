import { Flex, Box, Text, Spacer } from '@chakra-ui/react'
import React from 'react'

function TableCard(props) {
  const { title, content, children } = props
  return (
    <>
      <Flex
        alignItems="baseline"
        borderBottom="1px solid"
        borderColor={'gray.200'}
        pt={5}
        pb={5}
      >
        <Flex>
          <Box width={200}>
            <Text>{title}</Text>
          </Box>
          <Box width={200}>
            <Text fontWeight={'bold'}>{content}</Text>
          </Box>
        </Flex>
        <Spacer></Spacer>
        <Box alignSelf={'right'}>{children}</Box>
      </Flex>
    </>
  )
}

export default TableCard
