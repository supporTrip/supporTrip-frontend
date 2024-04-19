import React, { useEffect, useState } from 'react'
import VerticalStepper from '../components/steppers/VerticalStepper'
import {
  Box,
  Flex,
  HStack,
  Image,
  Link,
  VStack,
  useSteps,
} from '@chakra-ui/react'
import Logo from '../images/logo.svg'
import UserInfoForm from './SignUp/UserInfoForm'
import BankAccountLink from './SignUp/BankAccountLink'
import SmsVerification from './SignUp/SmsVerification'

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
]

const SignUp = () => {
  // TODO: Context API를 사용하여 회원가입 정보를 관리하도록 변경
  const [userInfo, setUserInfo] = useState({})
  const [bankAccount, setBankAccount] = useState({})

  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  })
  const [completed, setCompleted] = useState(false)

  const increaseStep = () => {
    setActiveStep(activeStep + 1)
  }

  useEffect(() => {
    // TODO: 회원가입 API 호출
    if (completed) {
      console.log('completed!!!')
    }
  }, [completed])

  return (
    <>
      <Box width={'100%'} marginTop={'30px'} marginBottom={'40px'}>
        <Link to={'/'}>
          <Flex alignItems={'center'} fontFamily={"'Pretendard-Bold'"}>
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
              checkCompleted={setCompleted}
            />
          )}
        </VStack>
      </HStack>
    </>
  )
}

export default SignUp
