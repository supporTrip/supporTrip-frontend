import React from 'react'
import { Link } from 'react-router-dom'
import BasicButton from '../components/basicButton/BasicButton'
import { Flex, Spacer, Text, HStack, Box, Image} from '@chakra-ui/react'
import accountImge from '../images/accountIcon.svg'
import bankImage from '../images/bank.svg'

const Account = () => {
  return (
    <>
      <Flex width={'100%'} height={'750px'} justifyContent={'center'} alignItems={'center'} bgColor='gray.100'>

        <Flex width={'60%'} direction={'column'} alignItems={'center'}>
          <Box>
            <Text fontSize={'30px'} as='b'>외화 계좌 개설하기</Text>
            <Text marginTop={'10px'}>서비스를 이용하기 위해서 계좌를 개설해야 합니다!</Text>
            <HStack marginTop={'10px'}>
              <Text>우리은행 x 서포트립 외화 계좌 개설을 통해</Text> <Text color='#2DCDCB'>최대 환율 100%</Text><Text>를 보장받으세요.</Text>
            </HStack>

            <Flex marginTop={'30px'}>
                <BasicButton bgColor = '#2DCDCB' color = '#ffffff' size = 'sm' variant = 'solid'
              width = {280} height = {70} fontSize = {18} borderRadius = {10}>
                통장 개설하기</BasicButton>
                <Spacer />
            </Flex>  
          </Box>
        </Flex>

        <Flex width={'40%'}>
          <Box width={'50%'}>
            <Flex width={'350px'} height={'350px'} borderRadius={'100%'} border={'solid'} justifyContent={'center'} alignItems={'center'} bgColor='gray.200' color='gray.200'>
              <Image src={bankImage} boxSize={'220px'} borderRadius={10}></Image>
            </Flex>
          </Box>
        </Flex>
        

      </Flex>
    </>
  )
}

export default Account
