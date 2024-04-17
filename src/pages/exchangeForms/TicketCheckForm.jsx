import { Flex, Heading, Input, Text } from '@chakra-ui/react'
import React from 'react'

const TicketCheckForm = () => {
  return (
    <Flex flex={1} direction={'column'}>
      <Heading size={'lg'} color={'black.soft'}>
        비행기 티켓 인증
      </Heading>
      <Text mt={'20px'} color={'gray.600'}>
        환전을 위해 비행기 티켓이 필요해요.
      </Text>
      <Text mt={'10px'} color={'gray.600'}>
        유효한 비행기 티켓 일련 번호를 입력해주세요.
      </Text>
      <Flex
        flex={1}
        direction={'column'}
        justifyContent={'space-between'}
        alignItems="flex-start"
      >
        <Input
          mt={'50px'}
          size="md"
          borderColor={'gray.300'}
          focusBorderColor="main"
          placeholder="비행기 티켓 일련 번호"
        />
      </Flex>
    </Flex>
  )
}

export default TicketCheckForm
