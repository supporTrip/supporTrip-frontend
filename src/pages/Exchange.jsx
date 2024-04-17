import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TicketCard from '../components/cards/TicketCard'
import ClickCursor from '../images/click-cursor.svg'

const dummy = [
  {
    title: '첫 휴가 기념 LA 여행',
    ticket: '006 594269C1',
    originCash: '500000',
    originCurrency: '원',
    remainCash: '250000',
    originCentury: '대한민국',
    exchangeCash: '371.47',
    exchangeCurrency: '달러',
    exchangeCentury: '미국',
    createdAt: '2024.03.25',
    endDate: '2024.12.24',
    type: '적극투자형',
  },
  {
    title: '퇴사 기념 일본~',
    ticket: '006 594269C1',
    originCash: '500000',
    originCurrency: '원',
    remainCash: '500000',
    originCentury: '대한민국',
    exchangeCash: '350000',
    exchangeCurrency: '엔',
    exchangeCentury: '일본',
    createdAt: '2024.03.01',
    endDate: '2024.12.10',
    type: '안전형',
  },
  {
    title: '놀러가고 싶다~~',
    ticket: '006 594269C1',
    originCash: '500000',
    originCurrency: '원',
    remainCash: '123944',
    originCentury: '대한민국',
    exchangeCash: '371.47',
    exchangeCurrency: '달러',
    exchangeCentury: '베트남',
    createdAt: '2024.03.25',
    endDate: '2024.12.24',
    type: '적극투자형',
  },
  {
    title: '야~~~호~~~~~',
    ticket: '006 594269C1',
    originCash: '500000',
    originCurrency: '원',
    remainCash: '500',
    originCentury: '대한민국',
    exchangeCash: '371.47',
    exchangeCurrency: '달러',
    exchangeCentury: '태국',
    createdAt: '2024.03.25',
    endDate: '2024.12.24',
    type: '위험투자형',
  },
]
const Exchange = () => {
  return <>Exchange</>
}
export default Exchange
