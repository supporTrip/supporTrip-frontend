import { Flex, Heading, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import BasicButton from '../../components/buttons/BasicButton'
import ImageRadioCard from '../../components/cards/ImageRadioCard'
import SafeType from '../../images/safe-type-img.png'
import TargetType from '../../images/target-type-img.png'

const strategies = [
  {
    title: '목표형',
    subTitle: '직접 환율을 설정해요',
    desc: '마지막까지 도달하지 않으면\n마지막 날에 모두 환전해요.',
    code: 'TARGET',
  },
  {
    title: '안정형',
    subTitle: '매일 조금씩 환전해요',
    desc: '거래 첫날 환율과 비교해\n손해를 봤다면\n포인트로 보상해드릴게요.',
    code: 'STABLE',
  },
]

const TypeSelectionForm = ({
  previousStep,
  nextStep,
  exchangeData,
  updateExchangeData,
}) => {
  const [isFilled, setIsFilled] = useState(true)
  const [typeIdx, setTypeIdx] = useState(exchangeData.strategy?.idx)

  useEffect(() => {
    if (isNaN(typeIdx)) {
      setIsFilled(true)
    }
  }, [typeIdx])

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
          justifyContent={'space-between'}
          alignItems={'center'}
          gap={5}
        >
          {strategies.map((type, idx) => {
            return (
              <ImageRadioCard
                key={idx}
                width={'260px'}
                imgSrc={idx === 0 ? TargetType : SafeType}
                title={type.title}
                subTitle={type.subTitle}
                isSelected={typeIdx === idx}
                onClick={() => {
                  updateExchangeData({
                    strategy: {
                      idx: idx,
                      title: strategies[idx].title,
                      code: strategies[idx].code,
                    },
                  })
                  setTypeIdx(idx)
                }}
              ></ImageRadioCard>
            )
          })}
        </Flex>
      </Flex>
      <Flex w={'100%'} justifyContent={'space-between'}>
        <BasicButton
          bgColor={'gray.100'}
          color="gray.400"
          size={'lg'}
          width={'130px'}
          fontSize={'18px'}
          onClick={previousStep}
        >
          이전
        </BasicButton>
        <BasicButton
          bgColor={'main'}
          color="white"
          size={'lg'}
          width={'130px'}
          fontSize={'18px'}
          onClick={nextStep}
          styles={!isFilled && { isDisabled: true }}
        >
          다음
        </BasicButton>
      </Flex>
    </Flex>
  )
}

export default TypeSelectionForm
