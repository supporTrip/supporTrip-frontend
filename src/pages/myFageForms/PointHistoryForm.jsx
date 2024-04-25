import { Box, Flex, Spacer, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import PointTable from '../../components/cards/PointTable'

function PointHistoryForm() {
  const [userData, setUserData] = useState({
    userTotalPoint: '10,000',
    details: [
      {
        transactionDate: '2024.03.15',
        detail: '리마인더 여행 포인트 입금',
        type: '+',
        point: '7,000',
        totalPoint: '10,000',
      },
      {
        transactionDate: '2024.03.15',
        detail: '포인트 사용',
        type: '-',
        point: '5,000',
        totalPoint: '3,000',
      },
      {
        transactionDate: '2024.03.15',
        detail: '회원가입 포인트 입금',
        type: '+',
        point: '8,000',
        totalPoint: '8,000',
      },
    ],
  })
  return (
    <>
      <Flex width="100%" flex={1} direction={'column'}>
        <Flex direction="column" flex={1}>
          <Flex alignItems="baseline" borderBottom="2px solid" pb={5}>
            <Flex width={300}>
              <Text
                fontSize={'xl'}
                mr={3}
                fontWeight={'bold'}
                letterSpacing={2}
              >
                포인트내역
              </Text>
            </Flex>
            <Spacer></Spacer>
            <Flex alignItems="baseline">
              <Text fontSize={'xs'} color={'gray.400'}>
                사용가능 포인트
              </Text>
              <Text
                fontSize={'xl'}
                mr={3}
                fontWeight={'bold'}
                letterSpacing={2}
                ml={5}
              >
                {userData.userTotalPoint}
              </Text>
            </Flex>
          </Flex>
          <PointTable
            transactionDate="일자"
            detail="내역"
            point="포인트"
            totalPoint="총 포인트"
            title={true}
          ></PointTable>
          {userData.details.map((data, index) => {
            return (
              <PointTable
                key={index}
                transactionDate={data.transactionDate}
                detail={data.detail}
                type={data.type}
                point={data.point}
                totalPoint={data.totalPoint}
              />
            )
          })}
        </Flex>
      </Flex>
    </>
  )
}

export default PointHistoryForm
