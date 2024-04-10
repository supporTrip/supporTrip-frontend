import { Box, Divider, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import CheckTicketForm from './CheckTicketForm'

const steps = [
  { title: '', description: '' },
  { title: '', description: '' },
  { title: '', description: '' },
]

const NewExchange = () => {
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
        w={'700px'}
        h={'600px'}
        p={'70px'}
        bg={'white'}
        border={'1px solid'}
        borderColor={'gray.100'}
        borderRadius={'10px'}
      >
        <Box textAlign={'center'}>Stepper</Box>
        <Divider mt={'30px'} mb={'30px'}></Divider>
        {currentStep === 1 && <CheckTicketForm nextStep={nextStep} />}
      </Flex>
    </Flex>
  )
}

export default NewExchange
