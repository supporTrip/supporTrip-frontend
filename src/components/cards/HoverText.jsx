import { Text, Tooltip } from '@chakra-ui/react'
import React from 'react'

function HoverText(props) {
  const { title, content, maxLength, textColor } = props
  const isOverflowing = content.length > parseInt(maxLength, 10)

  return (
    <>
      {isOverflowing ? (
        <Tooltip label={content} placement="top">
          <Text
            color={textColor}
            fontWeight={title ? 'bold' : 'normal'}
            noOfLines={1}
          >
            {content}
          </Text>
        </Tooltip>
      ) : (
        <Text
          color={textColor}
          fontWeight={title ? 'bold' : 'normal'}
          noOfLines={1}
        >
          {content}
        </Text>
      )}
    </>
  )
}

export default HoverText
