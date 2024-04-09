import {
  Box,
  Flex,
  Grid,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react'
import React from 'react'

const TicketCard = ({
  title,
  originCash,
  originCurrency,
  exchangeCash,
  remainCash,
  exchangeCurrency,
  originCentury,
  exchangeCentury,
  ticket,
  type,
  createdAt,
  endDate,
}) => {
  const lineStyles = {
    borderRight: '1.5px dashed',
    borderColor: 'gray.300',
  }

  const contentStyles = {
    fontSize: '17px',
  }

  const labelStyles = {
    mt: '14px',
    fontSize: '16px',
    textAlign: 'left',
  }

  const percentage = Math.floor(
    (Number(originCash - remainCash) / Number(originCash)) * 100,
  )

  return (
    <Grid
      minWidth={'700px'}
      templateColumns={'2fr 1fr'}
      border={'1px solid'}
      borderTop={0}
      borderBottom={0}
      borderColor={'gray.200'}
      borderRadius={'8px'}
      mb={'30px'}
    >
      <Text
        p={4}
        bg={'blue.400'}
        color={'white'}
        borderTopRadius={'8px'}
        {...lineStyles}
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
      <Flex p={4} bg={'white'} {...lineStyles}>
        <Box flex={1}>
          <Text>원금</Text>
          <Box>
            <Text as="span" {...contentStyles}>
              {originCash}
            </Text>
            <Text as="span">{originCurrency}</Text>
          </Box>
        </Box>
        <Box flex={1}>
          <Text>환전금</Text>
          <Box>
            <Text as="span" {...contentStyles}>
              {exchangeCash}
            </Text>
            <Text as="span">{exchangeCurrency}</Text>
          </Box>
        </Box>
      </Flex>
      <Box p={4} bg={'white'}>
        <Text>티켓번호</Text>
        <Text {...contentStyles}>{ticket}</Text>
      </Box>
      <Flex p={4} bg={'white'} {...lineStyles}>
        <Box flex={1}>
          <Text>기준 국가</Text>
          <Text {...contentStyles}>{originCentury}</Text>
        </Box>
        <Box flex={1}>
          <Text>대상 국가</Text>
          <Text {...contentStyles}>{exchangeCentury}</Text>
        </Box>
      </Flex>
      <Box p={4} bg={'white'}>
        <Text>거래 유형</Text>
        <Text {...contentStyles}>{type}</Text>
      </Box>
      <Flex p={4} bg={'white'} gap={2} {...lineStyles}>
        <Text>환전률</Text>
        <Slider
          flex={1}
          defaultValue={percentage}
          isReadOnly={true}
          isDisabled={true}
          cursor={'default'}
          focusThumbOnChange={'false'}
        >
          <SliderMark value={0} {...labelStyles}>
            0%
          </SliderMark>
          <SliderMark value={100} ml={'-40px'} {...labelStyles}>
            100%
          </SliderMark>
          <SliderMark
            value={percentage}
            textAlign="center"
            fontSize={'16px'}
            color="blue.800"
            fontFamily={'Pretendard-Bold'}
            mt="-26px"
            ml="-21px"
            w="50px"
          >
            <Text
              h={'100%'}
              display="flex"
              justifyContent={'center'}
              alignItems="center"
            >
              {percentage}%
            </Text>
          </SliderMark>
          <SliderTrack w={'10px'} bg={'blue.100'}>
            <SliderFilledTrack w={'10px'} bg={'blue.400'} />
          </SliderTrack>
          <SliderThumb boxSize={3}></SliderThumb>
        </Slider>
      </Flex>
      <Box p={2} pl={4} bg={'white'}>
        <Text>거래 기간</Text>
        <Text {...contentStyles}>
          {createdAt} ~ {endDate}
        </Text>
      </Box>
      <Box
        height={'40px'}
        bg={'blue.400'}
        borderBottomRadius={'8px'}
        {...lineStyles}
      ></Box>
      <Box bg={'blue.400'} borderBottomRadius={'8px'}></Box>
    </Grid>
  )
}

export default TicketCard
