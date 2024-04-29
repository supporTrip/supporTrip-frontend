import { Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import InsurancesAdminForm from './admin/InsurancesAdminForm'
import UserAdminForm from './admin/UserAdminForm'

const Admin = () => {
  const [selectedMenu, setSelectedMenu] = useState('회원 관리')
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu)
  }

  const getContentComponent = () => {
    switch (selectedMenu) {
      case '회원 관리':
        return <UserAdminForm />
      case '보험 관리':
        return <InsurancesAdminForm />
      default:
        return '회원 관리'
    }
  }
  return (
    <>
      <Flex
        width={'100%'}
        height={'100%'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mt={5}
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
            관리자페이지
          </Text>
          {['회원 관리', '보험 관리'].map((menu, index) => {
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
          })}
        </Flex>
        <Flex width={'75%'} height="700px" overflowY="auto">
          {getContentComponent()}
        </Flex>
      </Flex>
    </>
  )
}

export default Admin
