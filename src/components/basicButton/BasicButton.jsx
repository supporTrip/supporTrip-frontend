import React, { Children } from 'react'
import { Button, ButtonGroup, Box } from '@chakra-ui/react'

function BasicButton(props) {
    const {children} = props
  return (
    <>
    <Button bgColor={props.bgColor} color={props.color} size={props.size} width={props.width} height={props.height} variant={props.variant} fontSize={props.fontSize} borderRadius={props.borderRadius}>
        {children}</Button>
    </>
    
  )
}

BasicButton.propTypes = {}

export default BasicButton
