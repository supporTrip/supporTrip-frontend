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
        borderRadius={props.borderRadius || 10}
        onClick={props.onClick}
        border={props.border}
        _hover={props._hover}
        marginRight={props.marginRight}
        marginTop={props.marginTop}
        marginLeft={props.marginLeft}
        marginBottom={props.marginBottom}
      >
        {children}
      </Button>
    </>
  )
}

BasicButton.propTypes = {}

export default BasicButton
