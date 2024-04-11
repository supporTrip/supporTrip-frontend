import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const RadioCard = ({ width, height, title, desc, isSelected, onClick }) => {
  return (
    <Flex
      w={width}
      h={height}
      p={4}
      justifyContent="space-between"
      alignItems={'center'}
      border={'2px solid'}
      borderColor={isSelected ? 'main' : 'gray.100'}
      borderRadius={'10px'}
      cursor={'pointer'}
      onClick={onClick}
      _hover={!isSelected && { borderColor: 'gray.200' }}
    >
      <Box>
        <Text fontSize={'18px'} fontFamily={'pretendard-bold'}>
          {title}
        </Text>
        {desc.split('\n').map((d, idx) => {
          return <Text key={idx}>{d}</Text>
        })}
      </Box>
      <Box
        w={'15px'}
        h={'15px'}
        border={'4px solid'}
        borderColor={isSelected ? 'main' : 'gray.200'}
        borderRadius={'100%'}
      ></Box>
    </Flex>
  )
}

export default RadioCard
