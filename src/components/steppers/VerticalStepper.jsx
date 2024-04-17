import {
  Box,
  Stepper,
  Step,
  StepDescription,
  StepIndicator,
  StepNumber,
  StepStatus,
  StepTitle,
  HStack,
  Flex,
  Spacer,
  Circle,
} from '@chakra-ui/react'
import React from 'react'
import { CheckIcon } from '@chakra-ui/icons'

// TODO: 모든 SubStep의 과정이 완료됬을때 RootStep가 완료가 되도록 변경
const VerticalStepper = ({ steps, activeStep }) => {
  return (
    <HStack width={'160px'}>
      <Flex bg={'#D9D9D9'} borderRadius="20" padding={'5px'}>
        <Stepper index={activeStep} orientation="vertical" gap="3">
          {steps.map((step, index) => {
            return step.isSubStep ? (
              <SubStep key={index} step={step} isNow={activeStep === index} />
            ) : (
              <>
                {index !== 0 ? <Spacer /> : ''}
                <RootStep
                  key={index}
                  step={step}
                  isNow={activeStep === index}
                />
              </>
            )
          })}
        </Stepper>
      </Flex>
    </HStack>
  )
}

const RootStep = ({ step, isNow }) => {
  const StepCompleted = () => {
    return (
      <Circle bg={'mint.400'} width={'100%'} height={'100%'}>
        <CheckIcon />
      </Circle>
    )
  }

  const StepActive = () => {
    return (
      <Circle color={'mint.400'} width={'100%'} height={'100%'} border={'1px'}>
        <Circle bg={'mint.400'} width={'70%'} height={'70%'} />
      </Circle>
    )
  }

  return (
    <>
      <Step width={'32px'}>
        <StepIndicator bg="white">
          <StepStatus
            complete={<StepCompleted />}
            incomplete={<StepNumber>{step.stepNumber}</StepNumber>}
            active={<StepActive />}
          />
        </StepIndicator>

        <Box marginLeft="10px" flexShrink="0">
          <StepTitle
            paddingTop={'6px'}
            fontFamily={'Pretendard-Bold'}
            color={isNow && 'mint.400'}
          >
            {step.title}
          </StepTitle>
          <StepDescription>{step.description}</StepDescription>
        </Box>
      </Step>
    </>
  )
}

const SubStep = ({ step, isNow }) => {
  const StepCompleted = () => {
    return <Circle bg={'mint.400'} width={'100%'} height={'100%'} />
  }

  const StepActive = () => {
    return (
      <Circle color={'mint.400'} width={'100%'} height={'100%'} border={'1px'}>
        <Circle bg={'mint.400'} width={'70%'} height={'70%'} />
      </Circle>
    )
  }

  return (
    <>
      <Step width={'32px'} paddingLeft={'8px'}>
        <Flex>
          <StepIndicator bg="white" width={'15px'} height={'15px'}>
            <StepStatus complete={<StepCompleted />} active={<StepActive />} />
          </StepIndicator>
        </Flex>

        <Box marginLeft="30px" flexShrink="0">
          <StepTitle color={isNow && 'mint.400'}>{step.title}</StepTitle>
          <StepDescription>{step.description}</StepDescription>
        </Box>
      </Step>
    </>
  )
}

export default VerticalStepper
