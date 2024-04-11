import { Box, Divider, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CheckTicketForm from './CheckTicketForm'
import MoneyForm from './MoneyForm'
import SettingTransactionForm from './SettingTransactionForm'
import FinalCheckForm from './TransactionConfirmation'
import TypeForm from './TypeForm'
const steps = [
  { order: 1, title: '티켓 인증', description: '' },
  { order: 2, title: '거래 설정', description: '' },
  { order: 3, title: '환전 금액', description: '' },
  { order: 4, title: '거래 유형', description: '' },
  { order: 5, title: '최종 확인', description: '' },
]

const NewExchange = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)

  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const previousStep = () => {
    setCurrentStep(currentStep - 1)
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
        <Flex
          textAlign={'center'}
          border={'1px solid'}
          borderColor={'gray.100'}
          borderRadius={'40px'}
        >
          {steps.map((step, idx) => {
            return (
              <Box
                key={idx}
                flex={1}
                p={'20px'}
                borderLeft={idx !== 0 ? '1px solid' : ''}
                borderColor={'gray.100'}
                borderLeftRadius={idx === 0 ? '40px' : ''}
                borderRightRadius={idx === steps.length - 1 ? '40px' : ''}
                bg={step.order === currentStep ? 'main' : 'none'}
                color={step.order === currentStep ? 'white' : 'none'}
                fontFamily={
                  step.order === currentStep ? 'pretendard-bold' : 'none'
                }
              >
                {step.title}
              </Box>
            )
          })}
        </Flex>

        <Divider mt={'30px'} mb={'30px'} borderColor={'gray.200'}></Divider>
        {currentStep === 1 && <CheckTicketForm nextStep={nextStep} />}
        {currentStep === 2 && <SettingTransactionForm nextStep={nextStep} />}
        {currentStep === 3 && <MoneyForm nextStep={nextStep} />}
        {currentStep === 4 && <TypeForm nextStep={nextStep} />}
        {currentStep === 5 && (
          <FinalCheckForm
            nextStep={() => {
              navigate('/new-exchange/thankyou')
            }}
          />
        )}
      </Flex>
    </Flex>
  )
}

export default NewExchange
