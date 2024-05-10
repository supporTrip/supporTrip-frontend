import { Box, Flex, Text } from '@chakra-ui/react'
import Lottie from 'lottie-react'
import React, { useEffect, useState } from 'react'
import Loading from '../../assets/lottie/mydata-loading.json'
import InsuranceTable from '../../components/cards/InsuranceTable'
import { useAuth } from '../../contexts/AuthContext'
import LoadingPage from '../LoadingPage'

function InsuranceApplicationForm({ data }) {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // data가 비어있지 않으면 로딩 상태를 false로 변경
    const timer = setTimeout(() => {
      if (data && data.insuranceList && data.insuranceList.length > 0) {
        setIsLoading(false)
      }
    }, 3000)

    return () => {
      return clearTimeout(timer)
    }
  }, [data])
  const insuranceData = data.insuranceList || []

  return (
    <>
      {isLoading ? (
        <LoadingPage>
          <Flex
            w={'100%'}
            h={'100%'}
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Box fontSize={'25px'}>
              <Text as={'span'} color={'main'}>
                {user.name}
              </Text>
              <Text as={'span'}>님의 마이데이터를 꼼꼼히 확인하고 있어요</Text>
            </Box>
            <Box fontSize={'20px'} color={'gray.400'}>
              잠시만 기다려주세요
            </Box>
            <Box w={'300px'} mt={'100px'}>
              <Lottie animationData={Loading} />
            </Box>
          </Flex>
        </LoadingPage>
      ) : (
        <Flex width="100%" flex={1} direction={'column'}>
          <Flex direction="column" flex={1}>
            <Flex alignItems="baseline" borderBottom="2px solid" pb={5}>
              <Box width={300}>
                <Text
                  fontSize={'xl'}
                  mr={3}
                  fontWeight={'bold'}
                  letterSpacing={2}
                >
                  보험신청내역
                </Text>
              </Box>
            </Flex>
            <InsuranceTable
              issueDate="발행일자"
              corporationName="보험사"
              name="보험상품명"
              faceAmt="보험금액"
              status="상태"
              title={true}
            />
            {insuranceData.map((insurance, index) => {
              return (
                <InsuranceTable
                  key={index}
                  issueDate={insurance.issueDate}
                  corporationName={insurance.corporationName}
                  name={insurance.name}
                  faceAmt={insurance.faceAmt}
                  status={insurance.status}
                />
              )
            })}
          </Flex>
        </Flex>
      )}
    </>
  )
}

export default InsuranceApplicationForm
