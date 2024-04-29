import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TicketCard from '../components/cards/TicketCard'
import ClickCursor from '../images/click-cursor.svg'
import { getAccessToken } from '../utils/tokenStore'
import LoadingPage from './LoadingPage'

const BASE_URL = import.meta.env.VITE_BASE_URL

const Exchange = () => {
  const navigate = useNavigate()
  const [inProgressExchanges, setInProgressExchanges] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const accessToken = getAccessToken()

  useEffect(() => {
    fetchExchangeInfo()
  }, [isLoading])

  const fetchExchangeInfo = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/exchange/in-progress`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )

      if (response.status === 200) {
        const data = response.data
        setInProgressExchanges(data.inProgressExchanges)
        setIsLoading(false)
      }
    } catch (error) {
      if (error.response.status === 403) {
        alert(
          '환전을 위해 외화 계좌가 필요해요.\n계좌 생성 페이지로 이동할게요.',
        )
        navigate('/account')
        return
      }

      if (error.response.status >= 400 && error.response.status < 600) {
        alert('알 수 없는 에러가 발생했습니다.\n잠시 후에 다시 시도해주세요.')
        console.error(error)
        navigate('/')
      }
    }
  }

  const transactionTickets = (
    <Box w={'70%'}>
      {inProgressExchanges.map((exchange, idx) => {
        return (
          <TicketCard
            key={idx}
            displayName={exchange.displayName}
            tradingAmount={exchange.tradingAmount}
            targetCurrency={exchange.targetCurrency}
            targetCurrencyCode={exchange.targetCurrencyCode}
            targetCountry={exchange.targetCountry}
            strategy={exchange.strategy}
            targetExchangeRate={exchange.targetExchangeRate}
            beganDate={exchange.beganDate}
            completeDate={exchange.completeDate}
          />
        )
      })}
    </Box>
  )

  const blankInfo = (
    <Flex
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      w={'70%'}
      height={'400px'}
      bg={'gray.50'}
      border={'1px dashed'}
      borderColor={'gray.300'}
      borderRadius={10}
      onClick={() => {
        return navigate('/new-exchange')
      }}
      cursor={'pointer'}
    >
      <Image src={ClickCursor}></Image>
      <Box color={'black.soft'} textAlign={'center'} mt={4}>
        <Text>환전 중인 거래 내역이 없어요.</Text>
        <Text>클릭해서 환전을 시작할 수 있어요.</Text>
      </Box>
    </Flex>
  )

  return (
    <>
      {isLoading ? (
        <LoadingPage></LoadingPage>
      ) : (
        <Flex
          mt={'30px'}
          direction={'column'}
          alignItems={'center'}
          color={'black.soft'}
        >
          <Flex w={'70%'} alignItems={'center'} mb={'30px'}>
            <Text mr={'15px'} fontSize={'20px'} fontWeight={'590'}>
              환전 거래 내역
            </Text>
            <Button
              padding={'5px10px'}
              bg={'blue.50'}
              color={'blue.600'}
              fontWeight={'normal'}
              onClick={() => {
                navigate('/new-exchange')
              }}
            >
              시작하기
            </Button>
          </Flex>
          {inProgressExchanges.length === 0 ? blankInfo : transactionTickets}
        </Flex>
      )}
    </>
  )
}
export default Exchange
