import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Box,
  Flex,
  Checkbox,
  Image,
  Link,
  Stack,
} from '@chakra-ui/react'
import BasicButton from '../buttons/BasicButton'
import axios from 'axios'
import { getAccessToken } from '../../utils/tokenStore'
import { useNavigate } from 'react-router-dom'

const BASE_URL = import.meta.env.VITE_BASE_URL

const ApplyModal = ({
  responseData,
  isOpen,
  onClose,
  formatDate,
  userInfoData,
  flightInsuranceId,
}) => {
  const [checkedItems, setCheckedItems] = React.useState([false, false])

  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked
  const accessToken = getAccessToken()
  const navigate = useNavigate()

  const handleConnect = async () => {
    if (!allChecked) {
      alert('필수 항목의 동의여부를 확인해 주세요.')
    } else {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/v1/flight-insurance-subscriptions`,
          {
            flightInsuranceId: flightInsuranceId,
            coverageStartAt: responseData.coverageStartAt,
            coverageEndAt: responseData.coverageEndAt,
            totalPremium: responseData.premium,
            coverageDetailsTermsContent: checkedItems[0],
            consentPersonalInfo: checkedItems[1],
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        if (response.status === 200) {
          window.location.href = responseData.companyUrl
        }
      } catch (error) {
        if (error.response.status >= 400 && error.response.status < 600) {
          alert('로그인 정보를 불러오는데 실패했습니다. 다시 로그인해주세요.')
          navigate('/flight-insurance')
        }
      }
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose(onClose)
        setCheckedItems([false, false])
      }}
    >
      <ModalOverlay />
      <ModalContent maxW={'550px'}>
        <ModalHeader>
          <Flex mx={10} mt={10}>
            <Flex justifyContent={'center'}>
              <Image
                borderRadius="full"
                boxSize="100px"
                src={responseData?.logoImageUrl}
              />
              <Flex flexDirection={'column'} justifyContent={'center'} pl={10}>
                <Text fontSize="2xl">{responseData?.companyName}</Text>
                <Text fontSize="3xl" fontWeight="bold">
                  {responseData?.insuranceName}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Flex flexDirection={'column'} px={'50px'} py={8}>
            <Flex justifyContent={'space-between'} flexDirection={'row'}>
              <Text fontWeight={'bold'}>가입 시작일</Text>
              <Text fontWeight={'bold'}>
                {formatDate(responseData?.coverageStartAt)}
              </Text>
            </Flex>
            <Flex
              justifyContent={'space-between'}
              flexDirection={'row'}
              mt={'20px'}
            >
              <Text fontWeight={'bold'}>가입 종료일</Text>
              <Text fontWeight={'bold'}>
                {formatDate(responseData?.coverageEndAt)}
              </Text>
            </Flex>
            <Flex
              justifyContent={'space-between'}
              flexDirection={'row'}
              mt={'20px'}
            >
              <Text fontWeight={'bold'}>가입자</Text>
              <Text
                fontWeight={'bold'}
              >{`${userInfoData.name} (${userInfoData.gender === 'MALE' ? '남성' : '여성'})`}</Text>
            </Flex>
            <Flex
              justifyContent={'space-between'}
              flexDirection={'row'}
              mt={'20px'}
            >
              <Text fontWeight={'bold'}>생년월일</Text>
              <Text fontWeight={'bold'}>{userInfoData.birthDay}</Text>
            </Flex>
            <Flex justifyContent={'center'} mt={'30px'}>
              <Box
                bgColor={'gray.50'}
                h={'60px'}
                w={'100%'}
                borderRadius={'10px'}
              >
                <Flex
                  justifyContent={'space-between'}
                  px={'10px'}
                  alignItems={'center'}
                  mt={'12px'}
                >
                  <Text fontSize={'23px'} fontWeight={'bold'}>
                    예상 보험료
                  </Text>
                  {responseData?.premium && (
                    <Text fontSize={23} fontWeight={'bold'}>
                      {`${responseData.premium.toLocaleString()}원`}
                    </Text>
                  )}
                </Flex>
              </Box>
            </Flex>
            <Flex flexDirection={'column'} pt={'50px'}>
              <Checkbox
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                borderColor={'gray.100'}
                onChange={(e) => {
                  return setCheckedItems([e.target.checked, e.target.checked])
                }}
              >
                <Text fontSize={'16px'}>모든 필수 항목에 대한 전체 동의</Text>
              </Checkbox>
              <Stack pl={6} mt={1} spacing={1}>
                <Checkbox
                  borderColor={'gray.100'}
                  isChecked={checkedItems[0]}
                  onChange={(e) => {
                    return setCheckedItems([e.target.checked, checkedItems[1]])
                  }}
                >
                  <Text fontSize={'16px'}>
                    (필수) 가입하는 보험의 보장내용, 주요내용 확인 동의
                  </Text>
                </Checkbox>
                <Checkbox
                  borderColor={'gray.100'}
                  isChecked={checkedItems[1]}
                  onChange={(e) => {
                    return setCheckedItems([checkedItems[0], e.target.checked])
                  }}
                >
                  <Text fontSize={'16px'}>
                    (필수) 개인정보 수집 및 이용, 제3자 제공 동의
                  </Text>
                </Checkbox>
              </Stack>
            </Flex>
          </Flex>
        </ModalBody>
        <Flex justifyContent={'center'} px={10} pb={8}>
          <ModalFooter>
            <BasicButton
              height={50}
              width={'470px'}
              bgColor={'main'}
              color={'white'}
              _hover={{}}
              onClick={handleConnect}
            >
              <Link>보험사로 연결</Link>
            </BasicButton>
          </ModalFooter>
        </Flex>
      </ModalContent>
    </Modal>
  )
}

export default ApplyModal
