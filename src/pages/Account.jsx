import React, { useState } from 'react'
import BasicButton from '../components/basicButton/BasicButton'
import { Flex, Spacer, Text, HStack, Box, Image, Stack } from '@chakra-ui/react'
import bankImage from '../images/bank.svg'
import AccountBalance from '../components/accountBalance/AccountBalance'

const Account = () => {
  const [hasAccount, setHasAccount] = useState(false)

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
          <Flex width={'60%'} direction={'column'} >
            <Box>
              <Text fontSize={'25px'} as="b" fontFamily={'Pretendard-bold'}>
                외화 계좌 개설하기
              </Text>
              <Text marginTop={'10px'} fontSize={'13px'}>
                서비스를 이용하기 위해서 계좌를 개설해야 합니다!
              </Text>
              <HStack marginTop={'10px'} fontSize={'13px'}>
                <Text>우리은행 x 서포트립 외화 계좌 개설을 통해</Text>{' '}
                <Text color="#2DCDCB">최대 환율 100%</Text>
                <Text>를 보장받으세요.</Text>http://localhost:5173/src/images/bank.svg
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
            width={'50%'}
            direction={'column'}
            alignItems={'center'}
            overflowY="auto"
            maxHeight="700px"
            css={{ '&::-webkit-scrollbar': { display: 'none' } }}
          >
            <Box border={'solid'} borderRadius={5} width={'70%'}>
              <Stack spacing={0}>
                <AccountBalance></AccountBalance>
                <AccountBalance></AccountBalance>
                <AccountBalance></AccountBalance>
                <AccountBalance></AccountBalance>
                <AccountBalance></AccountBalance>
                <AccountBalance></AccountBalance>
                <AccountBalance></AccountBalance>
                <AccountBalance></AccountBalance>
              </Stack>

              {/* 내 계좌 정보 표시 */}
            </Box>
          </Flex>

          <Flex width={'60%'} direction={'column'} alignItems={'center'}>
            <Box width={'50%'}>
              <Flex
                width={'350px'}
                height={'350px'}
                borderRadius={'100%'}
                border={'solid'}
                justifyContent={'center'}
                alignItems={'center'}
                bgColor="gray.200"
                color="gray.200"
              >
                <Image
                  src={bankImage}
                  boxSize={'220px'}
                  borderRadius={10}
                ></Image>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </>
    )
  }

  return <>{hasAccount ? renderAccountExists() : renderNoAccount()}</>
}

export default Account
