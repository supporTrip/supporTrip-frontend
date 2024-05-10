import { Box, Button, Flex, Image, Skeleton, Text } from '@chakra-ui/react'
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
      height={'500px'}
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

  const cardSkeleton = (cnt) => {
    return Array(cnt)
      .fill()
      .map((_, idx) => {
        return (
          <Flex
            key={idx}
            minWidth={'750px'}
            maxW={'750px'}
            minH={'260px'}
            mb={'60px'}
          >
            <Flex
              flex={2}
              direction={'column'}
              border={'1px solid'}
              borderColor={'gray.100'}
              borderRadius={'8px'}
              borderRight={'1.8px dashed'}
              borderRightColor={'gray.300'}
            >
              <Skeleton borderTopRadius={'8px'}>
                <Flex h={'48px'} alignItems={'center'} px={4}></Flex>
              </Skeleton>
              <Flex
                flex={3}
                direction={'column'}
                justifyContent={'center'}
                p={4}
                position={'relative'}
                gap={4}
              >
                <Skeleton
                  borderRadius={'8px'}
                  width={'100px'}
                  height={'25px'}
                ></Skeleton>
                <Skeleton
                  borderRadius={'8px'}
                  width={'100%'}
                  height={'25px'}
                ></Skeleton>
              </Flex>
              <Skeleton borderBottomRadius={'8px'}>
                <Flex
                  minH={'38px'}
                  px={4}
                  justifyContent={'center'}
                  alignItems={'center'}
                  color={'white'}
                  bgColor={'blue.400'}
                  borderBottomRadius={'8px'}
                  gap={1}
                >
                  <Box>거래 종료까지</Box>
                  <Box color={'blue.800'}>D-Day</Box>
                  <Box>남았어요 종료되면 SMS으로 알려드릴게요</Box>
                </Flex>
              </Skeleton>
            </Flex>
            <Flex
              flex={1}
              direction={'column'}
              border={'1px solid'}
              borderColor={'gray.100'}
              borderRadius={'8px'}
              borderLeft={0}
            >
              <Skeleton borderTopRadius={'8px'}>
                <Flex h={'48px'} px={4}></Flex>
              </Skeleton>
              <Flex
                flex={3}
                direction={'column'}
                p={4}
                justifyContent={'space-between'}
                gap={2}
              >
                <Skeleton
                  borderRadius={'8px'}
                  width={'120px'}
                  height={'25px'}
                ></Skeleton>
                <Skeleton
                  borderRadius={'8px'}
                  width={'110px'}
                  height={'25px'}
                ></Skeleton>
                <Skeleton
                  borderRadius={'8px'}
                  width={'100px'}
                  height={'25px'}
                ></Skeleton>
              </Flex>
              <Skeleton borderBottomRadius={'8px'}>
                <Flex minH={'38px'} px={4}></Flex>
              </Skeleton>
            </Flex>
          </Flex>
        )
      })
  }
  return (
    <>
      {isLoading ? (
        <LoadingPage>
          {/* <Lottie animationData={Airplane} /> */}
          <Flex
            mt={'80px'}
            direction={'column'}
            alignItems={'center'}
            w={'100%'}
            h={'100%'}
          >
            <Flex w={'70%'} alignItems={'center'} mb={'30px'}>
              <Skeleton
                minW={'100px'}
                minH="25px"
                isLoaded={false}
                mr={'15px'}
              />
              <Skeleton minW={'80px'} minH="25px" isLoaded={false} />
            </Flex>
            <Box w={'70%'}>
              {/* <Skeleton mb={'60px'} borderRadius={'8px'}>
                <Flex
                  minWidth={'750px'}
                  maxW={'750px'}
                  minH={'260px'}
                  mb={'60px'}
                ></Flex>
              </Skeleton> */}
              {cardSkeleton(2)}
            </Box>
          </Flex>
        </LoadingPage>
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
