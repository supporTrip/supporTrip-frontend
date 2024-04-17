import {
  Box,
  HStack,
  Image,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react'
import ValidationInput from '../../components/forms/ValidationInput'
import InfoIcon from '../../images/info-icon.svg'
import React, { useState } from 'react'

const BasicUserInfo = ({
  checkCompleted,
  setName,
  setBirthDay,
  setPhoneNumber,
}) => {
  const [validationResult, setvalidationResult] = useState({
    name: null,
    birthDay: null,
    phoneNumber: null,
  })

  const isCompleted = () => {
    return (
      validationResult.name === '' &&
      validationResult.birthDay === '' &&
      validationResult.phoneNumber === ''
    )
  }

  const putValidation = ({ key, message }) => {
    setvalidationResult({
      ...validationResult,
      [key]: message,
    })
  }

  const handleNameChange = (e) => {
    const name = e.target.value
    validateName(name)
    setName(name)
    checkCompleted(isCompleted())
  }

  const handleBirthDayChange = (e) => {
    const birthDay = e.target.value
    validateBirthDay(birthDay)
    setBirthDay(birthDay)
    checkCompleted(isCompleted())
  }

  const handlePhoneNumberChange = (e) => {
    const phoneNumber = e.target.value
    validatePhoneNumber(phoneNumber)
    setPhoneNumber(phoneNumber)
    checkCompleted(isCompleted())
  }

  const validateName = (name) => {
    validationResult.name = ''

    if (!name.trim()) {
      putValidation({ key: 'name', message: '이름을 입력해주세요' })
      return
    }

    if (!/^[a-zA-Z가-힣\s]*$/.test(name)) {
      putValidation({
        key: 'name',
        message:
          '유효한 이름을 입력해주세요 (영문자 / 한글만 가능, 특수문자 불가능)',
      })
      return
    }
  }

  const validateBirthDay = (birthDay) => {
    const regex = /^([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/

    validationResult.birthDay = ''

    if (!birthDay.trim()) {
      putValidation({ key: 'birthDay', message: '생년월일을 입력해주세요' })
      return
    }

    if (!regex.test(birthDay)) {
      putValidation({
        key: 'birthDay',
        message: '생년월일 6자리를 형식에 맞게 입력해주세요 (YYMMDD)',
      })
      return
    }
  }

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\d{3}-\d{4}-\d{4}$/

    validationResult.phoneNumber = ''

    if (!phoneNumber.trim()) {
      putValidation({ key: 'phoneNumber', message: '전화번호를 입력해주세요' })
      return
    }

    if (!regex.test(phoneNumber)) {
      putValidation({
        key: 'phoneNumber',
        message: '전화번호 11자리를 형식에 맞게 입력해주세요 (000-0000-0000)',
      })
      return
    }
  }

  const hasError = (validationError) => {
    return validationError !== '' && validationError !== null
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
          <Text fontSize={'14px'}>휴대폰 인증을 위한 정보를 입력해주세요</Text>
        </HStack>
      </Box>

      <ValidationInput
        placeholder={'이름'}
        handleChange={handleNameChange}
        validationError={validationResult.name}
      />

      <ValidationInput
        placeholder={'생년월일 (YYMMDD)'}
        handleChange={handleBirthDayChange}
        validationError={validationResult.birthDay}
      />

      <VStack width={'100%'} alignItems={'baseline'} marginTop={'10px'}>
        <HStack align={'start'} width={'100%'}>
          <Select width={'120px'}>
            <option value="SKT">SKT</option>
            <option value="KT">KT</option>
            <option value="LGU_PLUS">LGU+</option>
            <option value="ALT">알뜰폰</option>
          </Select>
          <Input
            placeholder={'전화번호 (000-0000-0000)'}
            onChange={handlePhoneNumberChange}
            {...(hasError(validationResult.phoneNumber) && {
              color: 'red',
              marginBottom: '0px',
            })}
          />
        </HStack>
        {hasError(validationResult.phoneNumber) && (
          <Text color={'red'} fontSize={'14px'}>
            {validationResult.phoneNumber}
          </Text>
        )}
      </VStack>
    </>
  )
}

export default BasicUserInfo
