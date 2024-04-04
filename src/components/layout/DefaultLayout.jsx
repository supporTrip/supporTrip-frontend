import React from 'react'
import Footer from './Footer'
import { Box, Flex } from '@chakra-ui/react'
import Navbar from '../navbar/Navbar'

const DefaultLayout = ({ hasNavbar = true, hasFooter = true, children }) => {

  return (
    <Flex width={'100%'} height={'100%'} direction={'column'} alignItems={'center'}>
      {hasNavbar &&
        <Flex width={'100%'} justifyContent={'center'} borderBottom={'1px solid'} borderColor="gray.100">
          <Navbar width={'60%'}></Navbar>
        </Flex>
      }
      <Box width="60%">
        {children}
      </Box>
      {hasFooter &&
        <Flex width={'100%'} justifyContent={'center'} borderTop={'1px solid'} borderColor="gray.100" bgColor={'gray.100'}>
          <Footer width={'60%'}></Footer>
        </Flex>}
    </Flex>
  )
}

export default DefaultLayout