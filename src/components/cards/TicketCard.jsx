import { Box, Divider, Flex, Img } from '@chakra-ui/react'
import { differenceInDays, format } from 'date-fns'
import { ko } from 'date-fns/locale/ko'
import React from 'react'
import PlainIcon from '../../images/plane-icon.svg'
import { formatNumberWithCommas } from '../../utils/numberUtils'

const baseCurrency = '원화'
const baseCurrencyCode = 'KRW'

const TicketCard = ({
  displayName,
  tradingAmount,
  targetCurrency,
  targetCurrencyCode,
  targetCountry,
  strategy,
  targetExchangeRate,
  beganDate,
  completeDate,
}) => {
  const dDay = differenceInDays(completeDate, new Date()) + 1

  const labelStyles = {
    color: 'gray.400',
    fontWeight: 500,
    letterSpacing: '0.8px',
  }

  return (
    <Flex minWidth={'750px'} maxW={'750px'} minH={'260px'} mb={'60px'}>
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
          <Flex alignSelf={'center'} alignItems={'center'} gap={5}>
            <Flex direction={'column'} alignItems={'flex-start'}>
              <Flex gap={2}>
                <Box {...labelStyles}>From.</Box>
              </Flex>
              <Box fontSize={'38px'} fontWeight={700} color={'blue.900'}>
                {baseCurrencyCode}
              </Box>
              <Box color={'blue.400'} fontWeight={700}>
                {baseCurrency}
              </Box>
            </Flex>
            <Flex gap={3} alignItems={'center'}>
              <Divider
                w={'50px'}
                border={'1px solid'}
                borderColor={'gray.200'}
              ></Divider>
              <Img src={PlainIcon} w={'85px'}></Img>
              <Divider
                w={'50px'}
                border={'1px solid'}
                borderColor={'gray.200'}
              ></Divider>
            </Flex>
            <Box>
              <Flex gap={2}>
                <Box {...labelStyles}>To.</Box>
              </Flex>
              <Box fontSize={'38px'} fontWeight={700} color={'blue.900'}>
                {targetCurrencyCode}
              </Box>
              <Box color={'blue.400'} fontWeight={700}>
                {targetCurrency}
              </Box>
            </Box>
          </Flex>
        </Flex>
        <Flex
          minH={'38px'}
          px={4}
          justifyContent={'center'}
          alignItems={'center'}
          color={'white'}
          bgColor={'blue.400'}
          borderBottomRadius={'8px'}
          gap={1}
        >
          <Box>거래 종료까지</Box>
          <Box color={'blue.800'}>D-{dDay || 'Day'}</Box>
          <Box>남았어요 종료되면 SMS으로 알려드릴게요</Box>
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
          alignSelf={'flex-end'}
          alignItems={'center'}
          color={'white'}
          fontWeight={600}
          letterSpacing={'1px'}
          px={4}
        >
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
            <Flex gap={2}>
              <Box {...labelStyles}>종료일</Box>
            </Flex>
            <Box letterSpacing={'1px'} color={'blue.900'}>
              {format(completeDate, 'yyyy/MM/dd (EE)', { locale: ko })}
            </Box>
          </Flex>
        </Flex>
        <Flex
          minH={'38px'}
          alignItems={'center'}
          justifyContent={'flex-end'}
          color={'white'}
          letterSpacing={'1px'}
          px={4}
        ></Flex>
      </Flex>
    </Flex>
  )
}

export default TicketCard
