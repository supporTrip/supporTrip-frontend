import {
  Modal,
  Box,
  Button,
  Flex,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import BasicButton from '../buttons/BasicButton'
import axios from 'axios'
import { getAccessToken } from '../../utils/tokenStore'

const BASE_URL = import.meta.env.VITE_BASE_URL

const AddInsuranceModal = ({ isOpen, onClose, fetchInsurancesData }) => {
  const accessToken = getAccessToken()
  const [isClicked, setIsClicked] = useState([false, false, false])
  const [name, setName] = useState('')
  const [premium, setPremium] = useState('')
  const [minAge, setMinAge] = useState('')
  const [maxAge, setMaxAge] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [logoImageUrl, setLogoImageUrl] = useState('')
  const [companyUrl, setCompanyUrl] = useState('')
  const [contracts, setContracts] = useState([
    { name: '', description: '', standardPrice: '', advancedPrice: '' },
  ])

  const handleChangeCompanyImageUrl = (e) => {
    setLogoImageUrl(e.target.value)
  }

  const handleChangeCompanyName = (e) => {
    setCompanyName(e.target.value)
  }

  const handleChangeCompanyUrl = (e) => {
    setCompanyUrl(e.target.value)
  }

  const handleChangeInsuranceName = (e) => {
    setName(e.target.value)
  }

  const handleChangePremium = (e) => {
    setPremium(parseInt(e.target.value))
  }

  const handleChangeMinAge = (e) => {
    setMinAge(parseInt(e.target.value))
  }

  const handleChangeMaxAge = (e) => {
    setMaxAge(parseInt(e.target.value))
  }

  const handleChangeContractName = (e, index) => {
    const newContracts = [...contracts]
    newContracts[index].name = e.target.value
    setContracts(newContracts)
  }

  const handleChangeContractDescription = (e, index) => {
    const newContracts = [...contracts]
    newContracts[index].description = e.target.value
    setContracts(newContracts)
  }

  const handleChangeContractStandardPrice = (e, index) => {
    const newContracts = [...contracts]
    newContracts[index].standardPrice = parseInt(e.target.value)
    setContracts(newContracts)
  }

  const handleChangeContractAdvancedPrice = (e, index) => {
    const newContracts = [...contracts]
    newContracts[index].advancedPrice = parseInt(e.target.value)
    setContracts(newContracts)
  }

  const handleAddContract = () => {
    setContracts([
      ...contracts,
      { name: '', description: '', standardPrice: '', advancedPrice: '' },
    ])
  }

  const handleRemoveContract = (index) => {
    const newContracts = [...contracts]
    newContracts.splice(index, 1)
    setContracts(newContracts)
  }

  const handleCancel = () => {
    onClose()
  }

  const handleContractClick = (index) => {
    const updatedClicked = [...isClicked]
    updatedClicked[index] = !updatedClicked[index]
    setIsClicked(updatedClicked)
  }

  const handleSave = async () => {
    if (
      !name ||
      !premium ||
      !minAge ||
      !maxAge ||
      !companyName ||
      !logoImageUrl ||
      !companyUrl ||
      contracts.some((contract) => {
        return (
          !contract.name ||
          !contract.description ||
          !contract.standardPrice ||
          !contract.advancedPrice
        )
      })
    ) {
      alert('모든 필수 입력 필드를 정확히 작성해주세요.')
      return
    }
    const request = {
      name: name,
      premium: premium,
      minAge: minAge,
      maxAge: maxAge,
      flightDelay: isClicked[0],
      passportLoss: isClicked[1],
      foodPoisoning: isClicked[2],
      insuranceCompany: {
        name: companyName,
        logoImageUrl: logoImageUrl,
        insuranceCompanyUrl: companyUrl,
      },
      specialContracts: contracts,
    }
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/admin/flight-insurances`,
        request,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      if (response.status === 200) {
        onClose()
        fetchInsurancesData()
      }
    } catch (error) {
      if (error.response.status >= 400 && error.response.status < 600) {
        alert(error.response.data.message)
      }
      console.error(error)
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="10" bg="white" maxW={'600px'}>
          <ModalHeader alignSelf={'center'}>보험 상세 정보</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex py={5} px={5} flexDirection={'column'}>
              {/* 보험 상품 정보 표시 */}
              <Box mb={5}>
                <Flex
                  alignItems="center"
                  justifyContent={'space-between'}
                  mb={3}
                >
                  <Text fontSize={'20px'}>보험사 이미지 URL</Text>
                  <Input
                    flex={1}
                    maxW={'300px'}
                    onChange={handleChangeCompanyImageUrl}
                  />
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent={'space-between'}
                  mb={3}
                >
                  <Text fontSize={'20px'}>보험사 이름</Text>
                  <Input
                    flex={1}
                    maxW={'300px'}
                    onChange={handleChangeCompanyName}
                  />
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent={'space-between'}
                  mb={3}
                >
                  <Text fontSize={'20px'}>보험사 경로</Text>
                  <Input
                    flex={1}
                    maxW={'300px'}
                    onChange={handleChangeCompanyUrl}
                  />
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent={'space-between'}
                  mb={3}
                >
                  <Text fontSize={'20px'}>보험사 상품 이름</Text>
                  <Input
                    flex={1}
                    maxW={'300px'}
                    onChange={handleChangeInsuranceName}
                  />{' '}
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent={'space-between'}
                  mb={3}
                >
                  <Text fontSize={'20px'}>보험 가격</Text>
                  <Input
                    flex={1}
                    maxW={'300px'}
                    onChange={handleChangePremium}
                  />
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent={'space-between'}
                  mb={3}
                >
                  <Text fontSize={'20px'}>최소 가입 연령</Text>
                  <Input
                    flex={1}
                    maxW={'300px'}
                    onChange={handleChangeMinAge}
                  />
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent={'space-between'}
                  mb={3}
                >
                  <Text fontSize={'20px'}>최대 가입 연령</Text>
                  <Input
                    flex={1}
                    maxW={'300px'}
                    onChange={handleChangeMaxAge}
                  />
                </Flex>
              </Box>
              {/* 특약 정보 표시 */}
              <Box>
                <Text fontSize={'20px'} mb={3}>
                  특약 정보
                </Text>
                {contracts.map((contract, index) => {
                  return (
                    <Flex key={index} flexDirection="column" mb={3}>
                      <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                      >
                        <Text fontSize="16px">특약 명</Text>
                        <Input
                          flex={1}
                          maxW="300px"
                          value={contract.name}
                          onChange={(e) => {
                            return handleChangeContractName(e, index)
                          }}
                        />
                      </Flex>
                      <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                      >
                        <Text fontSize="16px">설명</Text>
                        <Input
                          flex={1}
                          maxW="300px"
                          value={contract.description}
                          onChange={(e) => {
                            return handleChangeContractDescription(e, index)
                          }}
                        />
                      </Flex>
                      <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                      >
                        <Text fontSize="16px">표준가격</Text>
                        <Input
                          flex={1}
                          maxW="300px"
                          value={contract.standardPrice || ''}
                          onChange={(e) => {
                            return handleChangeContractStandardPrice(e, index)
                          }}
                        />
                      </Flex>
                      <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                      >
                        <Text fontSize="16px">고급가격</Text>
                        <Input
                          flex={1}
                          maxW="300px"
                          value={contract.advancedPrice || ''}
                          onChange={(e) => {
                            return handleChangeContractAdvancedPrice(e, index)
                          }}
                        />
                      </Flex>
                      <Flex justifyContent="flex-end">
                        <Button
                          size="sm"
                          onClick={() => {
                            return handleRemoveContract(index)
                          }}
                        >
                          특약 삭제
                        </Button>
                      </Flex>
                    </Flex>
                  )
                })}
                <Flex justifyContent="center" mt={2}>
                  <Button onClick={handleAddContract}>특약 추가</Button>
                </Flex>
                <Flex justifyContent="center" mt={10}>
                  {[
                    { name: '항공기지연', value: false },
                    { name: '여권분실', value: false },
                    { name: '식중독', value: false },
                  ].map(({ name, value }, index) => {
                    const buttonColor = isClicked[index] ? 'main' : 'gray.200'
                    return (
                      <BasicButton
                        key={index}
                        marginRight={'15px'}
                        width={'100px'}
                        height={'30px'}
                        bgColor={buttonColor}
                        border={'1px solid'}
                        color={'white'}
                        _hover={{ color: 'white' }}
                        onClick={() => {
                          return handleContractClick(index)
                        }}
                      >
                        {name}
                      </BasicButton>
                    )
                  })}
                </Flex>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex px={'10px'} py={'10px'} justifyContent={'center'}>
              <Button colorScheme="blue" mr={3} onClick={handleSave}>
                생성
              </Button>
              <Button colorScheme="red" onClick={handleCancel}>
                닫기
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddInsuranceModal
