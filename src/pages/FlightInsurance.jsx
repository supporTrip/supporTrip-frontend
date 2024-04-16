import { Box, Flex, Image, Input, Select } from '@chakra-ui/react'
import axios from 'axios'

import React, { useEffect, useState } from 'react'
import BasicButton from '../components/buttons/BasicButton'

const FlightInsurance = () => {
  const [isClicked, setIsClicked] = useState([false, false, false])
  const [departAt, setDepartAt] = useState('')
  const [arrivalAt, setArrivalAt] = useState('')
  const [birthDay, setBirthday] = useState('')
  const [gender, setGender] = useState('')
  const [planName, setPlanName] = useState('표준플랜')
  const [error, setError] = useState('')
  const today = new Date()

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
      <Box
        w="800px"
        h="256px"
        borderRadius="10px"
        border="1px solid"
        borderColor="gray.100"
        backgroundColor="white"
        position="absolute"
        top="30%"
        left="50%"
        transform="translate(-50%, -50%)"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box marginTop={'40px'}>
          <Input
            marginRight={'30px'}
            width={'309px'}
            height={'49px'}
            borderRadius={'10px'}
            borderWidth={'1px'}
            borderColor={'gray.200'}
            focusBorderColor={'main'}
            type="datetime-local"
            placeholder="출발 날짜"
            min={today.toISOString().slice(0, 16)}
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
            min={today.toISOString().slice(0, 16)}
            max={getMaxDate()}
            value={arrivalAt}
            onChange={handleArrivalAtChange}
          />
        </Box>
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
            placeholder="  생년월일 ex)19980517"
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
          <Box textAlign={'center'} marginTop={'30px'} marginRight={'210px'}>
            <span style={{ marginRight: '30px' }}>세부 특약</span>
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
      </Box>
      <Box>
        <Box style={{ textAlign: 'center', marginTop: '340px' }}>
          <BasicButton
            color="white"
            width="800px"
            bgColor="mint.200"
            height="45px"
            _hover={{ bgColor: 'main' }}
            // onClick={handleSearch}
          >
            검색하기
          </BasicButton>
        </Box>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'center'}
        marginTop={10}
        width={1015}
        height={0.3}
        backgroundColor={'gray.200'}
      ></Box>
      {/* 플랜선택 */}
      <Box display={'flex'} justifyContent={'flex-end'} marginTop={7}>
        <Select
          width={110}
          height={50}
          borderWidth={2}
          borderColor={'gray.200'}
          value={planName}
          onChange={handlePlanClick}
        >
          <option value="표준플랜">표준플랜</option>
          <option value="고급플랜">고급플랜</option>
        </Select>
      </Box>
    </>
  )
}

export default FlightInsurance
