import React from 'react'
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react'

const TicketCard = ({
  title,
  originCash,
  originCurrency,
  exchangeCash,
  exchangeCurrency,
  originCentury,
  exchangeCentury,
  ticket,
  type,
  createdAt,
  endDate,
}) => {
  return (
    <Grid
      minWidth={'700px'}
      templateColumns={'2fr 1fr'}
      border={'1px solid'}
      borderTop={0}
      borderBottom={0}
      borderColor={'gray.200'}
      borderRadius={'8px'}
      // fontFamily={'pretendard-bold'}
      mb={'30px'}
    >
      <Text
        p={4}
        bg={'blue.400'}
        color={'white'}
        borderRight={'1.5px dashed'}
        borderColor={'gray.200'}
        borderTopRadius={'8px'}
      >
        {title}
      </Text>
      <Text
        p={4}
        bg={'blue.400'}
        color={'white'}
        borderTopRadius={'8px'}
        align={'right'}
      >
        {createdAt}
      </Text>
      <Flex p={4} borderRight={'1.5px dashed'} borderColor={'gray.300'}>
        <Box flex={1}>
          <Text>원금</Text>
          <Box>
            <Text as="span">{originCash}</Text>
            <Text as="span">{originCurrency}</Text>
          </Box>
        </Box>
        <Box flex={1}>
          <Text>환전금</Text>
          <Box>
            <Text as="span">{exchangeCash}</Text>
            <Text as="span">{exchangeCurrency}</Text>
          </Box>
        </Box>
      </Flex>
      <Box p={4}>
        <Text>티켓번호</Text>
        <Text>{ticket}</Text>
      </Box>
      <Flex p={4} borderRight={'1.5px dashed'} borderColor={'gray.300'}>
        <Box flex={1}>
          <Text>기준 국가</Text>
          <Text>{originCentury}</Text>
        </Box>
        <Box flex={1}>
          <Text>대상 국가</Text>
          <Text>{exchangeCentury}</Text>
        </Box>
      </Flex>
      <Box p={4}>
        <Text>거래 유형</Text>
        <Text>{type}</Text>
      </Box>
      <GridItem
        p={4}
        alignSelf={'center'}
        borderRight={'1.5px dashed'}
        borderColor={'gray.300'}
      >
        <Slider
          defaultValue={30}
          isReadOnly={true}
          isDisabled={true}
          cursor={'default'}
          focusThumbOnChange={'false'}
        >
          <SliderTrack bg="blue.100">
            <SliderFilledTrack bg="blue.300" />
          </SliderTrack>
          <SliderThumb boxSize={1} border={0}>
            <Box>{/* <Image src={Logo}></Image> */}</Box>
          </SliderThumb>
        </Slider>
      </GridItem>
      <Box p={2} pl={4}>
        <Text>거래 기간</Text>
        <Text>
          {createdAt} ~ {endDate}
        </Text>
      </Box>
      <Box
        height={'40px'}
        bg={'blue.400'}
        borderRight={'1.5px dashed'}
        borderColor={'gray.200'}
        borderBottomRadius={'8px'}
      ></Box>
      <Box bg={'blue.400'} borderBottomRadius={'8px'}></Box>
    </Grid>
  )
}

export default TicketCard
