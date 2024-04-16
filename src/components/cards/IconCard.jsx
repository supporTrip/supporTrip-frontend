import { Card, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

function IconCard(props) {
  const { country, onClick, isSelected } = props
  const clickHandler = () => { }

  return (
    <>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow="hidden"
        variant="outline"
        alignItems={'center'}
        width={'100%'}
        height={100}
        onClick={() => {
          return onClick(country.name)
        }} // 클릭 이벤트 핸들러 추가
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
        <Text
          fontSize={15}
          pl={5}
          color={isSelected ? 'blue.600' : 'black'}
          fontWeight={isSelected && 'bold'}
        >
          {country.name}
        </Text>
      </Card>
    </>
  )
}

export default IconCard
