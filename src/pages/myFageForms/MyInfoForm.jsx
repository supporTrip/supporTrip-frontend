import {
  Box,
  Flex,
  Text,
  Image,
  useDisclosure,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import TableCard from '../../components/cards/TableCard'
import BasicButton from '../../components/buttons/BasicButton'
import { format } from 'date-fns'
import BasicModal from '../../components/modals/BasicModal'
import axios from 'axios'
import { getAccessToken } from '../../utils/tokenStore'
import LoadingPage from '../LoadingPage'
import ValidationInput from '../../components/forms/ValidationInput'

const BASE_URL = import.meta.env.VITE_BASE_URL

function MyInfoForm() {
  const [userData, setUserData] = useState()
  const accessToken = getAccessToken()
  const [isLoading, setIsLoading] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [formData, setFormData] = useState({
    phoneNumber: null,
    email: null,
    bankCode: null,
    accountNum: null,
    receiveStatus: null,
  })
  const [validationResults, setValidationResults] = useState({
    phoneNumber: '',
    email: '',
    bankCode: '',
    accountNum: '',
  })
  const banks = [
    {
      name: '우리',
      value: 'WOORI',
    },
    {
      name: '신한',
      value: 'SHINHAN',
    },
    {
      name: '국민',
      value: 'KB',
    },
    {
      name: '하나',
      value: 'HANA',
    },
    {
      name: '기업',
      value: 'IBK',
    },
    {
      name: '농협',
      value: 'NH',
    },
    {
      name: '수협',
      value: 'SH',
    },
    {
      name: 'SC제일',
      value: 'SC',
    },
  ]
  const [modalTitle, setModalTitle] = useState('')
  const handleBankChange = (e) => {
    const bankCode = e.target.value
    setFormData({
      ...formData,
      bankCode,
    })
    validateField(bankCode, 'bankCode')
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/mypages`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setUserData(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error('내 정보 조회 실패:', error)
    }
  }

  const handleReceiveClick = async (status) => {
    try {
      setFormData({
        ...formData,
        receiveStatus: status,
      })
      const apiUrl = `${BASE_URL}/api/v1/mypages`
      const response = await axios.patch(
        apiUrl,
        {
          receiveStatus: status,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      console.log('업데이트 완료')
      fetchUserData()
    } catch (error) {
      console.error('업데이트 실패:', error)
    }
  }

  const handleSubmit = async () => {
    const isFormValid = Object.values(validationResults).every((result) => {
      return result === ''
    })
    if (isFormValid) {
      const sanitizedFormData = {
        phoneNumber: formData.phoneNumber || null,
        email: formData.email || null,
        bankAccounts:
          {
            bankCode: formData.bankCode || null,
            accountNum: formData.accountNum || null,
          } || null,
        receiveStatus: formData.receiveStatus,
      }
      let apiUrl = `${BASE_URL}` + '/api/v1/mypages'

      try {
        const response = await axios.patch(apiUrl, sanitizedFormData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        console.log('업데이트 완료')
        fetchUserData()
        onClose()
      } catch (error) {
        console.error('업데이트 실패:', error)
      }
    } else {
      console.log('Form has validation errors')
    }
  }

  const handleModalOpen = (title) => {
    setModalTitle(title)
    setFormData({})
    setValidationResults({})
    onOpen()
  }

  const handleInputChange = (e, field) => {
    const { value } = e.target
    setFormData({
      ...formData,
      [field]: value,
    })
    validateField(value, field)
  }

  const validateField = (value, field) => {
    let errorMessage = ''
    switch (field) {
      case 'phoneNumber':
        errorMessage = !value.match(/^\d{3}-\d{4}-\d{4}$/)
          ? '휴대번호를 올바른 형식으로 입력하세요 (000-0000-0000)'
          : ''
        break
      case 'email':
        errorMessage = !value.match(
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        )
          ? '유효한 이메일을 입력하세요'
          : ''
        break
      case 'bankCode':
        errorMessage = value.length < 2 ? '은행 코드를 입력하세요' : ''
        break
      case 'accountNum':
        validateBankAccountNumber(value)
        return
      default:
        break
    }
    setValidationResults({
      ...validationResults,
      [field]: errorMessage,
    })
  }

  const validateBankAccountNumber = (accountNumber) => {
    setValidationResults({ ...validationResults, accountNum: '' })

    if (!accountNumber.trim()) {
      setValidationResults({
        ...validationResults,
        accountNum: '계좌번호를 입력해주세요',
      })
      return
    }

    if (!/^\d+$/.test(accountNumber)) {
      setValidationResults({
        ...validationResults,
        accountNum: '숫자만 입력해주세요',
      })
      return
    }

    if (accountNumber.length < 10 || accountNumber.length > 14) {
      setValidationResults({
        ...validationResults,
        accountNum: '10자리에서 14자리 사이의 숫자로 입력해주세요',
      })
      return
    }
  }

  return (
    <>
      {isLoading ? (
        <LoadingPage></LoadingPage>
      ) : (
        <Flex width="100%" flex={1} direction={'column'}>
          <Flex direction="column" flex={1}>
            <Flex alignItems="baseline" borderBottom="2px solid" pb={5}>
              <Text
                fontSize={'xl'}
                mr={3}
                fontWeight={'bold'}
                letterSpacing={2}
              >
                기본 회원정보
              </Text>
              <span>
                <Text fontSize={'xs'} color={'gray.400'}>
                  수정불가
                </Text>
              </span>
            </Flex>
            <BasicModal
              isOpen={isOpen}
              onClose={onClose}
              title={modalTitle}
              buttonName="확인"
              onClick={handleSubmit}
              buttonColor="blue.400"
              buttonTextColor="white"
            >
              {modalTitle === '휴대번호 변경' && (
                <FormControl mb={4}>
                  <FormLabel>새로운 휴대번호</FormLabel>
                  <ValidationInput
                    placeholder="휴대번호를 입력하세요 (000-0000-0000)"
                    handleChange={(e) => {
                      return handleInputChange(e, 'phoneNumber')
                    }}
                    validationError={validationResults.phoneNumber}
                  />
                </FormControl>
              )}
              {modalTitle === '이메일 변경' && (
                <FormControl mb={4}>
                  <FormLabel>새로운 이메일 주소</FormLabel>
                  <ValidationInput
                    placeholder="이메일을 입력하세요"
                    handleChange={(e) => {
                      return handleInputChange(e, 'email')
                    }}
                    validationError={validationResults.email}
                  />
                </FormControl>
              )}
              {modalTitle === '연결계좌 관리' && (
                <>
                  <FormControl mb={4}>
                    <FormLabel>계좌 번호</FormLabel>
                    <ValidationInput
                      placeholder="계좌 번호를 입력하세요"
                      handleChange={(e) => {
                        return handleInputChange(e, 'accountNum')
                      }}
                      validationError={validationResults.accountNum}
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>은행</FormLabel>
                    <Select
                      width={'150px'}
                      placeholder="은행 선택"
                      _placeholder={{ color: 'gray.200' }}
                      onChange={handleBankChange}
                    >
                      {banks.map((bank) => {
                        return (
                          <option key={bank.value} value={bank.value}>
                            {bank.name}
                          </option>
                        )
                      })}
                    </Select>
                  </FormControl>
                </>
              )}
            </BasicModal>
            <Flex
              borderBottom="1px solid"
              borderColor={'gray.200'}
              pt={5}
              pb={5}
            >
              <Box width={200}>
                <Text>프로필사진</Text>
              </Box>
              <Image
                borderRadius="full"
                boxSize="100px"
                src={userData?.profilePic}
                alt="프로필 사진"
              />
            </Flex>
            <TableCard title="이름(실명)" content={userData?.name}></TableCard>
            <TableCard
              title="생년월일"
              content={format(userData?.birthDate, 'yyyy년 MM월 dd일')}
            ></TableCard>
            <TableCard title="성별" content={userData?.gender}></TableCard>
            <TableCard
              title="가입일자"
              content={userData?.registrationDate}
            ></TableCard>
          </Flex>

          <Flex direction="column" flex={1} mt={20}>
            <Flex alignItems="baseline" borderBottom="2px solid" pb={5}>
              <Text
                fontSize={'xl'}
                mr={3}
                fontWeight={'bold'}
                letterSpacing={2}
              >
                추가 회원정보
              </Text>
              <span>
                <Text fontSize={'xs'} color={'gray.400'}>
                  수정가능
                </Text>
              </span>
            </Flex>
            <TableCard title="휴대번호" content={userData?.phoneNumber}>
              <BasicButton
                size="sm"
                onClick={() => {
                  return handleModalOpen('휴대번호 변경')
                }}
              >
                휴대번호 변경
              </BasicButton>
            </TableCard>
            <TableCard title="이메일" content={userData?.email}>
              <BasicButton
                size="sm"
                onClick={() => {
                  return handleModalOpen('이메일 변경')
                }}
              >
                이메일 변경
              </BasicButton>
            </TableCard>
            <TableCard title="연결계좌" content={userData?.bankAccount}>
              <BasicButton
                size="sm"
                onClick={() => {
                  return handleModalOpen('연결계좌 관리')
                }}
              >
                연결계좌 관리
              </BasicButton>
            </TableCard>
            <Flex
              borderBottom="1px solid"
              borderColor={'gray.200'}
              pt={5}
              pb={5}
            >
              <Box width={200}>
                <Text>수신여부</Text>
              </Box>
              <Box width={200}>
                <BasicButton
                  borderColor={'gray.200'}
                  borderRadius={'10px 0px 0px 10px'}
                  border={'1px solid'}
                  color={userData?.receiveStatus ? 'main' : 'gray.200'}
                  bgColor={'white'}
                  _hover={{ color: 'main' }}
                  onClick={() => {
                    handleReceiveClick(true)
                  }}
                >
                  ON
                </BasicButton>
                <BasicButton
                  borderRadius={'0px 10px 10px 0px'}
                  color={!userData?.receiveStatus ? 'main' : 'gray.200'}
                  border={'1px solid'}
                  bgColor={'white'}
                  _hover={{ color: 'main' }}
                  onClick={() => {
                    handleReceiveClick(false)
                  }}
                >
                  OFF
                </BasicButton>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  )
}

export default MyInfoForm
