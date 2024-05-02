import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Image,
  Img,
  ScaleFade,
  Text,
} from '@chakra-ui/react'
import axios from 'axios'
import { format, getYear, subYears } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Crown from '../../images/crown.png'
import CreditCard from '../../images/credit-card.svg'
import { formatNumberWithCommas } from '../../utils/numberUtils'
import { getAccessToken } from '../../utils/tokenStore'
import LoadingPage from '../LoadingPage'
import { useAnimation } from '@codechem/chakra-ui-animations'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import Chittybang from '../../images/mild.jpg'

const BASE_URL = import.meta.env.VITE_BASE_URL

const dummyRanking = [
  { rank: 1, countryName: '미국', count: 5 },
  { rank: 2, countryName: '일본', count: 3 },
  { rank: 3, countryName: '중국', count: 1 },
  { rank: 4, countryName: '베트남', count: 1 },
  { rank: 5, countryName: '태국', count: 1 },
]
const dummyHistory = [
  {
    id: 1,
    code: 'US',
    countryName: '미국',
    approvedAt: '2022-01-11',
    amount: 15000,
    currencyCode: 'USD',
  },
  {
    id: 2,
    code: 'JP',
    countryName: '일본',
    approvedAt: '2021-08-08',
    amount: 8000,
    currencyCode: 'JPY',
  },
]

const toDate = format(new Date(), 'yyyy-MM-dd')
const fromDate = format(subYears(toDate, 3), 'yyyy-MM-dd')

