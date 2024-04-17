import { Box, Flex, Heading, Input, Text } from '@chakra-ui/react'
import React from 'react'

const MoneyInputForm = () => {
  return (
    <Flex flex={1} direction={'column'}>
      <Heading size={'lg'} color={'black.soft'}>
        환전 금액
      </Heading>
      <Text mt={'20px'} color={'gray.600'}>
        환전할 금액을 입력하세요.
      </Text>
      <Flex mt={'50px'} flex={1} direction={'column'} alignItems="flex-start">
        <Flex w={'100%'} alignItems={'center'}>
          <Text w={'60px'} mr={'20px'}>
            환전 금액
          </Text>
          <Box w={'300px'}>
            <Input
              size="md"
              borderColor={'gray.300'}
              focusBorderColor="main"
              type="number"
            />
          </Box>
          <Text ml={'10px'}>원</Text>
        </Flex>
        <Flex w={'100%'} alignItems={'center'} mt={'20px'}>
          <Box ml={'80px'} w={'300px'}>
            <Input
              size="md"
              borderColor={'gray.300'}
              focusBorderColor="gray.300"
              cursor={'default'}
              type="number"
              isReadOnly={true}
            />
          </Box>
          <Text ml={'10px'}>달러</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default MoneyInputForm
