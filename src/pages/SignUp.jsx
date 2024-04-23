import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import VerticalStepper from '../components/steppers/VerticalStepper'
import { Box, Flex, HStack, Image, VStack, useSteps } from '@chakra-ui/react'
import Logo from '../images/logo.svg'
import UserInfoForm from './SignUp/UserInfoForm'
import BankAccountLink from './SignUp/BankAccountLink'
import SmsVerification from './SignUp/SmsVerification'
import axios from 'axios'
import { getAccessToken } from '../utils/tokenStore'
import PinNumberForm from './SignUp/PinNumberForm'

const steps = [
  {
    title: '회원 정보',
    isSubStep: false,
    stepNumber: '1',
  },
  {
    title: '정보 입력',
    isSubStep: true,
    stepNumber: '1',
  },
  {
    title: '인증',
    isSubStep: true,
    stepNumber: '1',
  },
  {
    title: '계좌 연결',
    isSubStep: false,
    stepNumber: '2',
  },
  {
    title: 'PIN 설정',
    isSubStep: false,
    stepNumber: '3',
  },
]

const SignUp = () => {
  // TODO: Context API를 사용하여 회원가입 정보를 관리하도록 변경
  const [userInfo, setUserInfo] = useState({})
  const [bankAccount, setBankAccount] = useState({})
  const [pinNumber, setPinNumber] = useState('')

  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  })
  const [completed, setCompleted] = useState(false)

  const increaseStep = () => {
    setActiveStep(activeStep + 1)
  }

  useEffect(() => {
    if (completed) {
      const allowedTerms = [
        ...userInfo.allowedTerms,
        ...bankAccount.allowedTerms,
      ].map((term) => {
        return { [term.requestName]: term.isAllowed }
      })

      const requestBody = {
        name: userInfo.name,
        email: userInfo.email,
        gender: userInfo.gender,
        birthDay: userInfo.birthDay,
        phoneNumber: userInfo.phoneNumber,
        bank: bankAccount.bank,
        bankAccountNumber: bankAccount.bankAccountNumber,
        ...Object.assign(...allowedTerms),
        pinNumber,
      }

      const accessToken = getAccessToken()

      axios
        .put('/api/v1/users/signup', requestBody, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log(response)
          alert('회원가입이 완료되었습니다. 메인 페이지로 이동합니다.')
          window.location.href = '/'
        })
        .catch((error) => {
          console.error(error)
          setCompleted(false)
        })
    }
  }, [completed])

  return (
    <>
      <Box
        width={'100%'}
        marginTop={'23px'}
        marginBottom={'40px'}
        fontSize={'md'}
      >
        <Link to={'/'}>
          <Flex alignItems={'center'} fontWeight={'bold'}>
            <Image src={Logo} alt="서포트립 로고" width={'40px'}></Image>
            서포트립
          </Flex>
        </Link>
      </Box>

      <HStack alignItems={'start'}>
        <VerticalStepper steps={steps} activeStep={activeStep} />
        <VStack
          minWidth={'450px'}
          width={'60%'}
          alignItems={'baseline'}
          marginLeft={'100px'}
        >
          {activeStep === 1 && (
            <UserInfoForm setUserInfo={setUserInfo} goNextStep={increaseStep} />
          )}
          {activeStep === 2 && <SmsVerification goNextStep={increaseStep} />}
          {activeStep === 3 && (
            <BankAccountLink
              changeBankAccount={setBankAccount}
              goNextStep={increaseStep}
            />
          )}
          {activeStep === 4 && (
            <PinNumberForm
              setPinNumber={setPinNumber}
              checkCompleted={setCompleted}
            />
          )}
        </VStack>
      </HStack>
    </>
  )
}

export default SignUp
