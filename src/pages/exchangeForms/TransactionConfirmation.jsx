import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import BasicButton from '../../components/buttons/BasicButton'

const TransactionConfirmation = ({ nextStep }) => {
  return (
    <Flex flex={1} direction={'column'}>
      <Heading size={'lg'} color={'black.soft'}>
        최종 확인
      </Heading>
      <Flex mt={'20px'} flex={1} direction={'column'} alignItems="flex-start">
        {/* 내용추가 */}
        거래 기간, 원금, 환전금액, 거래유형
        <Flex
          w={'100%'}
          flex={1}
          justifyContent={'flex-end'}
          alignItems={'flex-end'}
        >
          <BasicButton
            bgColor={'main'}
            color="white"
            size={'lg'}
            width={'220px'}
            fontSize={'18px'}
            onClick={nextStep}
          >
            송금하고 거래 시작하기
          </BasicButton>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default TransactionConfirmation
