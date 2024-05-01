import { Flex, Img } from '@chakra-ui/react'
import React from 'react'
import mainImg from '../images/supportripMain.svg'

const Home = () => {
  return (
    <>
      <Flex height={700}>
        <Img src={mainImg}></Img>
      </Flex>
    </>
  )
}

export default Home
