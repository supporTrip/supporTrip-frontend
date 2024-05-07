import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Divider,
  Flex,
  Img,
  ScaleFade,
  Text,
} from '@chakra-ui/react'
import axios from 'axios'
import { format, getYear, subYears } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import CreditCard from '../../images/credit-card.svg'
import Chittybang from '../../images/mild.jpg'
import { formatNumberWithCommas } from '../../utils/numberUtils'
import { getAccessToken } from '../../utils/tokenStore'
import LoadingPage from '../LoadingPage'

const BASE_URL = import.meta.env.VITE_BASE_URL
const toDate = format(new Date(), 'yyyy-MM-dd')
const fromDate = format(subYears(toDate, 3), 'yyyy-MM-dd')

const OverseasHistoryForm = () => {
  const { user } = useAuth()
  const accessToken = getAccessToken()
  const [isLoading, setIsLoading] = useState(true)
  const [ranking, setRanking] = useState([])
  const [overseas, setOverseas] = useState([])

  useEffect(() => {
    fetchOverseasInfo()
  }, [accessToken, isLoading])

  const fetchOverseasInfo = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/mypages/overseas?from_date=${fromDate}&to_date=${toDate}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )

      if (response.status === 200) {
        const data = response.data
        setRanking(data.ranking)
        setOverseas(data.overSeasHistories)
        setIsLoading(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const turnOnSms = async () => {
    try {
      const apiUrl = `${BASE_URL}/api/v1/mypages`
      const response = await axios.patch(
        apiUrl,
        {
          receiveStatus: true,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )

      if (response.status === 200) {
        alert(
          '알람 설정이 완료되었어요!\n마이페이지-정보조회에서 알람 설정을 변경할 수 있어요',
        )
      }
    } catch (error) {
      console.error('업데이트 실패:', error)
    }
  }

  const totalAmount = ranking.reduce((acc, rank) => {
    return acc + rank.amount
  }, 0)

  const rankingTop = ranking.find((rank) => {
    return rank.rank === 1
  })
  const rankingSecond = ranking.find((rank) => {
    return rank.rank === 2
  })
  const rankingThird = ranking.find((rank) => {
    return rank.rank === 3
  })

  return isLoading ? (
    <LoadingPage></LoadingPage>
  ) : (
    <Flex direction={'column'} flex={1} pr={10} overflowX={'hidden'}>
      <Box mt={5} fontSize={'20px'} fontWeight={'semibold'}>
        <Box>
          <Text as={'span'}>{user.name}</Text>
          <Text as={'span'}>님은</Text>
        </Box>
        <Flex alignItems={'center'}>
          <Text>최근 3년간 해외에서</Text>
          <Text color={'main'} mx={2} fontSize={'28px'} fontWeight={800}>
            총
          </Text>
          <Text color={'main'} mr={1} fontSize={'28px'} fontWeight={800}>
            {formatNumberWithCommas(totalAmount)}원
          </Text>
          <Text>을 소비했어요</Text>
        </Flex>
      </Box>
      <Flex
        w={'100%'}
        justifyContent={'space-between'}
        alignItems={'center'}
        fontSize={'18px'}
        fontWeight={'bold'}
        color={'#37C5A4'}
        bgColor={'#EEF8F5'}
        borderRadius={'8px'}
        p={3}
        mt={'10px'}
        mb={'20px'}
      >
        <Box>
          해외 지출 상위 3개 국가의 환율이 하락하면 SMS으로 알려드릴게요
        </Box>
        <Button
          color="white"
          bgImage={Chittybang}
          bgSize={'cover'}
          height="45px"
          _hover={{ bgColor: 'none' }}
          _focus={{ bgColor: 'none' }}
          _active={{ bgColor: 'none' }}
          onClick={turnOnSms}
        >
          알림켜고 혜택받기
        </Button>
      </Flex>
      <Flex
        w={'100%'}
        minH={'350px'}
        justifyContent={'center'}
        gap={10}
        bg={'white'}
        borderRadius={'8px'}
        padding={10}
        position={'relative'}
      >
        <Flex
          alignItems={'center'}
          position={'absolute'}
          top={6}
          left={6}
          fontSize={'18px'}
          fontWeight={600}
          letterSpacing={'1px'}
          color={'gray.300'}
        >
          <Box
            fontSize={'15px'}
            bgColor={'mint.100'}
            color={'main'}
            p={1}
            mr={1}
            borderRadius={'15px'}
          >
            TOP3
          </Box>
          <Text as={'span'}> 해외 소비</Text>
        </Flex>

        <Flex width={'100px'} direction={'column'} justifyContent={'flex-end'}>
          <ScaleFade initialScale={1.5} in={true}>
            <Flex direction={'column'} alignItems={'center'}>
              <Box fontSize={'28px'} fontWeight={600}>
                {rankingTop.countryName}
              </Box>
              <Box>{formatNumberWithCommas(rankingTop.amount)}원</Box>
            </Flex>
            <Flex
              w={'100%'}
              h={'150px'}
              justifyContent={'center'}
              alignItems={'center'}
              borderRadius={'5px'}
              fontSize={'30px'}
              fontWeight={800}
              color={'#f4e289'}
              bgColor={'#F3C40B'}
              transition={'3s'}
            >
              1위
            </Flex>
          </ScaleFade>
        </Flex>
        <Flex width={'100px'} direction={'column'} justifyContent={'flex-end'}>
          <ScaleFade initialScale={1.5} in={true}>
            <Flex direction={'column'} alignItems={'center'}>
              <Box fontSize={'28px'} fontWeight={600}>
                {rankingSecond.countryName}
              </Box>
              <Box>{formatNumberWithCommas(rankingSecond.amount)}원</Box>
            </Flex>
            <Flex
              w={'100%'}
              h={'100px'}
              justifyContent={'center'}
              alignItems={'center'}
              borderRadius={'5px'}
              fontSize={'30px'}
              fontWeight={600}
              color={'#ADAFAE'}
              bgColor={'#E2E0EA'}
            >
              2위
            </Flex>
          </ScaleFade>
        </Flex>
        <Flex width={'100px'} direction={'column'} justifyContent={'flex-end'}>
          <ScaleFade initialScale={1.5} in={true} reverse={true}>
            <Flex direction={'column'} alignItems={'center'}>
              <Box
                fontSize={rankingThird.countryName.length > 4 ? '22px' : '28px'}
                fontWeight={600}
              >
                {rankingThird.countryName}
              </Box>
              <Box>{formatNumberWithCommas(rankingThird.amount)}원</Box>
            </Flex>
            <Flex
              w={'100%'}
              h={'50px'}
              justifyContent={'center'}
              alignItems={'center'}
              borderRadius={'5px'}
              fontSize={'30px'}
              fontWeight={600}
              color={'#655852'}
              bgColor={'#A29085'}
            >
              3위
            </Flex>
          </ScaleFade>
        </Flex>
      </Flex>
      <Flex
        borderRadius={'6px'}
        color={'gray.500'}
        width={'100%'}
        alignItems={'center'}
        px={'4px'}
        mt={'10px'}
        fontSize={'16px'}
      >
        <InfoOutlineIcon mr={1} boxSize={'15px'}></InfoOutlineIcon>
        <Flex alignItems={'center'}>
          마이데이터의 카드 해외 승인 내역을 분석하여 현재 환율 기준으로 환산한
          금액입니다.
        </Flex>
      </Flex>
    </Flex>
  )
}

export default OverseasHistoryForm
