import { ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Box,
  Card,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react'
import { useAnimation } from '@codechem/chakra-ui-animations'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BasicButton from '../components/buttons/BasicButton'
import PartyingFace from '../images/partying-face.svg'

const ExchangeResult = () => {
  const navigate = useNavigate()
  const bounceAnimation = useAnimation('bounce', {
    duration: 2000,
    iterationCount: 3,
  })
  const flashAnimation = useAnimation('', {
    duration: 2000,
    iterationCount: 1,
  })

  const [recommendInsurances, setRecommendInsurances] = useState([
    {
      id: 1,
      insuranceName: '안전 여행 한다 해외여행자보험',
      premium: '8,700',
      planName: '표준',
      companyName: '한화손해보험',
      logoImageUrl: '',
    },
    {
      id: 2,
      insuranceName: '해외여행자보험',
      premium: '10,000',
      planName: '표준',
      companyName: '삼성손해보험',
      logoImageUrl: '',
    },
    {
      id: 3,
      insuranceName: '다이렉트 해외여행자보험',
      premium: '12,000',
      planName: '프리미엄',
      companyName: '농협손해보험',
      logoImageUrl: '',
    },
  ])

  return (
    <Flex
      minH={'full'}
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      mt={'30px'}
    >
      <Image src={PartyingFace} w={'200px'} animation={bounceAnimation}></Image>
      <Heading size={'lg'}>환전이 성공적으로 시작되었어요!</Heading>
      <Box mt={'20px'} fontSize={'18px'} textAlign={'center'}>
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
      <Divider marginY={'60px'} color={'gray.200'}></Divider>
      <Flex direction={'column'} w={'100%'} mb={'80px'}>
        <Flex alignItems={'center'}>
          <Text fontSize={'22px'} fontFamily={'pretendard-bold'}>
            은혜님을 위한 해외 여행자 보험이에요
          </Text>
          <ArrowForwardIcon
            boxSize={7}
            ml={'4px'}
            cursor={'pointer'}
            onClick={() => {
              navigate('/flight-insurance')
            }}
          ></ArrowForwardIcon>
        </Flex>
        <Flex w={'100%'} mt={'20px'} justifyContent={'space-between'}>
          {recommendInsurances.map((insurance, idx) => {
            return (
              // TODO: 클릭 시 디테일 페이지로 이동
              <Card
                key={idx}
                minW={'350px'}
                fontSize={'18px'}
                fontFamily={'pretendard-bold'}
                size={'md'}
                p={'30px'}
                paddingX={'50px'}
                bg={
                  'mint.100'
                  // idx === 0 ? 'red.200' : idx === 1 ? 'orange.100' : 'green.100'
                }
                cursor={'pointer'}
                shadow={'none'}
                animation={flashAnimation}
              >
                <Text color={'gray.500'}>{insurance.companyName}</Text>
                <Text fontSize={'22px'}>{insurance.insuranceName}</Text>
                <Flex
                  mt={'50px'}
                  w={'100%'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  gap={4}
                >
                  <Text color={'gray.500'}>예상 보험료</Text>
                  <Text fontSize={'24px'} color={'main'}>
                    {insurance.premium}원
                  </Text>
                </Flex>
              </Card>
            )
          })}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ExchangeResult
