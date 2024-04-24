import { Divider, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HorizontalStepper from '../../components/steppers/HorizontalStepper'
import BasicInfoForm from './BasicInfoForm'
import FinalCheckForm from './FinalCheckForm'
import MoneyInfoForm from './MoneyInfoForm'
import TicketCheckForm from './TicketCheckForm'
import TypeSelectionForm from './TypeSelectionForm'

const initExchangeData = {
  airplainCertifactionId: null,
  ticketPnrNumber: null,
  departAt: null,
  startDate: null,
  endDate: null,
  krw: null,
  foreignCurrency: null,
  expectedExchange: null,
  type: null,
  targetExchangeRate: null,
  point: null,
}

const NewExchangeStarter = () => {
  const navigate = useNavigate()
  const [exchangeData, setExchangeData] = useState(initExchangeData)
  const [currentStep, setCurrentStep] = useState(1)
  const totalStep = 5

  const updateExchangeData = (data) => {
    setExchangeData((prevData) => {
      return {
        ...prevData,
        ...data,
      }
    })
  }

  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const previousStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const toTransactionSuccessPage = () => {
    navigate('/new-exchange/thankyou')
  }

  const popUpPinNumber = () => {
    const width = 360
    const height = 620
    const left = window.screenX + (window.outerWidth - width) / 2
    const top = window.screenY + (window.outerHeight - height) / 2

    const popup = window.open(
      '/new-exchange/payment',
      '_blank',
      `width=${width},height=${height},left=${left},top=${top}`,
    )

    window.addEventListener('message', (e) => {
      if (e.data === 'closePopup') {
        popup.close()
        toTransactionSuccessPage()
      }
    })
  }

  return (
    <Flex minH={'full'} justifyContent={'center'} alignItems={'center'}>
      <Flex
        direction={'column'}
        minW={'700px'}
        maxW={'700px'}
        minH={'600px'}
        my={20}
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
          <TicketCheckForm
            previousStep={previousStep}
            nextStep={nextStep}
            exchangeData={exchangeData}
            updateExchangeData={updateExchangeData}
          />
        )}
        {currentStep === 2 && (
          <BasicInfoForm
            previousStep={previousStep}
            nextStep={nextStep}
            exchangeData={exchangeData}
            updateExchangeData={updateExchangeData}
          />
        )}
        {currentStep === 3 && (
          <MoneyInfoForm
            previousStep={previousStep}
            nextStep={nextStep}
            exchangeData={exchangeData}
            updateExchangeData={updateExchangeData}
          />
        )}
        {currentStep === 4 && (
          <TypeSelectionForm
            previousStep={previousStep}
            nextStep={nextStep}
            exchangeData={exchangeData}
            updateExchangeData={updateExchangeData}
          />
        )}
        {currentStep === 5 && (
          <FinalCheckForm
            previousStep={previousStep}
            nextStep={popUpPinNumber}
            exchangeData={exchangeData}
            updateExchangeData={updateExchangeData}
          />
        )}
      </Flex>
    </Flex>
  )
}

export default NewExchangeStarter
