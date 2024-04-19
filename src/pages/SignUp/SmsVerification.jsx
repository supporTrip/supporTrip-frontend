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

const DEFAULT_TIMER_DURATION = 2 * 60

const SmsVerification = ({ goNextStep }) => {
  const [time, setTime] = useState(DEFAULT_TIMER_DURATION)
  const [timerOn, setTimerOn] = useState(false)

  const handleClickButton = () => {
    // TODO: SMS 인증 확인 API 호출
    alert('SMS 인증에 성공했습니다')
    goNextStep()
  }

  const handleClickResendButton = () => {
    // TODO: SMS 재전송 API 호출
    setTime(DEFAULT_TIMER_DURATION)
    setTimerOn(true)
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
        <Input pr="4.5rem" placeholder="인증번호" />
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
      >
        확인
      </BasicButton>
    </>
  )
}

export default SmsVerification
