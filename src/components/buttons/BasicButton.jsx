import React from 'react'
import { Button } from '@chakra-ui/react'

function BasicButton(props) {
  const { children } = props
  return (
    <>
      <Button
        bgColor={props.bgColor}
        color={props.color}
        size={props.size}
        width={props.width}
        height={props.height}
        variant={'solid'}
        fontSize={props.fontSize}
        borderRadius={10}
        onClick={props.onClick}
        isDisabled={props.isDisabled}
      >
        {children}
      </Button>
    </>
  )
}

BasicButton.propTypes = {}

export default BasicButton
