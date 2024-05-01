import { Box, Flex, Image, Text } from '@chakra-ui/react'
import axios from 'axios'
import { format, subYears } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Crown from '../../images/crown.png'
import { formatNumberWithCommas } from '../../utils/numberUtils'
import { getAccessToken } from '../../utils/tokenStore'
import LoadingPage from '../LoadingPage'

const BASE_URL = import.meta.env.VITE_BASE_URL

const dummyRanking = [
  { rank: 1, countryName: '미국', count: 5 },
  { rank: 2, countryName: '일본', count: 3 },
  { rank: 3, countryName: '중국', count: 1 },
  { rank: 4, countryName: '베트남', count: 1 },
  { rank: 5, countryName: '태국', count: 1 },
]
const dummyHistory = [
  { id: 1, code: 'US', countryName: '미국', departDate: '2022-01-11' },
  { id: 2, code: 'JP', countryName: '일본', departDate: '2021-08-08' },
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
          {formatNumberWithCommas(rank.count * 1000)} 원
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

  return isLoading ? (
    <LoadingPage></LoadingPage>
  ) : (
    <Flex direction={'column'} w={'100%'} overflowX={'hidden'}>
      <Box mt={5} mb={'80px'} fontSize={'20px'} fontWeight={'semibold'}>
        <Text as={'span'} color={'main'}>
          {user.name}
        </Text>
        님이 최근 3년간 해외에서 소비한 내역을 분석했어요
      </Box>
      <Flex w={'100%'} justifyContent={'space-between'} mb={'50px'} gap={10}>
        {topRankCard(
          ranking.find((rank) => {
            return rank.rank === 2
          }),
        )}
        {topRankCard(
          ranking.find((rank) => {
            return rank.rank === 1
          }),
        )}
        {topRankCard(
          ranking.find((rank) => {
            return rank.rank === 3
          }),
        )}
      </Flex>
      <Flex direction={'column'}>
        <Box mb={2} fontSize={'20px'} fontWeight={'semibold'}>
          소비 내역
        </Box>
        {overseas.map((oversea, idx) => {
          return (
            <Flex key={idx} fontSize={'18px'} my={2}>
              <Box>{oversea.countryName}</Box>
              <Box>{format(oversea.departDate, 'yyyy년 MM월 dd일')}</Box>
            </Flex>
          )
        })}
      </Flex>
    </Flex>
  )
}

export default OverseasHistoryForm
