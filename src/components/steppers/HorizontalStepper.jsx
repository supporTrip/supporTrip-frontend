import { Box, Flex, chakra } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React from 'react'

const MotionBox = chakra(motion.div, {})

const HorizontalStepper = ({ totalStep, currentStep, width }) => {
  return (
    <Flex w={width} p={'10px'} justifyContent={'center'} alignItems={'center'}>
      {Array.from({ length: totalStep }, (_, index) => {
        return index + 1
      }).map((step, idx) => {
        return (
          <Flex key={idx} flex={step !== totalStep && 1} alignItems={'center'}>
            <Flex
              justifyContent={'center'}
              alignItems={'center'}
              w={'40px'}
              h={'40px'}
              borderRadius={'100%'}
              bgColor={step <= currentStep ? 'main' : 'gray.100'}
              color={step <= currentStep ? 'white' : 'gray.500'}
              fontSize={'lg'}
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
                {step < currentStep ? (
                  <Box
                    w={'100%'}
                    maxH={'100%'}
                    minH={'100%'}
                    bgColor={'main'}
                    borderRadius={'20px'}
                  ></Box>
                ) : (
                  step === currentStep && (
                    <Box
                      w={'50%'}
                      maxH={'100%'}
                      minH={'100%'}
                      bgColor={'main'}
                      borderRadius={'20px'}
                      transition={'1s ease'}
                    ></Box>
                  )
                )}
              </Box>
            )}
          </Flex>
        )
      })}
    </Flex>
  )
}

export default HorizontalStepper
