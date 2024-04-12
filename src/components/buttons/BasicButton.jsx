import React, { Children } from 'react'
import { Button, ButtonGroup, Box } from '@chakra-ui/react'

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
        border={props.border}
        _hover={props._hover}
      >
        {children}
      </Button>
    </>
  )
}

BasicButton.propTypes = {}

export default BasicButton
