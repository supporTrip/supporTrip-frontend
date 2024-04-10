import React from 'react'
import { Flex, Heading, Input, Text } from '@chakra-ui/react'
import BasicButton from '../../components/buttons/BasicButton'

const CheckTicketForm = ({ nextStep }) => {
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
        <Flex w={'100%'} justifyContent={'flex-end'}>
          <BasicButton
            bgColor={'main'}
            color="white"
            size={'lg'}
            width={'130px'}
            fontSize={'18px'}
            onClick={nextStep}
          >
            다음
          </BasicButton>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default CheckTicketForm
