import { Flex, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAccessToken } from '../utils/tokenStore'
import LoadingPage from './LoadingPage'
import ExchangeHistoryForm from './myFageForms/ExchangeHistoryForm'
import InsuranceApplicationForm from './myFageForms/InsuranceApplicationForm'
import MyInfoForm from './myFageForms/MyInfoForm'
import OverseasHistoryForm from './myFageForms/OverseasHistoryForm'
import PointHistoryForm from './myFageForms/PointHistoryForm'

const BASE_URL = import.meta.env.VITE_BASE_URL

const MyPage = () => {
  const [selectedMenu, setSelectedMenu] = useState('정보조회')
  const [apiUrl, setApiUrl] = useState(`${BASE_URL}` + '/api/v1/mypages')
  const accessToken = getAccessToken()
  const [isLoading, setIsLoading] = useState(true)
  const [responseData, setResponseData] = useState(null)
  const navigate = useNavigate()

  const fetchMyPageInfo = async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (response.status === 200) {
        const data = response.data
        setResponseData(data)
      }
    } catch (error) {
      if (error.response.status >= 400 && error.response.status < 600) {
        alert('알 수 없는 에러가 발생했습니다.\n잠시 후에 다시 시도해주세요.')
        navigate('/')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!accessToken) {
      alert('로그인 정보가 없습니다. 로그인 페이지로 이동합니다.')
      navigate('/signIn')
      return
    }
    fetchMyPageInfo()
  }, [accessToken, apiUrl])

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu)
    switch (menu) {
      case '정보조회':
        setApiUrl(`${BASE_URL}` + '/api/v1/mypages')
        break
      case '포인트내역':
        setApiUrl(`${BASE_URL}` + '/api/v1/mypages/points')
        break
      case '환전거래내역':
        setApiUrl(`${BASE_URL}` + '/api/v1/mypages/exchanges')
        break
      case '보험신청내역':
        setApiUrl(`${BASE_URL}` + '/api/v1/mypages/insurances')
        break
      default:
        break
    }
  }

  const getContentComponent = () => {
    switch (selectedMenu) {
      case '정보조회':
        return <MyInfoForm />
      case '포인트내역':
        return <PointHistoryForm data={responseData} />
      case '환전거래내역':
        return <ExchangeHistoryForm data={responseData} />
      case '보험신청내역':
        return <InsuranceApplicationForm data={responseData} />
      case '해외소비분석':
        return <OverseasHistoryForm></OverseasHistoryForm>
      default:
        return null
    }
  }
  return (
    <>
      {isLoading ? (
        <LoadingPage></LoadingPage>
      ) : (
        <Flex
          width={'100%'}
          height={'100%'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Flex
            width={'25%'}
            direction={'column'}
            overflowY="auto"
            height="700px"
            css={{ '&::-webkit-scrollbar': { display: 'none' } }}
            borderRight={'1px solid'}
            borderColor={'gray.100'}
            align={'left'}
          >
            <Text ml={10} fontSize={'xl'} fontWeight={'bold'} letterSpacing={2}>
              마이페이지
            </Text>
            {[
              '정보조회',
              '포인트내역',
              '환전거래내역',
              '보험신청내역',
              '해외소비분석',
            ].map((menu, index) => {
              return (
                <Text
                  key={index}
                  ml={10}
                  mt={8}
                  fontSize={'md'}
                  color={selectedMenu === menu ? 'main' : 'black'}
                  fontWeight={selectedMenu === menu ? 'bold' : 'normal'}
                  onClick={() => {
                    return handleMenuClick(menu)
                  }}
                  cursor="pointer"
                >
                  {menu}
                </Text>
              )
            })}
          </Flex>
          <Flex flex={1} px={10} height="700px" overflowY="auto">
            {getContentComponent()}
          </Flex>
        </Flex>
      )}
    </>
  )
}

export default MyPage
