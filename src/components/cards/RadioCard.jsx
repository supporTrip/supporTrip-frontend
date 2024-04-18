import { Box, Flex, Img, Text } from '@chakra-ui/react'
import React from 'react'

const RadioCard = ({
  width,
  height,
  imgSrc,
  title,
  subTitle,

  desc,
  isSelected,
  onClick,
}) => {
  return (
    <Flex
      minW={width}
      maxW={width}
      minH={height}
      maxH={height}
      p={4}
      justifyContent="space-between"
      alignItems={'center'}
      color={isSelected && 'mint.600'}
      bg={isSelected && 'mint.100'}
      border={'2px solid'}
      borderColor={isSelected ? 'main' : 'gray.100'}
      borderRadius={'10px'}
      cursor={'pointer'}
      onClick={onClick}
      _hover={!isSelected && { borderColor: 'gray.200' }}
    >
      <Box w={'100%'}>
        <Flex w={'100%'} justifyContent={'center'}>
          <Box>
            <Img src={imgSrc} w={'100px'}></Img>
          </Box>
        </Flex>
        <Text fontSize={'20px'} fontWeight={'bold'}>
          {title}
        </Text>
        <Text fontSize={'16px'}>{subTitle}</Text>
        {desc &&
          desc.split('\n').map((d, idx) => {
            return <Text key={idx}>{d}</Text>
          })}
      </Box>
      <Box
        alignSelf={'flex-start'}
        minW={'15px'}
        minH={'15px'}
        ml={2}
        border={'4px solid'}
        borderColor={isSelected ? 'main' : 'gray.200'}
        borderRadius={'100%'}
      ></Box>
    </Flex>
  )
}

export default RadioCard
