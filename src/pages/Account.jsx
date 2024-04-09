import {
  Box,
  Flex,
  HStack,
  Image,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import BasicButton from '../components/buttons/BasicButton'
import IconCard from '../components/cards/IconCard'
import TimelineCard from '../components/cards/TimelineCard'
import BasicModal from '../components/modals/BasicModal'
import arrowImg from '../images/arrow.svg'
import bankImage from '../images/bank.svg'
import europeFlag from '../images/europe.svg'
import japanFlag from '../images/japan.svg'
import logo from '../images/logo.svg'
import qrImage from '../images/qr.svg'
import usaFlag from '../images/united-states-of-america.svg'
import wooriLogo from '../images/wooriLogo.svg'

const Account = () => {
  const handleAccountBalanceClick = (selectedCountry) => {
    countries.map((country) => {
      if (country.name === selectedCountry) setSelectedAccount(country)
    })
  }
  const buttonClickHandler = () => {
    // 계좌 개설 프로세스
    // 우선은 그냥 개설 된거로 치고 계좌생긴거로 넘김
    setHasAccount(true)
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { selectedCountry, setSelectedCountry } = useState('미국달러')
  const [hasAccount, setHasAccount] = useState(false)
  const [countries, setCountries] = useState([
    {
      flag: usaFlag,
      name: '미국달러',
      value: 60,
      unit: 'USD',
      sign: '$',
      unitName: '달러',
      totalAmount: 200.0,
      averageRate: 1320.0,
      details: [
        {
          date: '03.10',
          time: '03:30 pm',
          exchangeRate: '1310',
          transactionMoney: '15.00',
          totalMoney: '60.00',
        },
        {
          date: '03.09',
          time: '12:30 pm',
          exchangeRate: '1300',
          transactionMoney: '30.00',
          totalMoney: '45.00',
        },
        {
          date: '03.01',
          time: '17:30 pm',
          exchangeRate: '1330',
          transactionMoney: '15.00',
          totalMoney: '15.00',
        },
        {
          date: '03.10',
          time: '03:30 pm',
          exchangeRate: '1310',
          transactionMoney: '15.00',
          totalMoney: '60.00',
        },
        {
          date: '03.09',
          time: '12:30 pm',
          exchangeRate: '1300',
          transactionMoney: '30.00',
          totalMoney: '45.00',
        },
        {
          date: '03.01',
          time: '17:30 pm',
          exchangeRate: '1330',
          transactionMoney: '15.00',
          totalMoney: '15.00',
        },
        {
          date: '03.10',
          time: '03:30 pm',
          exchangeRate: '1310',
          transactionMoney: '15.00',
          totalMoney: '60.00',
        },
        {
          date: '03.09',
          time: '12:30 pm',
          exchangeRate: '1300',
          transactionMoney: '30.00',
          totalMoney: '45.00',
        },
        {
          date: '03.01',
          time: '17:30 pm',
          exchangeRate: '1330',
          transactionMoney: '15.00',
          totalMoney: '15.00',
        },
      ],
    },
    {
      flag: japanFlag,
      name: '일본엔화',
      value: 2000,
      unit: 'JPY',
      sign: '￥',
      unitName: '엔화',
      totalAmount: 2000.0,
      averageRate: 890.0,
      details: [
        {
          date: '03.01',
          time: '17:30 pm',
          exchangeRate: '890',
          transactionMoney: '2000',
          totalMoney: '2000',
        },
      ],
    },
    {
      flag: europeFlag,
      name: '유럽유로',
      value: 15,
      unit: 'EUR',
      sign: '€',
      unitName: '유로',
      totalAmount: 150.0,
      averageRate: 1270.0,
      details: [
        {
          date: '03.04',
          time: '07:30 am',
          exchangeRate: '1270',
          transactionMoney: '15.00',
          totalMoney: '15.00',
        },
      ],
    },
  ])
  const [selectedAccount, setSelectedAccount] = useState(countries[0]) // 클릭된 AccountBalance 정보 저장

  // 계좌가 없을 때의 화면
  const renderNoAccount = () => {
    return (
      <>
        <Flex
          width={'100%'}
          height={'750px'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Flex width={'70%'} direction={'column'}>
            <Box>
              <Text fontSize={'40px'} as="b" fontFamily={'Pretendard-bold'}>
                외화 계좌 개설하기
              </Text>
              <Text marginTop={'10px'} fontSize={'18px'}>
                서비스를 이용하기 위해서 계좌를 개설해야 합니다!
              </Text>
              <HStack marginTop={'10px'} fontSize={'18px'}>
                <Text>우리은행 x 서포트립 외화 계좌 개설을 통해</Text>{' '}
                <Text color="main">최대 환율 100%</Text>
                <Text>를 보장받으세요.</Text>
              </HStack>

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
                  통장 개설하기
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
                    <Text fontFamily={'Pretendard-Semi-Bold'}>
                      웹에서는 계좌개설 서비스를 이용하실 수 없습니다.
                    </Text>
                    <Text fontFamily={'Pretendard-Semi-Bold'}>
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
            </Box>
          </Flex>

          <Flex width={'40%'} justifyContent={'right'}>
            <Flex
              width={'400px'}
              height={'400px'}
              borderRadius={'100%'}
              border={'solid'}
              justifyContent={'center'}
              alignItems={'center'}
              bgColor="gray.200"
              color="gray.200"
            >
              <Image
                src={bankImage}
                boxSize={'250px'}
                borderRadius={10}
              ></Image>
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
            borderRadius={10}
            bgColor={'white'}
          >
            <Box borderRadius={10}>
              <Stack spacing={0}>
                {countries.map((country, idx) => {
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
          <Flex width={'70%'} direction={'column'} height={700} marginTop={20}>
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
                fontFamily={'Pretendard-Bold'}
                letterSpacing={2}
              >
                {selectedAccount.totalAmount + ' ' + selectedAccount.unit}
              </Text>
              <Text color={'white'} fontSize={20}>
                {'평균환율 | ' + selectedAccount.averageRate}
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
                    fontFamily={'Pretendard-SemiBold'}
                    color={'gray.700'}
                  >
                    거래내역
                  </Text>
                </Box>
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
                          unit={selectedAccount.unitName}
                        />
                      </Box>
                    )
                  })
                ) : (
                  <Text m={30}>내역을 보고싶은 계좌를 선택하세요</Text>
                )}
              </Stack>
            </Flex>
          </Flex>
        </Flex>
      </>
    )
  }

  return <>{hasAccount ? renderAccountExists() : renderNoAccount()}</>
}

export default Account
