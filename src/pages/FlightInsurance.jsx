import { Box } from '@chakra-ui/react'

import React, { useEffect, useState } from 'react'
import BasicButton from '../components/buttons/BasicButton'
import ContractButton from '../components/buttons/ContractButton'

const FlightInsurance = () => {
  const [isClicked, setIsClicked] = useState([false, false, false])
  const [gender, setGender] = useState('')

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
        <div style={{ marginTop: '40px' }}>
          <input
            type="date"
            placeholder="출발 날짜"
            min="출발"
            style={{
              marginRight: '30px',
              width: '309px',
              height: '49px',
              borderRadius: '10px',
              borderWidth: '1px',
              borderColor: 'gray.200',
            }}
          />
          <input
            type="date"
            placeholder="도착 날짜"
            style={{
              width: '309px',
              height: '49px',
              borderRadius: '10px',
              borderWidth: '1px',
              borderColor: 'gray.200',
            }}
          />
        </div>
        <div style={{ marginTop: '30px' }}>
          <input
            type="text"
            placeholder="  생년월일"
            style={{
              marginRight: '30px',
              width: '309px',
              height: '49px',
              borderRadius: '10px',
              borderWidth: '1px',
              borderColor: 'gray.200',
            }}
          />
          <select
            value={gender}
            onChange={(e) => {
              setGender(e.target.value)
            }}
            style={{
              width: '309px',
              height: '49px',
              paddingLeft: '10px',
              fontSize: '16px',
              borderRadius: '10px',
              borderWidth: '1px',
              borderColor: 'gray.200',
            }}
          >
            <option value="" disabled>
              성별
            </option>
            <option value="남">남</option>
            <option value="여">여</option>
          </select>
        </div>
        <div>
          <div
            style={{
              textAlign: 'center',
              marginTop: '30px',
              marginRight: '60px',
            }}
          >
            <span style={{ marginRight: '30px' }}>특약 조항</span>
            {/* 각 특약 조항 버튼을 배열로 매핑하여 동적으로 생성 */}
            {isClicked.map((clicked, index) => {
              return (
                <ContractButton
                  key={index}
                  contract={
                    index === 0
                      ? '항공기지연'
                      : index === 1
                        ? '여권분실'
                        : '식중독'
                  }
                  isClicked={clicked}
                  handleClick={() => {
                    return handleClick(index)
                  }}
                />
              )
            })}
          </div>
        </div>
      </Box>
      <Box>
        <div style={{ textAlign: 'center', marginTop: '340px' }}>
          <BasicButton
            color="white"
            width="800px"
            bgColor="mint.200"
            height="45px"
            _hover={{ bgColor: 'mint.400' }}
          >
            검색하기
          </BasicButton>
        </div>
      </Box>
    </>
  )
}

export default FlightInsurance
