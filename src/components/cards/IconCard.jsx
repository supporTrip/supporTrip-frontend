import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Card,
  Stack,
  CardBody,
  Flex,
  Heading,
  Button,
  Image,
  Text,
} from '@chakra-ui/react'

function AccountBalance(props) {
  const { country, onClick, isSelected } = props
  const clickHandler = () => {}

  return (
    <>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow="hidden"
        variant="outline"
        alignItems={'center'}
        width={'100%'}
        height={100}
        onClick={() => onClick(country.name)} // 클릭 이벤트 핸들러 추가
        bgColor={isSelected ? 'gray.50' : 'white'}
        cursor={'pointer'} 
      >
        <Flex
          marginLeft={4}
          width={'50px'}
          height={'50px'}
          borderRadius={'100%'}
          border={'solid'}
          justifyContent={'center'}
          alignItems={'center'}
          bgColor="gray.200"
          color="gray.200"
        >
          <Image
            padding={'8px'}
            src={country.flag}
            boxSize={'90px'}
            alt="Caffe Latte"
          />
        </Flex>
        <Text fontSize={15} pl={5} color={isSelected ? '#2563EB' : 'black'} fontFamily={isSelected ? 'Pretendard-Bold' : 'Pretendard'}>{country.name}</Text>
      </Card>
    </>
  )
}

export default AccountBalance
