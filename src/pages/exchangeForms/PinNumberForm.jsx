import { CloseIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { shuffleNumbers } from '../../utils/numberUtils'
import { getAccessToken } from '../../utils/tokenStore'

const BASE_URL = import.meta.env.VITE_BASE_URL
const numberPad = shuffleNumbers([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

const PinNumberForm = () => {
  const accessToken = getAccessToken()
  const [inputNums, setInputNums] = useState([])
  const [errorVisibility, setErrorVisibility] = useState('hidden')

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/v1/users/pin-number/verification`,
          { pinNumber: inputNums.join('') },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )

        if (response.status === 200) {
          const isSuccess = response.data.success

          if (isSuccess) {
            setErrorVisibility('hidden')
            window.opener && window.opener.postMessage('success', '*')
            return
          }

          setErrorVisibility('visible')
          setInputNums([])
        }
      } catch (error) {
        console.error(error)
      }
    }

    if (inputNums.length === 6) {
      verify()
    }
  }, [inputNums])

  const handleInputNum = async (newNum) => {
    setInputNums([...inputNums, newNum])
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
        <Box mt={3} color={'red'} visibility={errorVisibility}>
          잘못된 PIN 번호를 입력했어요
        </Box>
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
                  key={99}
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
