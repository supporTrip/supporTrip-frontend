import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../images/logo-gray.svg'

const Footer = ({ width = '100%' }) => {
  return (
    <Box width={width} py={'25px'} color={'gray.200'}>
      <Flex gap={6} fontSize={'15px'} alignItems={'center'}>
        <Flex flexShrink={0} alignItems={'center'}>
          <Box>
            <Image src={Logo} w={'25px'} color={'gray.100'}></Image>
          </Box>
          <Text alignItems={'center'} ml={'2px'} fontSize={'19px'}>
            서포트립
          </Text>
        </Flex>
        <Link to={''}>서비스이용약관</Link>
        <Link to={''}>개인정보처리방침</Link>
        <Link to={''}>오픈뱅킹 서비스 이용약관</Link>
        <Link to={''}>마이데이터 서비스 이용약관</Link>
      </Flex>
    </Box>
  )
}

export default Footer
