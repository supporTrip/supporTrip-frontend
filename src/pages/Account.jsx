import { CloseIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Image,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useAnimation } from '@codechem/chakra-ui-animations'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useNavigate } from 'react-router-dom'
import BasicButton from '../components/buttons/BasicButton'
import IconCard from '../components/cards/IconCard'
import TimelineCard from '../components/cards/TimelineCard'
import BasicModal from '../components/modals/BasicModal'
import arrowImg from '../images/arrow.svg'
import bankImage from '../images/bank.svg'
import logo from '../images/logo.svg'
import qrImage from '../images/qr.svg'
import wooriLogo from '../images/wooriLogo.svg'
import { generateAccountNumber } from '../utils/numberUtils'
import { getAccessToken } from '../utils/tokenStore'
import LoadingPage from './LoadingPage'

const BASE_URL = import.meta.env.VITE_BASE_URL

const Account = () => {
  const animation = useAnimation('swing', {
    duration: 2000,
    iterationCount: 3,
  })

  const handleAccountBalanceClick = (selectedCountry) => {
    accountInfo.map((country) => {
      if (country.name === selectedCountry) setSelectedAccount(country)
    })
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [accountInfo, setAccountInfo] = useState([])
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [hasAccount, setHasAccount] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const accessToken = getAccessToken()

  useEffect(() => {
    if (!accessToken) {
      alert('로그인 정보가 없습니다. 로그인 페이지로 이동합니다.')
      navigate('/')
      return
    }

    fetchAccountInfo()
  }, [accessToken, navigate])

  const fetchAccountInfo = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/accounts/details`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      if (response.status === 200) {
        setIsLoading(true)
        const data = response.data
        setHasAccount(data.hasAccount)
        setAccountInfo(data.accountInfo)
        if (accountInfo) setSelectedAccount(data.accountInfo[0])
      } else {
        console.error('api 요청 실패')
      }
    } catch (error) {
      if (error.response.status >= 400 && error.response.status < 600) {
        alert('로그인 정보를 불러오는데 실패했습니다. 다시 로그인해주세요.')
        navigate('/')
      }
      console.error(error)
    }
  }

  const buttonClickHandler = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/accounts/foreign`,
        {
          bankName: '우리은행',
          accountNumber: generateAccountNumber(),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      if (response.status === 200) {
        alert('새로운 외화 계좌가 개설되었습니다.')
        fetchAccountInfo()
      } else {
        console.error('api 요청 실패')
      }
    } catch (error) {
      console.error('Failed to create new foreign account:', error)
    }
  }

  // 계좌가 없을 때의 화면
  const renderNoAccount = () => {
    return (
      <>
        <Flex
          width={'100%'}
          height={'100%'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Flex minW={'70%'} direction={'column'}>
            <Text fontSize={'40px'} as="b" fontWeight={'bold'}>
              외화 계좌 개설하기
            </Text>
            <Text marginTop={'10px'} fontSize={'18px'}>
              서비스를 이용하기 위해서 외화 계좌가 필요해요.
            </Text>
            <Flex
              minW={'100%'}
              marginTop={'10px'}
              fontSize={'18px'}
              alignItems={'center'}
              gap={1}
            >
              <Text flexShrink={0} color={'#0082CE'} fontWeight={'bold'}>
                우리은행
              </Text>
              <CloseIcon flexShrink={0} boxSize={2}></CloseIcon>
              <Text flexShrink={0} color="main" fontWeight={'bold'}>
                서포트립
              </Text>
              <Text flexShrink={0}>외화 계좌 개설을 통해</Text>
              <Text flexShrink={0} mx={2} fontWeight={'bold'} fontSize={'22px'}>
                최대 환율 100%
              </Text>
              <Text flexShrink={0}>를 보장받을 수 있어요.</Text>
            </Flex>

            <Flex marginTop={'30px'}>
              <BasicButton
                bgColor="main"
                color="white"
                size="sm"
                width={280}
                height={70}
                fontSize={18}
                onClick={onOpen}
              >
                개설하러가기
              </BasicButton>
              <BasicModal
                isOpen={isOpen}
                onClose={onClose}
                title="비대면 계좌 개설"
                buttonName="개설완료"
                onClick={buttonClickHandler}
                buttonColor="blue.50"
                buttonTextColor="blue.600"
              >
                <Flex direction={'column'} alignItems={'center'}>
                  <Text fontWeight={'SemiBold'}>
                    웹에서는 계좌개설 서비스를 이용하실 수 없습니다.
                  </Text>
                  <Text fontWeight={'SemiBold'}>
                    모바일에서 QR코드 스캔을 통해 이어서 진행해주세요.
                  </Text>
                  <Image p={7} src={qrImage}></Image>
                  <Flex>
                    <Flex direction={'column'} alignItems={'center'}>
                      <Image src={logo} boxSize={90}></Image>
                      <Text pt={5}>서포트립</Text>
                    </Flex>
                    <Image p={3} src={arrowImg}></Image>
                    <Flex direction={'column'} alignItems={'center'}>
                      <Image src={wooriLogo} boxSize={100}></Image>
                      <Text pt={2}>우리은행</Text>
                    </Flex>
                  </Flex>
                  <Text pt={5} pb={2} fontSize={11} color={'gray.500'}>
                    우리은행 모바일 인증 페이지로 이동합니다
                  </Text>
                </Flex>
              </BasicModal>
              <Spacer />
            </Flex>
          </Flex>

          <Flex minW={'40%'} justifyContent={'right'}>
            <Flex
              minW={'400px'}
              minH={'400px'}
              borderRadius={'100%'}
              border={'solid'}
              justifyContent={'center'}
              alignItems={'center'}
              bgColor="gray.200"
              color="gray.200"
            >
              <Image src={bankImage} w={'250px'} animation={animation}></Image>
            </Flex>
          </Flex>
        </Flex>
      </>
    )
  }

  // 계좌가 있을 때의 화면
  const renderAccountExists = () => {
    return (
      <>
        <Flex
          width={'100%'}
          height={740}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Flex
            width={'20%'}
            direction={'column'}
            overflowY="auto"
            height="700px"
            css={{ '&::-webkit-scrollbar': { display: 'none' } }}
            border={'1px solid'}
            borderColor={'gray.100'}
            marginRight={20}
            marginTop={20}
            marginBottom={10}
            borderRadius={10}
            bgColor={'white'}
          >
            <Box borderRadius={10}>
              <Stack spacing={0}>
                {accountInfo.map((country, idx) => {
                  return (
                    <IconCard
                      key={idx} // 고유한 키값으로 사용
                      country={country}
                      isSelected={selectedAccount === country}
                      onClick={handleAccountBalanceClick}
                    />
                  )
                })}
              </Stack>

              {/* 내 계좌 정보 표시 */}
            </Box>
          </Flex>
          <Flex
            width={'70%'}
            direction={'column'}
            height={700}
            marginTop={20}
            marginBottom={10}
          >
            <Flex
              width={'100%'}
              border={'1px solid'}
              borderColor={'blue.400'}
              overflowY="auto"
              height="400px"
              borderRadius={10}
              bgColor={'blue.400'}
              justifyContent={'center'}
              alignItems={'center'}
              direction={'column'}
            >
              <Text color={'white'} fontSize={23}>
                총 잔액
              </Text>
              <Text
                color={'white'}
                fontSize={40}
                fontWeight={'bold'}
                letterSpacing={2}
              >
                {selectedAccount.totalAmount + ' ' + selectedAccount.unitName}
              </Text>
              <Text color={'white'} fontSize={20}>
                {selectedAccount.averageRate === 'NaN'
                  ? ''
                  : '평균환율 | ' + selectedAccount.averageRate}
              </Text>
            </Flex>

            <Flex
              width={'100%'}
              border={'1px solid'}
              borderColor={'gray.100'}
              overflowY="auto"
              height="700px"
              borderRadius={10}
              marginTop={5}
              bgColor={'white'}
            >
              <Stack width={'100%'}>
                <Box borderBottom={'1px solid'} borderColor={'gray.100'}>
                  <Text
                    fontSize={20}
                    pl={10}
                    pt={5}
                    pb={5}
                    fontWeight={'SemiBold'}
                    color={'gray.700'}
                  >
                    거래내역
                  </Text>
                </Box>
                <Scrollbars>
                  {selectedAccount ? (
                    selectedAccount.details.map((detail, idx) => {
                      return (
                        <Box
                          borderBottom={'1px solid'}
                          borderColor={'gray.100'}
                          key={idx}
                        >
                          <TimelineCard
                            detail={detail}
                            sign={selectedAccount.sign}
                            unit={selectedAccount.name}
                          />
                        </Box>
                      )
                    })
                  ) : (
                    <Text m={30}>내역을 보고싶은 계좌를 선택하세요</Text>
                  )}
                </Scrollbars>
              </Stack>
            </Flex>
          </Flex>
        </Flex>
      </>
    )
  }

  return (
    <>
      {isLoading ? (
        hasAccount && !accountInfo ? (
          <Box>거래를 시작하세요</Box>
        ) : hasAccount ? (
          renderAccountExists()
        ) : (
          renderNoAccount()
        )
      ) : (
        <LoadingPage></LoadingPage>
      )}
    </>
  )
}

export default Account
