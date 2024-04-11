import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import Logo from '../../images/logo.svg'

const Footer = ({ width = '100%' }) => {
  return (
    <Box
      width={width}
      justifyContent={'center'}
      padding={'20px'}
      color={'gray.200'}
    >
      <Flex gap={6} fontSize={'15px'} alignItems={'center'}>
        <Flex alignItems={'center'}>
          <Image src={Logo} w={'25px'} color={'gray.100'}></Image>
          <Text ml={'2px'} fontSize={'19px'}>
            서포트립
          </Text>
        </Flex>
        <Text>서비스이용약관</Text>
        <Text>개인정보처리방침</Text>
        <Text>오픈뱅킹 서비스 이용약관</Text>
        <Text>마이데이터 서비스 이용약관</Text>
      </Flex>
    </Box>
  )
}

export default Footer
