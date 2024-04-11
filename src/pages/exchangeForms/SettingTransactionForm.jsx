import { Box, Flex, Heading, Input, Select, Text } from '@chakra-ui/react'
import React from 'react'
import BasicButton from '../../components/buttons/BasicButton'

const country = ['미국달러', '일본엔화', '유럽유로']

const SettingTransactionForm = ({ nextStep }) => {
  return (
    <Flex flex={1} direction={'column'}>
      <Heading size={'lg'} color={'black.soft'}>
        거래 설정
      </Heading>
      <Text mt={'20px'} color={'gray.600'}>
        환전에 필요한 정보를 입력하세요.
      </Text>
      <Flex mt={'50px'} flex={1} direction={'column'} alignItems="flex-start">
        <Flex w={'100%'} alignItems={'center'}>
          <Text mr={'50px'}>기간</Text>
          <Box flex={1} mr={'30px'}>
            <Input
              size="md"
              borderColor={'gray.300'}
              focusBorderColor="main"
              type="date"
            />
          </Box>
          <Box flex={1}>
            <Input
              size="md"
              borderColor={'gray.300'}
              focusBorderColor="main"
              type="date"
            />
          </Box>
        </Flex>
        <Flex w={'100%'} alignItems={'center'} mt={'20px'}>
          <Text mr={'50px'}>외화</Text>

          <Box flex={1}>
            <Select
              placeholder="외화 선택"
              borderColor={'gray.300'}
              focusBorderColor="main"
            >
              {country.map((c, idx) => {
                return (
                  <option key={idx} value={c}>
                    {c}
                  </option>
                )
              })}
            </Select>
          </Box>
        </Flex>
        {/* <Flex w={'100%'} alignItems={'center'}>
          <Text mr={'20px'}>환전 금액</Text>
          <Box flex={1} w={'300px'}>
            <Input
              size="md"
              borderColor={'gray.300'}
              focusBorderColor="main"
              type="number"
            />
          </Box>
          <Text ml={'10px'}>원</Text>
        </Flex> */}
        {/* <Flex w={'100%'} alignItems={'center'}>
          <Input
            size="md"
            borderColor={'gray.300'}
            focusBorderColor="main"
            type="number"
            disabled
          />

          <Select
            placeholder="외화 선택"
            borderColor={'gray.300'}
            focusBorderColor="main"
          >
            {country.map((c, idx) => {
              return (
                <option key={idx} value={c}>
                  {c}
                </option>
              )
            })}
          </Select>
        </Flex> */}
        <Flex
          w={'100%'}
          flex={1}
          justifyContent={'flex-end'}
          alignItems={'flex-end'}
        >
          <BasicButton
            bgColor={'main'}
            color="white"
            size={'lg'}
            width={'130px'}
            fontSize={'18px'}
            onClick={nextStep}
          >
            다음
          </BasicButton>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SettingTransactionForm
