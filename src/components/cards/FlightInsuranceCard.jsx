import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Text, Image, Flex } from '@chakra-ui/react'
import { CheckIcon, ChevronRightIcon } from '@chakra-ui/icons'

const FlightInsuranceCard = ({ card }) => {
  const abbreviateName = (name, maxLength) => {
    if (name.length <= maxLength) {
      return name
    } else {
      return name.slice(0, maxLength) + '..'
    }
  }

  return (
    <Link to={`/flight-insurance/${card.id}`}>
      <Box
        border={'solid 1px'}
        borderColor={'gray.200'}
        borderRadius={10}
        backgroundColor={'white'}
        width={310}
        height={350}
        boxShadow={'md'}
        display={'flex'}
        flexDirection={'column'}
        cursor={'pointer'}
        px={5}
        py={5}
      >
        {/* 플랜 이름 */}
        <Box
          ml={198}
          width={'70px'}
          height={'25px'}
          bgColor={'white'}
          border={'1px solid'}
          color={'main'}
          borderRadius={10}
          display="flex"
          justifyContent="center"
        >
          <Text fontSize={'sm'}>
            {card.planName === 'standard' ? '표준플랜' : '고급플랜'}
          </Text>
        </Box>

        {/* 회사명과 보험상품명 */}
        <Box display="flex" alignItems="center" mt={3}>
          <Image borderRadius="full" boxSize="65px" src={card.logoImageUrl} />
          <Box pl={5}>
            <Text fontSize="lg">{card.companyName}</Text>
            <Text fontWeight="bold">{card.insuranceName}</Text>
          </Box>
        </Box>

        {/* 보험 특약 */}
        <Flex flexDirection={'column'} mt={3}>
          {card.specialContracts.map((contract, i) => {
            return (
              <Box key={i} pt={2}>
                <Flex alignItems="center">
                  <CheckIcon color="main" marginRight={2} />
                  <Flex alignItems={'center'}>
                    <Text fontWeight="bold" pr={2}>
                      {contract.coveragePrice >= 100000000
                        ? `${(contract.coveragePrice / 100000000).toLocaleString()}억원`
                        : contract.coveragePrice >= 10000
                          ? `${(contract.coveragePrice / 10000).toLocaleString()}만원`
                          : contract.coveragePrice.toLocaleString() + '원'}
                    </Text>
                    <Text>{abbreviateName(contract.name, 12)}</Text>
                  </Flex>
                </Flex>
              </Box>
            )
          })}
        </Flex>

        {/* 예상 보험료 */}
        <Flex justifyContent={'space-between'} marginTop={6}>
          <Box width="120px">
            <Text fontSize={'xl'}>예상보험료</Text>
          </Box>
          <Text fontSize={'xl'} fontWeight={'bold'} textAlign="right">
            {card.premium.toLocaleString()}원
          </Text>
        </Flex>

        {/* 자세히 보기 */}
        <Flex mt={4} ml={212}>
          <Text fontSize={'xs'} color={'gray.200'}>
            자세히
          </Text>
          <ChevronRightIcon w={5} h={5} color={'gray.200'} />
        </Flex>
      </Box>
    </Link>
  )
}

export default FlightInsuranceCard
