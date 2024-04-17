import React, { useState } from 'react'
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
  const [userInfo, setUserInfo] = useState({})
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  })

  const increaseStep = () => {
    setActiveStep(activeStep + 1)
  }

  const changeUserInfo = (userInfo) => {
    setUserInfo(userInfo)
    increaseStep()
  }

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
          {activeStep === 1 && <UserInfoForm setUserInfo={changeUserInfo} />}
          {activeStep === 2 && <>휴대폰 인증</>}
        </VStack>
      </HStack>
    </>
  )
}

export default SignUp