const OverseasHistoryForm = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const accessToken = getAccessToken()
  const [isLoading, setIsLoading] = useState(true)
  const [ranking, setRanking] = useState([])
  const [overseas, setOverseas] = useState([])
  const animation = useAnimation('flash', {
    duration: 2000,
    iterationCount: 1,
  })

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

  const topRankCard = (rank) => {
    return (
      <Box
        position={'relative'}
        overflow={'wrap'}
        flex={1}
        p={4}
        bgColor={'mint.100'}
        border={'1px solid'}
        borderColor={'gray.200'}
        borderRadius={'8px'}
      >
        <Box>{rank.rank}위</Box>
        <Box textAlign={'center'} fontSize={'30px'} fontWeight={'bold'}>
          {rank.countryName}
        </Box>
        <Box
          textAlign={'right'}
          fontSize={'20px'}
          fontWeight={'bold'}
          color={'main'}
        >
          {formatNumberWithCommas(rank.amount)} 원
        </Box>
        <Box position={'absolute'} top={'-65px'} right={-3}>
          <Image src={Crown} w={'100px'}></Image>
        </Box>
      </Box>

      // <Box
      //   key={idx}
      //   position={'relative'}
      //   overflow={'wrap'}
      //   border={'1px solid red'}
      // >
      //   <Box
      //     w={'160px'}
      //     p={4}
      //     bgColor={'white'}
      //     border={'1px solid'}
      //     borderColor={'gray.200'}
      //     borderRadius={'8px'}
      //   >
      //     <Box>{rank.rank}위</Box>
      //     <Box>{rank.countryName}</Box>
      //     <Box>{rank.count}회</Box>
      //   </Box>
      //   <Box position={'absolute'} top={-10} right={-8}>
      //     <Image src={Crown} w={'100px'}></Image>
      //   </Box>
      // </Box>
    )
  }

  const chart = ({ rank, totalAmount, bgColor }) => {
    if (totalAmount === 0) {
      return
    }

    return (
      <Flex
        direction={'column'}
        minW={'30px'}
        maxW={'30px'}
        minH={'100%'}
        bgColor={'#bfdbfe'}
        borderRadius={'8px'}
      ></Flex>
    )
  }

  const award = ({ rank }) => {}

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
          {/* <Box ml={1} w={'44px'}>
            <Img src={Sunglass}></Img>
          </Box> */}
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
        my={'10px'}
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
          // onClick={handleSearch}
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
        // animation={animation}
        position={'relative'}
      >
        <Box
          position={'absolute'}
          top={6}
          left={6}
          fontSize={'20px'}
          fontWeight={600}
          letterSpacing={'1px'}
          color={'gray.300'}
        >
          <Text as={'span'} color={'main'} opacity={'70%'}>
            TOP3
          </Text>
          {/* <Text as={'span'}>3</Text> */}
          <Text as={'span'}> 해외 소비</Text>
        </Box>
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
            >
              1위
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
        {/* <Flex flex={1} direction={'column'} position={'relative'}>
          <Flex flex={1} mx={5}>
            {chart(
              ranking.find((rank) => {
                return rank.rank === 2
              }),
              totalAmount,
              '#bfdbfe',
            )}
          </Flex>
          <Box
            minW={'100%'}
            minH={'6px'}
            bgColor={'gray.400'}
            borderRadius={'1px'}
            position={'absolute'}
            bottom={0}
          ></Box>
        </Flex> */}
      </Flex>
      <Flex
        // bg={'gray.50'}
        borderRadius={'6px'}
        color={'gray.500'}
        width={'100%'}
        // p={4}
        alignItems={'center'}
        px={'4px'}
        mt={'10px'}
        fontSize={'16px'}
      >
        {/* <Img src={InfoIcon} boxSize={4} /> */}
        <InfoOutlineIcon mr={1} boxSize={'15px'}></InfoOutlineIcon>
        <Flex alignItems={'center'}>
          마이데이터의 카드 해외 승인 내역을 분석하여 현재 환율 기준으로 환산한
          금액입니다.
        </Flex>
      </Flex>
      <Flex direction={'column'} mt={'70px'}>
        <Flex mb={5} fontSize={'20px'} fontWeight={'semibold'}>
          <Box mr={2}>
            <Img src={CreditCard}></Img>
          </Box>
          소비 타임라인
        </Flex>
        <Flex direction={'column'} position={'relative'}>
          <Box
            position={'absolute'}
            minW={'5px'}
            minH={'100%'}
            bgColor={'blue.100'}
            borderRadius={'8px'}
            left={'5px'}
          ></Box>
          <Box
            position={'absolute'}
            minW={'15px'}
            minH={'15px'}
            borderRadius={'100%'}
            bgColor={'blue.100'}
            left={0}
          ></Box>
          <Box
            position={'absolute'}
            minW={'15px'}
            minH={'15px'}
            borderRadius={'100%'}
            bgColor={'blue.100'}
            left={0}
            bottom={0}
          ></Box>
          {overseas.map((oversea, idx) => {
            const year = getYear(oversea.approvedAt)
            return (
              <>
                {idx === 0 || year !== getYear(oversea.approvedAt)}
                <Flex key={idx} alignItems={'center'}>
                  <Box
                    minW={'15px'}
                    minH={'15px'}
                    border={'2px solid '}
                    borderColor={'blue.800'}
                    borderRadius={'100%'}
                    bgColor={'blue.800'}
                    left={0}
                    zIndex={10}
                  ></Box>
                  <Divider color={'gray.400'} w={'24px'} mx={2}></Divider>
                  <Flex
                    direction={'column'}
                    fontSize={'18px'}
                    w={'370px'}
                    my={4}
                    border={'1px solid'}
                    borderColor={'gray.100'}
                    borderRadius={'8px'}
                    bgColor={'white'}
                    p={4}
                  >
                    <Box color={'gray.400'} fontSize={'16px'} mb={1}>
                      {format(
                        oversea.approvedAt,
                        'yyyy년 MM월 dd일 | hh:MM:ss',
                      )}
                      {/* {format(oversea.approvedAt, 'hh:MM:ss')} */}
                    </Box>
                    <Flex
                      alignItems={'center'}
                      justifyContent={'space-between'}
                    >
                      <Box textAlign={'left'} mr={4}>
                        <Box>{oversea.countryName}</Box>
                      </Box>
                      <Box fontWeight={'bold'}>
                        <Text as={'span'} color={'blue.400'}>
                          {formatNumberWithCommas(oversea.amount)}
                        </Text>
                        <Text as={'span'} color={'blue.400'}>
                          {' '}
                          {oversea.currencyCode}
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Flex>
              </>
            )
          })}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default OverseasHistoryForm
