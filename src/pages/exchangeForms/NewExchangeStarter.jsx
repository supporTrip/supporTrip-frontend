import { Divider, Flex } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HorizontalStepper from '../../components/steppers/HorizontalStepper'
import { getAccessToken } from '../../utils/tokenStore'
import BasicInfoForm from './BasicInfoForm'
import FinalCheckForm from './FinalCheckForm'
import MoneyInfoForm from './MoneyInfoForm'
import TicketCheckForm from './TicketCheckForm'
import TypeSelectionForm from './TypeSelectionForm'

const BASE_URL = import.meta.env.VITE_BASE_URL

const initExchangeData = {
  airplainCertifactionId: null,
  ticketPnrNumber: null,
  departAt: null,

  displayName: '',
  completeDate: null,
  targetCurrencyId: null,
  targetCurrencyName: null,

  tradingAmount: null,
  startingExchangeRateId: null,
  startingExchangeRate: null,
  startingExchangeUnit: null,

  strategy: null,
  targetExchangeRate: null,
  point: null,
  availablePoint: null,
}

const NewExchangeStarter = () => {
  const navigate = useNavigate()
  const [exchangeData, setExchangeData] = useState(initExchangeData)
  const [exchangeableCurrencies, setExchangeableCurrencies] = useState([])
  const [currentStep, setCurrentStep] = useState(1)
  const totalStep = 5
  const accessToken = getAccessToken()

  console.log('exchangeData ', exchangeData)

  useEffect(() => {
    if (exchangeableCurrencies.length === 0) {
      getExchangeableCurrencies()
    }
  }, [])

  const getExchangeableCurrencies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/exchange/currency`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (response.status === 200) {
        const data = response.data
        setExchangeableCurrencies(data.currencies)
      }
    } catch (error) {
      console.error(error)
    }
  }

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

  const requestNewExchange = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/exchange/create`,
        {
          displayName: exchangeData.displayName,
          airplainCertifactionId: exchangeData.airplainCertifactionId,
          targetCurrencyId: exchangeData.targetCurrencyId,
          tradingAmount: exchangeData.tradingAmount,
          strategy: exchangeData.strategy.code,
          targetExchangeRate: exchangeData.targetExchangeRate,
          startingExchangeRateId: exchangeData.startingExchangeRateId,
          completeDate: exchangeData.completeDate,
          point: exchangeData.point,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )

      if (response.status === 200) {
        navigate('/new-exchange/thankyou')
        return
      }
      navigate('/new-exchange/sorry')
    } catch (error) {
      console.error(error)
    }
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
      if (e.data === 'success') {
        popup.close()
        requestNewExchange()
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
            exchangeableCurrencies={exchangeableCurrencies}
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
