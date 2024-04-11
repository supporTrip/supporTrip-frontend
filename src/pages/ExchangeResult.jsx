import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { useAnimation } from '@codechem/chakra-ui-animations'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BasicButton from '../components/buttons/BasicButton'
import PartyingFace from '../images/partying-face.svg'

const ExchangeResult = () => {
  const navigate = useNavigate()
  const animation = useAnimation('bounce', {
    duration: 2000,
    iterationCount: 'infinite',
  })

  return (
    <Flex
      minH={'full'}
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Image src={PartyingFace} animation={animation}></Image>
      <Heading mt={'40px'} size={'lg'}>
        환전이 성공적으로 시작되었어요!
      </Heading>
      <Box mt={'20px'} textAlign={'center'}>
        <Text>앞으로 환전은 자동으로 해드릴게요.</Text>
        <Text mt={'8px'}>거래가 종료되면 SMS으로 알려드려요.</Text>
      </Box>
      <Flex mt={'30px'} gap={4}>
        <BasicButton
          width={'150px'}
          size={'lg'}
          onClick={() => {
            navigate('/')
          }}
        >
          홈으로
        </BasicButton>
        <BasicButton
          width={'200px'}
          size={'lg'}
          bgColor={'main'}
          color={'white'}
          onClick={() => {
            navigate('/exchange')
          }}
        >
          거래 내역 확인하기
        </BasicButton>
      </Flex>
    </Flex>
  )
}

export default ExchangeResult
