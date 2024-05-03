import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import InsuranceTable from '../../components/cards/InsuranceTable'
import LoadingPage from '../LoadingPage'

function InsuranceApplicationForm({ data }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // data가 비어있지 않으면 로딩 상태를 false로 변경
    if (data) {
      setIsLoading(false)
    }
  }, [data])
  const insuranceData = data.insuranceList || []

  return (
    <>
      {isLoading ? (
        <LoadingPage></LoadingPage>
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
