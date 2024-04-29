import { Flex, Spacer, Text } from '@chakra-ui/react'
import React from 'react'
import PointTable from '../../components/cards/PointTable'

function PointHistoryForm({ data }) {
  const userData = data || { userTotalPoint: '0' }
  const details = data.details || []
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
          {details.map((dt, index) => {
            return (
              <PointTable
                key={index}
                transactionDate={dt.transactionDate}
                detail={dt.detail}
                type={dt.type}
                point={dt.point}
                totalPoint={dt.totalPoint}
              />
            )
          })}
        </Flex>
      </Flex>
    </>
  )
}

export default PointHistoryForm
