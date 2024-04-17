import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'

const FinalCheckForm = () => {
  return (
    <Flex flex={1} direction={'column'}>
      <Heading size={'lg'} color={'black.soft'}>
        최종 확인
      </Heading>
      <Flex mt={'20px'} flex={1} direction={'column'} alignItems="flex-start">
        {/* 내용추가 */}
        거래 기간, 원금, 환전금액, 거래유형
      </Flex>
    </Flex>
  )
}

export default FinalCheckForm
