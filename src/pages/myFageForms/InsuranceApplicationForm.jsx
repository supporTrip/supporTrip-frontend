import { Flex, Text, Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import InsuranceTable from '../../components/cards/InsuranceTable'

function InsuranceApplicationForm() {
  const [userData, setUserData] = useState([
    {
      issueDate: '2024.03.15',
      corporationName: '한화손해보험',
      name: '한화 여행자보험',
      faceAmt: '9,000원',
      status: '신청중',
    },
    {
      issueDate: '2024.02.10',
      corporationName: '삼성화재',
      name: '혜택모두 여행자보험ㅁㅁㅁㅁ',
      faceAmt: '21,000원',
      status: '정상',
    },
    {
      issueDate: '2024.01.11',
      corporationName: '메리츠화재',
      name: '메리츠 실속 여행자보험',
      faceAmt: '5,000원',
      status: '만기',
    },
    {
      issueDate: '2024.01.11',
      corporationName: 'AXA손해보험',
      name: '메리츠 실속 여행자보험',
      faceAmt: '5,000원',
      status: '만기',
    },
    {
      issueDate: '2024.01.11',
      corporationName: '메리츠화재',
      name: '메리츠 실속 여행자보험',
      faceAmt: '5,000원',
      status: '만기',
    },
    {
      issueDate: '2024.01.11',
      corporationName: '메리츠화재',
      name: '메리츠 실속 여행자보험',
      faceAmt: '5,000원',
      status: '만기',
    },
    {
      issueDate: '2024.01.11',
      corporationName: '메리츠화재',
      name: '메리츠 실속 여행자보험',
      faceAmt: '5,000원',
      status: '만기',
    },
    {
      issueDate: '2024.01.11',
      corporationName: '메리츠화재',
      name: '메리츠 실속 여행자보험',
      faceAmt: '5,000원',
      status: '만기',
    },
    {
      issueDate: '2024.01.11',
      corporationName: '메리츠화재',
      name: '메리츠 실속 여행자보험',
      faceAmt: '5,000원',
      status: '만기',
    },
    {
      issueDate: '2024.01.11',
      corporationName: '메리츠화재',
      name: '메리츠 실속 여행자보험',
      faceAmt: '5,000원',
      status: '만기',
    },
    {
      issueDate: '2024.01.11',
      corporationName: '메리츠화재',
      name: '메리츠 실속 여행자보험',
      faceAmt: '5,000원',
      status: '만기',
    },
  ])
  return (
    <>
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
            issueDate="신청일자"
            corporationName="보험사"
            name="보험이름"
            faceAmt="금액"
            status="상태"
            title={true}
          ></InsuranceTable>
          {userData.map((data, index) => {
            return (
              <InsuranceTable
                key={index}
                issueDate={data.issueDate}
                corporationName={data.corporationName}
                name={data.name}
                faceAmt={data.faceAmt}
                status={data.status}
              />
            )
          })}
        </Flex>
      </Flex>
    </>
  )
}

export default InsuranceApplicationForm
