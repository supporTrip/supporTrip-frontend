import { Box, Input } from '@chakra-ui/react'

import React, { useEffect, useState } from 'react'
import BasicButton from '../components/buttons/BasicButton'

const FlightInsurance = () => {
  const [isClicked, setIsClicked] = useState([false, false, false])
  const [gender, setGender] = useState('')

  const handleGenderClick = (selectedGender) => {
    setGender(selectedGender)
  }

  const handleClick = (index) => {
    const updatedClicks = [...isClicked]
    updatedClicks[index] = !updatedClicks[index]
    setIsClicked(updatedClicks)
  }

  useEffect(() => {
    console.log(gender)
  }, [gender])

  return (
    <>
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
            type="datetime-local"
            placeholder="출발 날짜"
          />
          <Input
            width={'309px'}
            height={'49px'}
            borderRadius={'10px'}
            borderWidth={'1px'}
            borderColor={'gray.200'}
            type="datetime-local"
            placeholder="도착 날짜"
          />
        </Box>
        <Box marginTop={'30px'} display={'flex'} alignItems={'center'}>
          <Input
            marginRight={'30px'}
            width={'309px'}
            height={'49px'}
            borderRadius={'10px'}
            borderWidth={'1px'}
            color={'gray.200'}
            type="text"
            maxLength={6}
            placeholder="  생년월일 ex)990101"
          />
          <Box>
            <BasicButton
              width={'154px'}
              height={'49px'}
              borderColor={'gray.200'}
              border={'1px solid'}
              color={gender === 'male' ? 'blue.500' : 'gray.200'}
              bgColor={'white'}
              _hover={{ color: 'blue.500' }}
              onClick={() => {
                handleGenderClick('male')
              }}
            >
              남
            </BasicButton>
            <BasicButton
              width={'154px'}
              height={'49px'}
              color={gender === 'female' ? 'blue.500' : 'gray.200'}
              border={'1px solid'}
              bgColor={'white'}
              _hover={{ color: 'blue.500' }}
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
                    return handleClick(index)
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
            _hover={{ bgColor: 'mint.400' }}
          >
            검색하기
          </BasicButton>
        </Box>
      </Box>
    </>
  )
}

export default FlightInsurance
