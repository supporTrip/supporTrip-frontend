import { Box, HStack, Image, Text } from '@chakra-ui/react'
import InfoIcon from '../../images/info-icon.svg'
import React, { useState } from 'react'
import BasicButton from '../../components/buttons/BasicButton'
import ValidationInput from '../../components/forms/ValidationInput'

const PinNumberForm = ({ setPinNumber, checkCompleted }) => {
  const [validationResult, setValidationResult] = useState({ pinNumber: null })

  const isCompleted = () => {
    return validationResult.pinNumber === ''
  }

  const validatePinNumber = (pinNumber) => {
    setValidationResult({ ...validationResult, pinNumber: '' })

    if (!pinNumber.trim()) {
      setValidationResult({
        ...validationResult,
        pinNumber: 'PIN 번호를 입력해주세요',
      })
      return
    }

    if (!/^\d{6}$/.test(pinNumber)) {
      setValidationResult({
        ...validationResult,
        pinNumber: 'PIN 번호는 6자리 숫자로 입력해주세요',
      })
      return
    }
  }

  const handlePinNumberChange = (e) => {
    const pinNumber = e.target.value
    validatePinNumber(pinNumber)
    setPinNumber(pinNumber)
  }

  const handleClickButton = () => {
    const completed = isCompleted()

    if (!completed) {
      alert('모든 정보를 제대로 입력했는지 확인 후 다시 시도해주세요')
      return
    }

    checkCompleted(completed)
  }

  return (
    <>
      <Box
        bg={'gray.50'}
        borderRadius={'sm'}
        color={'gray.500'}
        width={'100%'}
        height={'50px'}
        alignContent={'center'}
        paddingLeft={'14px'}
      >
        <HStack>
          <Image src={InfoIcon} />
          <Text fontSize={'14px'}>
            환전 거래 생성시 사용될 PIN 번호를 입력해주세요
          </Text>
        </HStack>
      </Box>

      <ValidationInput
        placeholder="PIN 번호"
        handleChange={handlePinNumberChange}
        validationError={validationResult.pinNumber}
        marginTop={'20px'}
      />

      <BasicButton
        marginTop="20px"
        width="100%"
        bgColor="mint.400"
        color="white"
        onClick={handleClickButton}
      >
        확인
      </BasicButton>
    </>
  )
}

export default PinNumberForm
