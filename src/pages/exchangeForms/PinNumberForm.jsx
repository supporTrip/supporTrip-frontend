import { CloseIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, SimpleGrid } from '@chakra-ui/react'
import React, { useState } from 'react'
import { shuffleNumbers } from '../../utils/numberUtils'

const numberPad = shuffleNumbers([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

const PinNumberForm = () => {
  const [inputNums, setInputNums] = useState([])

  const handleInputNum = (newNum) => {
    setInputNums([...inputNums, newNum])

    if (inputNums.length === 5) {
      // TODO: 핀번호 확인 API 요청

      window.opener && window.opener.postMessage('closePopup', '*')
    }
  }

  return (
    <Flex w={'100%'} h={'100%'} direction={'column'}>
      <Flex ml={5} mt={5} fontSize={'lg'} fontWeight={800}>
        서포트립
      </Flex>
      <Flex
        flex={1}
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Heading size={'md'}>PIN 번호 입력</Heading>
        <Flex mt={8} gap={5}>
          {Array.from({ length: 6 }, (_) => {
            return _
          }).map((_, idx) => {
            return (
              <Box
                key={idx}
                w={'20px'}
                h={'20px'}
                bg={idx < inputNums.length ? 'main' : 'gray.150'}
                borderRadius={'100%'}
              ></Box>
            )
          })}
        </Flex>
      </Flex>
      <SimpleGrid columns={3} flex={1} maxH={'45%'} bg={'main'} p={2}>
        {numberPad.map((num, idx) => {
          return (
            <>
              <Flex
                key={num}
                justifyContent={'center'}
                alignItems={'center'}
                color={'white'}
              >
                <Heading
                  fontSize={'24px'}
                  cursor={'pointer'}
                  p={4}
                  onClick={() => {
                    handleInputNum(num)
                  }}
                >
                  {num}
                </Heading>
              </Flex>
              {idx === 8 && (
                <Flex
                  key={0}
                  justifyContent={'center'}
                  alignItems={'center'}
                  color={'white'}
                >
                  <Heading
                    fontSize={'18px'}
                    fontWeight={400}
                    cursor={'pointer'}
                    p={4}
                    onClick={() => {
                      setInputNums([])
                    }}
                  >
                    전체삭제
                  </Heading>
                </Flex>
              )}
            </>
          )
        })}
        <Flex justifyContent={'center'} alignItems={'center'} color={'main'}>
          <Flex
            px={2}
            py={1}
            bg={'mint.600'}
            cursor={'pointer'}
            borderTopLeftRadius="50%"
            borderBottomLeftRadius="50%"
            onClick={() => {
              setInputNums(inputNums.slice(0, inputNums.length - 1))
            }}
          >
            <CloseIcon fontSize={'10px'}></CloseIcon>
          </Flex>
        </Flex>
      </SimpleGrid>
    </Flex>
  )
}

export default PinNumberForm
