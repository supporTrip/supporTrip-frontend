import { Flex, Heading, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import BasicButton from '../../components/buttons/BasicButton'
import RadioCard from '../../components/cards/RadioCard'

const TypeForm = ({ nextStep }) => {
  const options = [
    {
      title: '목표형',
      desc: '목표 환율을 설정해요.\n마지막날까지 도달하지 않으면 마지막 날 기준 환율로 환전해요.',
    },
    {
      title: '안정형',
      desc: '매일 조금씩 분배해서 환전해요.\n거래 첫날과 비교하여 손해를 봤다면 포인트로 보상해드려요.',
    },
    {
      title: '모험형',
      desc: '환율 변동에 따라 확률을 조정해요.\n원금 손실이 일어날 수 있지만 가장 큰 이득을 볼 수도 있어요.',
    },
  ]
  const [selectedOption, setSelectedOption] = useState(null)

  const handleCardClick = (idx) => {
    setSelectedOption(idx)
  }

  return (
    <Flex flex={1} direction={'column'}>
      <Heading size={'lg'} color={'black.soft'}>
        거래 유형
      </Heading>
      <Text mt={'20px'} color={'gray.600'}>
        환전 거래 유형을 선택하세요.
      </Text>
      <Flex mt={'20px'} flex={1} direction={'column'} alignItems="flex-start">
        <Flex
          w={'100%'}
          direction={'column'}
          gap={4}
          justifyContent={'center'}
          alignItems={'center'}
          mb={'20px'}
        >
          {options.map((type, idx) => {
            return (
              <RadioCard
                key={idx}
                width={'90%'}
                title={type.title}
                desc={type.desc}
                isSelected={selectedOption === idx}
                onClick={() => {
                  return handleCardClick(idx)
                }}
              ></RadioCard>
            )
          })}
        </Flex>
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

export default TypeForm
