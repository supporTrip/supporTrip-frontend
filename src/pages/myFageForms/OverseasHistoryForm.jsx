import { Box, Flex } from '@chakra-ui/react'
import axios from 'axios'
import { format, subYears } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAccessToken } from '../../utils/tokenStore'
import LoadingPage from '../LoadingPage'

const BASE_URL = import.meta.env.VITE_BASE_URL

const dummyRanking = [
  { rank: 1, countryName: '미국', count: 2 },
  { rank: 2, countryName: '일본', count: 1 },
  { rank: 3, countryName: '중국', count: 1 },
]
const dummyHistory = [
  { id: 1, code: 'US', countryName: '미국', departDate: '2022-01-11' },
  { id: 2, code: 'JP', countryName: '일본', departDate: '2021-08-08' },
]

const toDate = format(new Date(), 'yyyy-MM-dd')
const fromDate = format(subYears(toDate, 3), 'yyyy-MM-dd')

const OverseasHistoryForm = () => {
  const navigate = useNavigate()
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
        setOverseas(data.overseas)
        setIsLoading(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return isLoading ? (
    <LoadingPage></LoadingPage>
  ) : (
    <Flex>
      {ranking.map((rank, idx) => {
        return <Flex key={idx}>{rank}</Flex>
      })}
      {overseas.map((oversea, idx) => {
        return (
          <Flex key={idx} direction={'column'}>
            <Box>{oversea.id}</Box>
            <Box>{oversea.code}</Box>
            <Box>{oversea.countryName}</Box>
            <Box>{oversea.departDate}</Box>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default OverseasHistoryForm
