import { Box, Flex, chakra } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React from 'react'

const MotionBox = chakra(motion.div, {})

const HorizontalStepper = ({ totalStep, currentStep, width }) => {
  return (
    <Flex w={width} p={'10px'} justifyContent={'center'} alignItems={'center'}>
      {Array.from({ length: totalStep }, (_, index) => {
        return index + 1
      }).map((step) => {
        const delay = step === currentStep ? (currentStep === 1 ? 0 : 1) : 0

        return (
          <Flex key={step} flex={step !== totalStep && 1} alignItems={'center'}>
            <Flex
              justifyContent={'center'}
              alignItems={'center'}
              w={'40px'}
              h={'40px'}
              borderRadius={'100%'}
              bgColor={step <= currentStep ? 'main' : 'gray.100'}
              color={step <= currentStep ? 'white' : 'gray.500'}
              fontSize={'lg'}
              transition={`0.5s linear ${delay}s`}
            >
              {step}
            </Flex>
            {step < totalStep && (
              <Box
                flex={1}
                h={'10px'}
                mx={2}
                bgColor={'gray.100'}
                borderRadius={'20px'}
              >
                <MotionBox
                  initial={{ width: '0%' }}
                  animate={{
                    width:
                      step < currentStep
                        ? '100%'
                        : step === currentStep
                          ? '50%'
                          : '0%',
                  }}
                  transition={`1s linear ${delay}s`}
                  bgColor={'main'}
                  borderRadius={'20px'}
                  height={'100%'}
                />
              </Box>
            )}
          </Flex>
        )
      })}
    </Flex>
  )
}

export default HorizontalStepper
