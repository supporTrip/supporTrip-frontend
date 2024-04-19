import {
  Box,
  HStack,
  Image,
  Input,
  Select,
  Text,
  VStack,
  useRadioGroup,
} from '@chakra-ui/react'
import ValidationInput from '../../components/forms/ValidationInput'
import InfoIcon from '../../images/info-icon.svg'
import React, { useEffect, useState } from 'react'
import RadioCard from '../../components/cards/RadioCard'

const GENDER_OPTIONS = [
  { name: '남', requestName: 'MALE' },
  { name: '여', requestName: 'FEMALE' },
]

const TELECOM_COMPANIES = [
  { name: 'SKT', value: 'SKT' },
  { name: 'KT', value: 'KT' },
  { name: 'LGU+', value: 'LGU_PLUS' },
  { name: '알뜰폰', value: 'ALT' },
]

const BasicUserInfo = ({
  checkCompleted,
  setName,
  setBirthDay,
  setGender,
  setPhoneNumber,
  setTelecomCompany,
}) => {
  const [validationResult, setValidationResult] = useState({
    name: null,
    birthDay: null,
    gender: null,
    phoneNumber: null,
  })

  const isCompleted = () => {
    return (
      validationResult.name === '' &&
      validationResult.birthDay === '' &&
      validationResult.gender === '' &&
      validationResult.phoneNumber === ''
    )
  }

  useEffect(() => {
    checkCompleted(isCompleted())
  }, [validationResult])

  const putValidation = ({ key, message }) => {
    setValidationResult({
      ...validationResult,
      [key]: message,
    })
  }

  const handleNameChange = (e) => {
    const name = e.target.value
    validateName(name)
    setName(name)
  }

  const handleBirthDayChange = (e) => {
    const birthDay = e.target.value
    validateBirthDay(birthDay)
    setBirthDay(birthDay)
  }

  const handleGenderChange = (nextValue) => {
    setValidationResult({ ...validationResult, gender: '' })
    setGender(nextValue)
  }

  const handleTelecomCompanyChange = (e) => {
    setTelecomCompany(e.target.value)
  }

  const handlePhoneNumberChange = (e) => {
    const phoneNumber = e.target.value
    validatePhoneNumber(phoneNumber)
    setPhoneNumber(phoneNumber)
  }

  const validateName = (name) => {
    setValidationResult({ ...validationResult, name: '' })

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

    setValidationResult({ ...validationResult, birthDay: '' })

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

    setValidationResult({ ...validationResult, phoneNumber: '' })

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

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'gender',
    defaultValue: '',
    onChange: handleGenderChange,
  })

  const group = getRootProps()

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

      <HStack {...group} width={'100%'} marginTop={'10px'} marginBottom={'4px'}>
        {GENDER_OPTIONS.map((gender) => {
          const value = gender.requestName
          const radio = getRadioProps({ value })

          return (
            <RadioCard key={value} {...radio}>
              {gender.name}
            </RadioCard>
          )
        })}
      </HStack>

      <VStack width={'100%'} alignItems={'baseline'} marginTop={'10px'}>
        <HStack align={'start'} width={'100%'}>
          <Select width={'120px'} onChange={handleTelecomCompanyChange}>
            {TELECOM_COMPANIES.map((company) => {
              return (
                <option key={company.value} value={company.value}>
                  {company.name}
                </option>
              )
            })}
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
