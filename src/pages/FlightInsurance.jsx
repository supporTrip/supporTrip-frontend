import { Box, Flex, Input, Select, Text } from '@chakra-ui/react'
import axios from 'axios'

import React, { useEffect, useState } from 'react'
import BasicButton from '../components/buttons/BasicButton'
import FlightInsuranceCard from '../components/cards/FlightInsuranceCard'

const defaultDepartAt = new Date(Date.now() + 600 * 60 * 1000)
  .toISOString()
  .slice(0, 16) // 현재 시간에서 1시간 뒤
const defaultArrivalAt = new Date(
  new Date(defaultDepartAt).getTime() + 33 * 60 * 60 * 1000,
)
  .toISOString()
  .slice(0, 16) // 출발 시간에서 24시간 뒤
const defaultGender = 'male'
const defaultBirthday = '20050101'
const defaultPlanName = 'standard'

const FlightInsurance = () => {
  const [isClicked, setIsClicked] = useState([false, false, false])
  const [departAt, setDepartAt] = useState(defaultDepartAt)
  const [arrivalAt, setArrivalAt] = useState(defaultArrivalAt)
  const [birthDay, setBirthday] = useState(defaultBirthday)
  const [gender, setGender] = useState(defaultGender)
  const [planName, setPlanName] = useState(defaultPlanName)
  const [filteredData, setFilteredData] = useState([])
  const [error, setError] = useState('')
  const today = new Date()

  const responseData = [
    {
      id: 1,
      insuranceName: '해외여행자보험',
      premium: 2500,
      planName: 'advanced',
      companyName: '삼성생명',
      logoImageUrl: 'https://bit.ly/dan-abramov',
      specialContracts: [
        {
          name: '해외여행중 상해사망 및 후유장해',
          coveragePrice: 10000000,
        },
        {
          name: '해외상해의료비',
          coveragePrice: 200000000,
        },
        {
          name: '해외질병의료비',
          coveragePrice: 150000000,
        },
      ],
    },
    {
      id: 2,
      insuranceName: '해외여행자보험',
      premium: 30000,
      planName: 'advanced',
      companyName: '한화생명',
      logoImageUrl: 'https://bit.ly/dan-abramov',
      specialContracts: [
        {
          name: '해외여행중 상해사망 및 후유장해',
          coveragePrice: 200000000,
        },
        {
          name: '해외상해의료비',
          coveragePrice: 300000000,
        },
        {
          name: '해외질병의료비',
          coveragePrice: 25000000,
        },
      ],
    },
    {
      id: 3,
      insuranceName: '해외여행자보험',
      premium: 120000,
      planName: 'advanced',
      companyName: '한화생명',
      logoImageUrl: 'https://bit.ly/dan-abramov',
      specialContracts: [
        {
          name: '해외여행중 상해사망 및 후유장해',
          coveragePrice: 200000000,
        },
        {
          name: '해외상해의료비',
          coveragePrice: 300000000,
        },
        {
          name: '해외질병의료비',
          coveragePrice: 25000000,
        },
      ],
    },
    {
      id: 4,
      insuranceName: '해외여행자보험',
      premium: 123000,
      planName: 'advanced',
      companyName: '한화생명',
      logoImageUrl: 'https://bit.ly/dan-abramov',
      specialContracts: [
        {
          name: '해외여행중 상해사망 및 후유장해',
          coveragePrice: 200000000,
        },
        {
          name: '해외상해의료비',
          coveragePrice: 300000000,
        },
        {
          name: '해외질병의료비',
          coveragePrice: 25000000,
        },
      ],
    },
  ]

  // useEffect(() => {
  //   handleSearch()
  // }, [planName])

  useEffect(() => {
    const filtered = responseData.filter((data) => {
      return data.planName === planName
    })
    setFilteredData(filtered)
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

    // axios
    //   .get('/api/v1/flight-insurances/search', { params: requestData })
    //   .then((response) => {
    //     console.log(requestData)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
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
              _hover={{ color: 'main' }}
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
              color={gender === 'female' ? 'main' : 'gray.200'}
              border={'1px solid'}
              bgColor={'white'}
              _hover={{ color: 'main' }}
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
                  color={clicked ? 'main' : 'gray.200'}
                  _hover={{ color: 'main' }}
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
            bgColor="main"
            height="45px"
            _hover={{}}
            onClick={handleSearch}
          >
            검색하기
          </BasicButton>
        </Box>
      </Flex>
      {/* 플랜선택 */}
      <Flex
        justifyContent={'space-between'} // 텍스트와 셀렉트를 각각 왼쪽과 오른쪽에 정렬합니다.
        // alignItems={'flex-start'} // 수직으로는 위로 정렬합니다.
        marginTop={'50px'}
      >
        <Box>
          <Text color={'gray.600'} fontSize={'xl'}>
            조회결과
          </Text>
          <Text>
            {`총 ${filteredData.length}개의 여행자보험상품이 조회되었습니다.`}
          </Text>
        </Box>
        <Select
          width={115}
          height={42}
          borderWidth={2}
          borderColor={'gray.200'}
          value={planName}
          onChange={handlePlanClick}
        >
          <option value="standard">표준플랜</option>
          <option value="advanced">고급플랜</option>
        </Select>
      </Flex>

      {/* 보험상품 카드 */}
      <Flex
        flexWrap={'wrap'}
        my={8}
        justifyContent={'space-between'}
        flexDirection={'row'}
        gap={10}
      >
        {filteredData.map((card, index) => {
          return <FlightInsuranceCard key={index} card={card} />
        })}
      </Flex>
    </>
  )
}

export default FlightInsurance
