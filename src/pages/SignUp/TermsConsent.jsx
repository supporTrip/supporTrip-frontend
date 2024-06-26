import { Box, Checkbox, CheckboxGroup, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const TermsConsent = ({
  terms,
  checkedItems,
  setCheckedItems,
  checkCompleted,
  ...props
}) => {
  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked

  const isCompleted = (newCheckedItems) => {
    return terms.every((term, i) => {
      return !term.isNecessary || newCheckedItems[i]
    })
  }

  const handleCheckboxChange = (index) => {
    return (e) => {
      const newCheckedItems = [...checkedItems]
      newCheckedItems[index] = e.target.checked
      setCheckedItems(newCheckedItems)
      checkCompleted(isCompleted(newCheckedItems))
    }
  }

  const handleCheckAllCheckboxChange = (e) => {
    const newCheckedItems = Array(terms.length).fill(e.target.checked)
    setCheckedItems(newCheckedItems)
    checkCompleted(isCompleted(newCheckedItems))
  }

  return (
    <Box alignSelf={'flex-start'} {...props}>
      <CheckboxGroup size="lg">
        <VStack spacing={[1, 5]} direction={['column']} color={'gray.500'}>
          <Checkbox
            fontFamily={'Pretendard-Bold'}
            colorScheme="teal"
            alignSelf={'flex-start'}
            borderColor={'gray.300'}
            isChecked={allChecked}
            isIndeterminate={isIndeterminate}
            onChange={handleCheckAllCheckboxChange}
          >
            <Text fontSize={'md'}>약관 전체 동의하기(선택 동의 포함)</Text>
          </Checkbox>
          {terms.map((term, index) => {
            return (
              <Checkbox
                key={index}
                fontFamily={'Pretendard-SemiBold'}
                // TODO: mint.400으로 변경
                colorScheme="teal"
                borderColor={'gray.300'}
                alignSelf={'flex-start'}
                isChecked={checkedItems[index]}
                onChange={handleCheckboxChange(index)}
              >
                <Text fontSize={'md'}>
                  <Box as="span" color={term.isNecessary && 'mint.400'}>
                    {term.isNecessary ? '[필수] ' : '[선택] '}
                  </Box>
                  {term.title}
                </Text>
              </Checkbox>
            )
          })}
        </VStack>
      </CheckboxGroup>
    </Box>
  )
}

export default TermsConsent
