import { Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import MyInfoForm from './myFageForms/MyInfoForm'
import PointHistoryForm from './myFageForms/PointHistoryForm'
import ExchangeHistoryForm from './myFageForms/ExchangeHistoryForm'
import InsuranceApplicationForm from './myFageForms/InsuranceApplicationForm'

const MyPage = () => {
  const [selectedMenu, setSelectedMenu] = useState('내정보')
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu)
  }

  const getContentComponent = () => {
    switch (selectedMenu) {
      case '내정보':
        return <MyInfoForm />
      case '포인트내역':
        return <PointHistoryForm />
      case '환전거래내역':
        return <ExchangeHistoryForm />
      case '보험신청내역':
        return <InsuranceApplicationForm />
      default:
        return null
    }
  }
  return (
    <>
      <Flex
        width={'100%'}
        height={'100%'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Flex
          width={'25%'}
          direction={'column'}
          overflowY="auto"
          height="700px"
          css={{ '&::-webkit-scrollbar': { display: 'none' } }}
          borderRight={'1px solid'}
          borderColor={'gray.100'}
          marginRight={20}
          align={'left'}
        >
          <Text ml={10} fontSize={'xl'} fontWeight={'bold'} letterSpacing={2}>
            마이페이지
          </Text>
          {['내정보', '포인트내역', '환전거래내역', '보험신청내역'].map(
            (menu, index) => {
              return (
                <Text
                  key={index}
                  ml={10}
                  mt={8}
                  fontSize={'md'}
                  color={selectedMenu === menu ? 'main' : 'black'}
                  fontWeight={selectedMenu === menu ? 'bold' : 'normal'}
                  onClick={() => {
                    return handleMenuClick(menu)
                  }}
                  cursor="pointer"
                >
                  {menu}
                </Text>
              )
            },
          )}
        </Flex>
        <Flex width={'75%'} height="700px" overflowY="auto">
          {getContentComponent()}
        </Flex>
      </Flex>
    </>
  )
}

export default MyPage
