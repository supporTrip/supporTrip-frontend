import { Box, Flex, Image, Input, Select, Text } from '@chakra-ui/react'
import axios from 'axios'

import React, { useEffect, useState } from 'react'
import BasicButton from '../components/buttons/BasicButton'
import { CheckIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

const FlightInsurance = () => {
  const [isClicked, setIsClicked] = useState([false, false, false])
  const [departAt, setDepartAt] = useState(
    new Date(Date.now() + 600 * 60 * 1000).toISOString().slice(0, 16), // 현재 시간에서 1시간 뒤
  )

  const [arrivalAt, setArrivalAt] = useState(
    new Date(new Date(departAt).getTime() + 33 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 16), // 출발 시간에서 24시간 뒤
  )
  const [birthDay, setBirthday] = useState('20050101')
  const [gender, setGender] = useState('male')
  const [planName, setPlanName] = useState('표준플랜')
  const [error, setError] = useState('')
  const cards = ['카드1', '카드2', '카드3', '카드4', '카드5', '카드6']
  const today = new Date()
  const textData = [
    '해외여행중 상해사망 및 후유장해',
    '해외상해의료비',
    '해외질병의료비',
  ]
  const amountData = ['2억원', '3억원', '4억원']

  useEffect(() => {
    handleSearch()
  }, [planName])

  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + 3)
    return maxDate.toISOString().slice(0, 16)
  }

  const handleDepartAtChange = (e) => {
    setDepartAt(e.target.value)
  }

  const handleArrivalAtChange = (e) => {
    setArrivalAt(e.target.value)
  }

  const handleBirthDayChange = (e) => {
    const value = e.target.value.replace(/\D/g, '')
    if (value === e.target.value) {
      setBirthday(value)
    }
  }

  const handleGenderClick = (selectedGender) => {
    setGender(selectedGender)
  }

  const handleContractClick = (index) => {
    const updatedClicks = [...isClicked]
    updatedClicks[index] = !updatedClicks[index]
    setIsClicked(updatedClicks)
  }

  const handlePlanClick = (e) => {
    const selectedPlan = e.target.value
    setPlanName(selectedPlan)
  }

  const toLocalDateTime = (datetimeString) => {
    return datetimeString ? new Date(datetimeString).toISOString() : ''
  }

  const toLocalDate = (dateString) => {
    return dateString ? dateString.substring(0, 10) : ''
  }

  const handleSearch = () => {
    if (!departAt || !arrivalAt || !birthDay || !gender) {
      setError('모든 입력 항목을 작성해주세요.')
      alert('모든 입력 항목을 작성해주세요.')
      return
    }

    if (new Date(arrivalAt) < new Date(departAt)) {
      setError('도착 날짜는 출발 날짜보다 빨라야 합니다.')
      alert('도착 날짜는 출발 날짜보다 빨라야 합니다.')
      return
    }

    if (birthDay.length !== 8) {
      alert('생년월일 8자리를 입력해주세요')
    }

    const requestData = {
      departAt: toLocalDateTime(departAt),
      arrivalAt: toLocalDateTime(arrivalAt),
      birthDay: toLocalDate(birthDay),
      gender: gender,
      planName: planName,
      flightDelay: isClicked[0],
      passportLoss: isClicked[1],
      foodPoisoning: isClicked[2],
    }

    axios
      .get('/api/v1/flight-insurances/search', { params: requestData })
      .then((response) => {
        console.log(requestData)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      {/* 검색폼 */}
      <Flex
        m={'0 auto'}
        w="800px"
        borderRadius="10px"
        border="1px solid"
        borderColor="gray.100"
        backgroundColor="white"
        flexDirection={'column'}
        alignItems={'center'}
        mt={'50px'}
        p={'40px'}
        py={'40px'}
      >
        <Flex w={'90%'} justifyContent={'space-between'} alignItems={'center'}>
          <Input
            mr={'30px'}
            width={'309px'}
            height={'49px'}
            borderRadius={'10px'}
            borderWidth={'1px'}
            borderColor={'gray.200'}
            focusBorderColor={'main'}
            type="datetime-local"
            placeholder="출발 날짜"
            min={new Date(today.getTime() + 60 * 60 * 1000)
              .toISOString()
              .slice(0, 16)}
            max={getMaxDate()}
            value={departAt}
            onChange={handleDepartAtChange}
          />
          <Input
            width={'309px'}
            height={'49px'}
            borderRadius={'10px'}
            borderWidth={'1px'}
            borderColor={'gray.200'}
            focusBorderColor={'main'}
            type="datetime-local"
            placeholder="도착 날짜"
            min={new Date(today.getTime() + 24 * 60 * 60 * 1000)
              .toISOString()
              .slice(0, 16)}
            max={getMaxDate()}
            value={arrivalAt}
            onChange={handleArrivalAtChange}
          />
        </Flex>

        <Box marginTop={'30px'} display={'flex'} alignItems={'center'}>
          <Input
            marginRight={'30px'}
            width={'309px'}
            height={'49px'}
            borderRadius={'10px'}
            borderWidth={'1px'}
            borderColor={birthDay.length > 0 ? 'main' : 'gray.200'}
            focusBorderColor={'main'}
            type="text"
            maxLength={8}
            placeholder="생년월일 ex)19980517"
            value={birthDay}
            onChange={handleBirthDayChange}
          />
          <Box>
            <BasicButton
              width={'154px'}
              height={'49px'}
              borderColor={'gray.200'}
              borderRadius={'10px 0px 0px 10px'}
              border={'1px solid'}
              color={gender === 'male' ? 'main' : 'gray.200'}
              bgColor={'white'}
              _hover={{ color: 'mint.400' }}
              onClick={() => {
                handleGenderClick('male')
              }}
            >
              남
            </BasicButton>
            <BasicButton
              width={'154px'}
              height={'49px'}
              borderRadius={'0px 10px 10px 0px'}
              color={gender === 'female' ? 'mint.400' : 'gray.200'}
              border={'1px solid'}
              bgColor={'white'}
              _hover={{ color: 'mint.400' }}
              onClick={() => {
                handleGenderClick('female')
              }}
            >
              여
            </BasicButton>
          </Box>
        </Box>

        <Box>
          <Box
            display={'flex'}
            textAlign={'center'}
            marginTop={'30px'}
            marginRight={'210px'}
          >
            <Text pt={'1px'} fontSize={'lg'} mr={'20px'}>
              세부특약
            </Text>
            {/* 각 특약 조항 버튼을 배열로 매핑하여 동적으로 생성 */}
            {isClicked.map((clicked, index) => {
              return (
                <BasicButton
                  marginRight={'15px'}
                  width={'100px'}
                  height={'30px'}
                  bgColor={'white'}
                  border={'1px solid'}
                  color={clicked ? 'mint.200' : 'gray.200'}
                  _hover={{ color: 'mint.200' }}
                  key={index}
                  onClick={() => {
                    return handleContractClick(index)
                  }}
                >
                  {index === 0
                    ? '항공기지연'
                    : index === 1
                      ? '여권분실'
                      : '식중독'}
                </BasicButton>
              )
            })}
          </Box>
        </Box>

        <Box width="100%" textAlign={'center'} mt={'30px'}>
          <BasicButton
            color="white"
            width="100%"
            bgColor="mint.400"
            height="45px"
            _hover={'none'}
            onClick={handleSearch}
          >
            검색하기
          </BasicButton>
        </Box>
      </Flex>
      {/* 플랜선택 */}
      <Flex
        justifyContent={'space-between'} // 텍스트와 셀렉트를 각각 왼쪽과 오른쪽에 정렬합니다.
        alignItems={'flex-start'} // 수직으로는 위로 정렬합니다.
        marginTop={'50px'}
      >
        <Box>
          <Text color={'gray.600'} fontSize={'xl'}>
            조회결과
          </Text>
          <Text>총 6개의 여행자보험상품이 조회되었습니다.</Text>
        </Box>
        <Select
          width={110}
          height={42}
          borderWidth={2}
          borderColor={'gray.200'}
          value={planName}
          onChange={handlePlanClick}
        >
          <option value="표준플랜">표준플랜</option>
          <option value="고급플랜">고급플랜</option>
        </Select>
      </Flex>

      {/* 보험상품 카드 */}
      <Flex flexWrap={'wrap'} marginTop={8}>
        {cards.map((card, index) => {
          return (
            <Link key={index} to={`/flight-insurance/${card.id}`}>
              <Box
                border={'solid 1px'}
                borderColor={'gray.200'}
                borderRadius={10}
                backgroundColor={'white'}
                width={310}
                height={350}
                boxShadow={'md'}
                marginBottom={index % 3 === 2 ? 10 : 0}
                marginRight={index % 3 !== 2 ? 10 : 0}
                display={'flex'}
                flexDirection={'column'}
                cursor={'pointer'}
              >
                <Box
                  mt={7}
                  ml={220}
                  width={'70px'}
                  height={'25px'}
                  bgColor={'white'}
                  border={'1px solid'}
                  color={'main'}
                  borderRadius={10}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text fontSize={'sm'}>표준플랜</Text>
                </Box>
                <Box display="flex" alignItems="center">
                  <Image
                    marginLeft={6}
                    borderRadius="full"
                    boxSize="65px"
                    src="https://bit.ly/dan-abramov"
                    alt="Dan Abramov"
                  />
                  <Box pl={5}>
                    <Text fontSize="lg">삼성생명</Text>
                    <Text fontWeight="bold">해외여행자보험</Text>
                  </Box>
                </Box>
                <Flex flexDirection={'column'} pl={10} pt={5}>
                  {textData.map((text, index) => {
                    return (
                      <Box key={index}>
                        <Flex
                          flexDirection={'row'}
                          alignItems={'center'}
                          marginTop={4}
                        >
                          <CheckIcon color={'main'} marginRight={2}></CheckIcon>
                          <Text fontWeight={'bold'}>{amountData[index]}</Text>
                          <Box width={2}></Box>
                          <Text fontSize={13}>{text}</Text>
                        </Flex>
                      </Box>
                    )
                  })}
                </Flex>
                <Flex justifyContent={'space-around'} marginTop={6}>
                  <Text fontSize={'xl'}>예상보험료</Text>
                  <Text fontSize={'xl'} fontWeight={'bold'}>
                    8,900원
                  </Text>
                </Flex>
                <Flex pl={250} pt={3}>
                  <Text fontSize={'sm'} color={'gray.200'}>
                    자세히
                  </Text>
                  <ChevronRightIcon
                    w={5}
                    h={5}
                    color={'gray.200'}
                  ></ChevronRightIcon>
                </Flex>
              </Box>
            </Link>
          )
        })}
      </Flex>
    </>
  )
}

export default FlightInsurance
