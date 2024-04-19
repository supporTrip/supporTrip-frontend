import { Flex, Heading, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import BasicButton from '../../components/buttons/BasicButton'

const TicketCheckForm = ({ nextStep }) => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [ticketSerial, setTicketSerial] = useState('')

  const authorizeTicket = () => {
    // TODO: 문구 수정 및 필요시 토스트 알람 구현, api 호출
    alert('유효한 비행기 티켓입니다')
    setIsAuthorized(true)
  }

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
        justifyContent={'space-between'}
        alignItems="center"
        gap={2}
      >
        <Input
          size="md"
          borderColor={'gray.300'}
          focusBorderColor="main"
          placeholder="비행기 티켓 일련 번호"
          value={ticketSerial}
          onChange={(e) => {
            setTicketSerial(e.target.value)
          }}
          isReadOnly={isAuthorized && true}
          bg={isAuthorized && 'gray.50'}
        />
        <BasicButton
          border="1px solid "
          bgColor="transparent"
          color="main"
          onClick={authorizeTicket}
          styles={
            (!ticketSerial.length || isAuthorized) && { isDisabled: true }
          }
        >
          인증하기
        </BasicButton>
      </Flex>

      <Flex w={'100%'} justifyContent={'flex-end'}>
        <BasicButton
          bgColor={'main'}
          color="white"
          size={'lg'}
          width={'130px'}
          fontSize={'18px'}
          onClick={nextStep}
          styles={!isAuthorized && { isDisabled: true }}
        >
          다음
        </BasicButton>
      </Flex>
    </Flex>
  )
}

export default TicketCheckForm
