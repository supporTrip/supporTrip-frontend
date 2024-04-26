import {
  Box,
  HStack,
  Image,
  Text,
  Input,
  Button,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react'
import InfoIcon from '../../images/info-icon.svg'
import React, { useEffect, useState } from 'react'
import BasicButton from '../../components/buttons/BasicButton'
import { getAccessToken } from '../../utils/tokenStore'
import axios from 'axios'

const DEFAULT_TIMER_DURATION = 2 * 60

const BASE_URL = import.meta.env.VITE_BASE_URL

const SmsVerification = ({ goNextStep }) => {
  const [time, setTime] = useState(DEFAULT_TIMER_DURATION)
  const [timerOn, setTimerOn] = useState(true)

  const [verificationCode, setVerificationCode] = useState('')

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value)
  }

  const checkEmptyVerificationCode = () => {
    return verificationCode === ''
  }

  const handleClickButton = () => {
    const accessToken = getAccessToken()

    axios
      .patch(
        `${BASE_URL}/api/v1/users/phone-verification`,
        {
          code: verificationCode,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } },
      )
      .then((response) => {
        if (response.status === 200) {
          alert('SMS 인증에 성공했습니다')
          sessionStorage.removeItem('smsVerification')
          goNextStep()
        }
      })
      .catch((error) => {
        console.error(error)
        alert('SMS 인증에 실패했습니다')
      })
  }

  const handleClickResendButton = () => {
    const accessToken = getAccessToken()
    const smsVerification = JSON.parse(
      sessionStorage.getItem('smsVerification'),
    )

    axios
      .put(`${BASE_URL}/api/v1/users/phone-verification`, smsVerification, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          alert('인증번호가 재전송되었습니다.')
          setTime(DEFAULT_TIMER_DURATION)
          setTimerOn(true)
        }
      })
      .catch((error) => {
        console.error(error)
        alert('인증번호 재전송에 실패했습니다.')
      })
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    const formattedMinutes = minutes.toString()
    const formattedSeconds = seconds.toString().padStart(2, '0')
    return `${formattedMinutes}:${formattedSeconds}`
  }

  useEffect(() => {
    let interval
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            setTimerOn(false)
          }
          return prevTime - 1
        })
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => {
      return clearInterval(interval)
    }
  }, [timerOn])

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
          <Text fontSize={'14px'}>전달 받은 인증번호를 입력해주세요</Text>
        </HStack>
      </Box>

      <InputGroup width={'100%'} marginTop={'20px'} marginBottom={'30px'}>
        <Input
          pr="4.5rem"
          placeholder="인증번호"
          onChange={handleVerificationCodeChange}
        />
        <InputRightElement width="4.5rem">
          {timerOn ? (
            <Box fontSize={'14px'} color={'gray.500'}>
              {formatTime(time)}
            </Box>
          ) : (
            <Button
              h="1.75rem"
              size="sm"
              fontSize={'12px'}
              color={'gray.600'}
              onClick={handleClickResendButton}
            >
              재전송
            </Button>
          )}
        </InputRightElement>
      </InputGroup>

      <BasicButton
        marginTop="20px"
        width="100%"
        bgColor="mint.400"
        color="white"
        onClick={handleClickButton}
        isDisabled={checkEmptyVerificationCode()}
      >
        확인
      </BasicButton>
    </>
  )
}

export default SmsVerification
