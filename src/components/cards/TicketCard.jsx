import { Box, Divider, Flex, Img } from '@chakra-ui/react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale/ko'
import React from 'react'
import Barcode from '../../images/barcode.svg'
import PlainIcon from '../../images/plane-icon.svg'
import { formatNumberWithCommas } from '../../utils/numberUtils'

const TicketCard = ({
  displayName,
  airplainPnrNumber,
  tradingAmount,
  baseCurrency,
  baseCountry,
  targetCurrency,
  targetCurrencyCode,
  targetCountry,
  strategy,
  targetExchangeRate,
  beganDate,
  completeDate,
}) => {
  const lineStyles = {
    borderRight: '1.5px dashed',
    borderColor: 'gray.300',
  }

  const contentStyles = {
    fontSize: '17px',
  }

  const labelStyles = {
    color: 'gray.400',
    fontWeight: 500,
    letterSpacing: '0.8px',
  }

  const dot = (count) => {
    const boxes = Array.from({ length: count }, (_, idx) => {
      return (
        <Box
          key={idx}
          w={'12px'}
          h={'12px'}
          borderRadius={'100%'}
          bgColor={'gray.100'}
        ></Box>
      )
    })

    return boxes
  }

  return (
    <Flex minWidth={'800px'} maxW={'800px'} minH={'260px'} mb={'30px'}>
      <Flex
        flex={2}
        direction={'column'}
        border={'1px solid'}
        borderColor={'gray.100'}
        borderRadius={'8px'}
        borderRight={'1.8px dashed'}
        borderRightColor={'gray.300'}
      >
        <Flex
          // flex={1}
          h={'48px'}
          alignItems={'center'}
          color={'white'}
          fontWeight={600}
          letterSpacing={'1.3px'}
          px={4}
          bgColor={'blue.400'}
          borderTopRadius={'8px'}
        >
          {displayName}
        </Flex>
        <Flex
          flex={3}
          direction={'column'}
          justifyContent={'center'}
          bgColor={'white'}
          p={4}
          position={'relative'}
        >
          {/* <Box>
            <Box>원금</Box>
            <Box>
              {formatNumberWithCommas(tradingAmount)} {baseCurrency}
            </Box>
          </Box> */}
          <Flex alignSelf={'center'} alignItems={'center'} gap={5}>
            <Img src={Barcode} w={'80px'} h={'150px'}></Img>
            <Flex direction={'column'} alignItems={'flex-start'}>
              <Flex gap={2}>
                <Box {...labelStyles}>From.</Box>
                {/* <Box>
                  {format(beganDate, 'yyyy/MM/dd (EE)', { locale: ko })}
                </Box> */}
              </Flex>
              <Box fontSize={'38px'} fontWeight={700} color={'blue.900'}>
                KRW
              </Box>
              <Box color={'blue.400'} fontWeight={700}>
                원화
              </Box>
              {/* <Box {...labelStyles}>Date</Box> */}
              {/* <Box>{beganDate}</Box> */}
            </Flex>
            <Flex gap={1} alignItems={'center'}>
              {/* {dot(2)} */}
              <Divider
                w={'50px'}
                border={'1px solid'}
                borderColor={'gray.300'}
              ></Divider>
              <Img src={PlainIcon} w={'70px'}></Img>
              <Divider
                w={'50px'}
                border={'1px solid'}
                borderColor={'gray.300'}
              ></Divider>
              {/* {dot(2)} */}
            </Flex>
            <Box>
              <Flex gap={2}>
                <Box {...labelStyles}>To.</Box>
                {/* <Box>
                  {format(completeDate, 'yyyy/MM/dd (EE)', { locale: ko })}
                </Box> */}
              </Flex>
              <Box fontSize={'38px'} fontWeight={700} color={'blue.900'}>
                {targetCurrencyCode}
              </Box>
              <Box color={'blue.400'} fontWeight={700}>
                {targetCurrency}
              </Box>
            </Box>
          </Flex>
          {/* <Flex position={'absolute'} bottom={0}>
            <Box>
              <Box {...labelStyles}>유형</Box>
              <Box>{strategy}</Box>
            </Box>
          </Flex> */}
        </Flex>
        <Flex
          minH={'38px'}
          px={4}
          justifyContent={'center'}
          alignItems={'center'}
          color={'blue.700'}
          bgColor={'blue.400'}
          borderBottomRadius={'8px'}
        >
          <Box>
            거래가 종료되면 SMS으로 알려드릴게요
            {/* {strategy === '목표형'
              ? strategy +
              '(' +
              formatNumberWithCommas(targetExchangeRate) +
              '원)'
              : strategy}
            으로 환전하고있어요 */}
          </Box>
        </Flex>
      </Flex>
      <Flex
        flex={1}
        direction={'column'}
        border={'1px solid'}
        borderColor={'gray.100'}
        borderRadius={'8px'}
        borderLeft={0}
        bgColor={'blue.400'}
      >
        <Flex
          h={'48px'}
          // flex={1}
          alignSelf={'flex-end'}
          alignItems={'center'}
          color={'white'}
          fontWeight={600}
          letterSpacing={'1px'}
          px={4}
        >
          {/* SUPPORTRIP */}
          {strategy === '목표형'
            ? strategy +
            '(' +
            formatNumberWithCommas(targetExchangeRate) +
            '원)'
            : strategy}
        </Flex>
        <Flex
          flex={3}
          direction={'column'}
          bg={'white'}
          p={4}
          justifyContent={'space-between'}
          gap={2}
        >
          <Flex direction={'column'}>
            <Box {...labelStyles}>충전</Box>
            <Box letterSpacing={'0.8px'} color={'blue.900'}>
              {formatNumberWithCommas(tradingAmount)} 원
            </Box>
          </Flex>
          <Flex direction={'column'}>
            <Box {...labelStyles}>시작일</Box>
            <Box letterSpacing={'1px'} color={'blue.900'}>
              {format(beganDate, 'yyyy/MM/dd (EE)', { locale: ko })}
            </Box>
          </Flex>
          <Flex direction={'column'}>
            <Box {...labelStyles}>종료일</Box>
            <Box letterSpacing={'1px'} color={'blue.900'}>
              {format(completeDate, 'yyyy/MM/dd (EE)', { locale: ko })}
            </Box>
          </Flex>
        </Flex>
        <Flex
          // flex={0.8}
          minH={'38px'}
          alignItems={'center'}
          justifyContent={'flex-end'}
          color={'white'}
          letterSpacing={'1px'}
          px={4}
        >
          {/* SUPPORTRIP */}
          {/* 진행중 */}
          {/* {airplainPnrNumber} */}
          {/* {format(completeDate, 'yyyy.MM.dd')} */}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default TicketCard
