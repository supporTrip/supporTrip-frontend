import { Divider, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BasicButton from '../../components/buttons/BasicButton'
import HorizontalStepper from '../../components/steppers/HorizontalStepper'
import BasicInputForm from './BasicInputForm'
import FinalCheckForm from './FinalCheckForm'
import MoneyInputForm from './MoneyInputForm'
import TicketCheckForm from './TicketCheckForm'
import TypeSelectionForm from './TypeSelectionForm'

const NewExchangeStarter = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const totalStep = 5

  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const previousStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const toTransactionSuccessPage = () => {
    navigate('/new-exchange/thankyou')
  }

  return (
    <Flex minH={'full'} justifyContent={'center'} alignItems={'center'}>
      <Flex
        direction={'column'}
        minW={'700px'}
        minH={'600px'}
        p={'70px'}
        bg={'white'}
        border={'1px solid'}
        borderColor={'gray.100'}
        borderRadius={'10px'}
      >
        <HorizontalStepper
          width={'100%'}
          totalStep={totalStep}
          currentStep={currentStep}
        ></HorizontalStepper>

        <Divider mb={'25px'} borderColor={'transparent'}></Divider>

        {currentStep === 1 && (
          <TicketCheckForm previousStep={previousStep} nextStep={nextStep} />
        )}
        {currentStep === 2 && (
          <BasicInputForm previousStep={previousStep} nextStep={nextStep} />
        )}
        {currentStep === 3 && (
          <MoneyInputForm previousStep={previousStep} nextStep={nextStep} />
        )}
        {currentStep === 4 && (
          <TypeSelectionForm previousStep={previousStep} nextStep={nextStep} />
        )}
        {currentStep === 5 && (
          <FinalCheckForm
            nextStep={() => {
              navigate('/new-exchange/thankyou')
            }}
          />
        )}

        <Flex
          w={'100%'}
          justifyContent={currentStep != 1 ? 'space-between' : 'flex-end'}
        >
          {currentStep != 1 && (
            <BasicButton
              bgColor={'gray.100'}
              color="gray.400"
              size={'lg'}
              width={'130px'}
              fontSize={'18px'}
              onClick={previousStep}
            >
              이전
            </BasicButton>
          )}
          <BasicButton
            bgColor={'main'}
            color="white"
            size={'lg'}
            width={currentStep !== totalStep ? '130px' : '220px'}
            fontSize={'18px'}
            onClick={
              currentStep !== totalStep ? nextStep : toTransactionSuccessPage
            }
          >
            {currentStep !== totalStep ? '다음' : '송금하고 거래 시작하기'}
          </BasicButton>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default NewExchangeStarter
