import React from 'react'
import BasicButton from './BasicButton'

const ContractButton = ({ contract, isClicked, handleClick }) => {
  return (
    <span style={{ marginRight: '20px' }}>
      <BasicButton
        width="100px"
        height="30px"
        bgColor="white"
        border="1px solid"
        color={isClicked ? 'mint.200' : 'gray.200'}
        _hover={{ color: 'mint.200' }}
        onClick={handleClick} // 클릭 핸들러 전달
      >
        {contract}
      </BasicButton>
    </span>
  )
}

export default ContractButton
