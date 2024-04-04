import React from 'react'
import Footer from './Footer'
import { Box, Flex } from '@chakra-ui/react'
import Navbar from '../navbar/Navbar'

const DefaultLayout = ({ hasNavbar = true, hasFooter = true, children }) => {
  return (
    <Flex
      width={'100%'}
      minHeight={'100%'}
      direction={'column'}
      alignItems={'center'}
    >
      {hasNavbar && (
        <Flex
          width={'100%'}
          justifyContent={'center'}
          borderBottom={'1px solid'}
          borderColor="gray.100"
        >
          <Navbar width={'60%'}></Navbar>
        </Flex>
      )}
      <Flex
        width={'100%'}
        minHeight={'100%'}
        justifyContent={'center'}
        bg={'bg.default'}
        flex={1}
      >
        <Box width="60%">{children}</Box>
      </Flex>
      {hasFooter && (
        <Flex
          width={'100%'}
          justifyContent={'center'}
          borderTop={'1px solid'}
          borderColor="gray.100"
          bgColor={'black.soft'}
          color={'white'}
        >
          <Footer width={'60%'}></Footer>
        </Flex>
      )}
    </Flex>
  )
}

export default DefaultLayout
