import React, { useState } from 'react'
import BasicButton from '../components/basicButton/BasicButton'
import { Flex, Spacer, Text, HStack, Box, Image, Stack } from '@chakra-ui/react'
import bankImage from '../images/bank.svg'
import AccountBalance from '../components/accountBalance/AccountBalance'
import usaFlag from '../images/united-states-of-america.svg'
import europeFlag from '../images/europe.svg'
import japanFlag from '../images/japan.svg'
import AccountDetail from '../components/accountDetail/AccountDetail'

const Account = () => {
  const [selectedAccount, setSelectedAccount] = useState(null) // 클릭된 AccountBalance 정보 저장
  const handleAccountBalanceClick = (country) => {
    setSelectedAccount(country)
  }
  const [hasAccount, setHasAccount] = useState(true)
  const [countries, setCountries] = useState([
    {
      flag: usaFlag,
      name: '미국달러',
      value: 60,
      unit: 'USD',
      details: [
        {
          date: '03.10',
          time: '03:30 pm',
          unit: '달러',
          sign: '$',
          exchangeRate: '1310',
          transactionMoney: '15.00',
          totalMoney: '60.00',
        },
        {
          date: '03.09',
          time: '12:30 pm',
          unit: '달러',
          sign: '$',
          exchangeRate: '1300',
          transactionMoney: '30.00',
          totalMoney: '45.00',
        },
        {
          date: '03.01',
          time: '17:30 pm',
          unit: '달러',
          sign: '$',
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
      details: [
        {
          date: '03.01',
          time: '17:30 pm',
          unit: '엔화',
          sign: '￥',
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
      details: [
        {
          date: '03.04',
          time: '07:30 am',
          unit: '유로',
          sign: '€',
          exchangeRate: '1270',
          transactionMoney: '15.00',
          totalMoney: '15.00',
        },
      ],
    },
  ])

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
          <Flex width={'60%'} direction={'column'}>
            <Box>
              <Text fontSize={'40px'} as="b" fontFamily={'Pretendard-bold'}>
                외화 계좌 개설하기
              </Text>
              <Text marginTop={'10px'} fontSize={'20px'}>
                서비스를 이용하기 위해서 계좌를 개설해야 합니다!
              </Text>
              <HStack marginTop={'10px'} fontSize={'20px'}>
                <Text>우리은행 x 서포트립 외화 계좌 개설을 통해</Text>{' '}
                <Text color="#2DCDCB">최대 환율 100%</Text>
                <Text>를 보장받으세요.</Text>
              </HStack>

              <Flex marginTop={'30px'}>
                <BasicButton
                  bgColor="#2DCDCB"
                  color="#ffffff"
                  size="sm"
                  variant="solid"
                  width={280}
                  height={70}
                  fontSize={18}
                  borderRadius={10}
                >
                  통장 개설하기
                </BasicButton>
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
            width={'30%'}
            direction={'column'}
            overflowY="auto"
            height="700px"
            css={{ '&::-webkit-scrollbar': { display: 'none' } }}
            border={'1px solid'}
            borderColor={'gray.100'}
            marginRight={20}
            marginTop={20}
            borderRadius={10}
            bgColor={'#fff'}
          >
            <Box borderBottom={'1px solid'} borderColor={'gray.100'}>
              <Text
                fontSize={20}
                pl={10}
                pt={5}
                pb={5}
                fontFamily={'Pretendard-SemiBold'}
                color={'gray.700'}
              >
                계좌잔액
              </Text>
            </Box>
            <Box borderRadius={10}>
              <Stack spacing={0}>
                {countries.map((country, idx) => (
                  <AccountBalance
                    key={idx} // 고유한 키값으로 사용
                    country={country}
                    isSelected={selectedAccount === country}
                    onClick={handleAccountBalanceClick}
                  />
                ))}
              </Stack>

              {/* 내 계좌 정보 표시 */}
            </Box>
          </Flex>

          <Flex
            width={'70%'}
            border={'1px solid'}
            borderColor={'gray.100'}
            height={700}
            borderRadius={10}
            marginTop={20}
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
                selectedAccount.details.map((detail, idx) => (
                  <Box
                    borderBottom={'1px solid'}
                    borderColor={'gray.100'}
                    key={idx}
                  >
                    <AccountDetail detail={detail} />
                  </Box>
                ))
              ) : (
                <Text m={30}>내역을 보고싶은 계좌를 선택하세요</Text>
              )}
            </Stack>
          </Flex>
        </Flex>
      </>
    )
  }

  return <>{hasAccount ? renderAccountExists() : renderNoAccount()}</>
}

export default Account
