import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import BasicButton from '../buttons/BasicButton'

const InsuranceModal = ({
  data,
  onClose,
  isOpen,
  onUpdate,
  onRemove,
  isClicked,
  setIsClicked,
}) => {
  const [updatedData, setUpdatedData] = useState({})

  const handleContractClick = (index) => {
    const updatedClicks = [...isClicked]
    updatedClicks[index] = !updatedClicks[index]
    setIsClicked(updatedClicks)
  }

  const handleUpdate = () => {
    onUpdate(updatedData)
    onClose()
  }

  const handleRemove = () => {
    onRemove(data.id)
    onClose()
  }

  useEffect(() => {
    setUpdatedData(data)
  }, [data])

  const handleChangeCompanyImageUrl = (e) => {
    const { value } = e.target
    setUpdatedData((prevData) => {
      return {
        ...prevData,
        insuranceCompany: {
          ...prevData.insuranceCompany,
          logoImageUrl: value,
        },
      }
    })
  }

  const handleChangeCompanyName = (e) => {
    const { value } = e.target
    setUpdatedData((prevData) => {
      return {
        ...prevData,
        insuranceCompany: {
          ...prevData.insuranceCompany,
          name: value,
        },
      }
    })
  }

  const handleChangeCompanyUrl = (e) => {
    const { value } = e.target
    setUpdatedData((prevData) => {
      return {
        ...prevData,
        insuranceCompany: {
          ...prevData.insuranceCompany,
          insuranceCompanyUrl: value,
        },
      }
    })
  }

  const handleChangeName = (e) => {
    const { value } = e.target
    setUpdatedData((prevData) => {
      return {
        ...prevData,
        name: value,
      }
    })
  }

  const handleChangePremium = (e) => {
    const { value } = e.target
    setUpdatedData((prevData) => {
      return {
        ...prevData,
        premium: parseInt(value, 10),
      }
    })
  }

  const handleChangeMinAge = (e) => {
    const { value } = e.target
    setUpdatedData((prevData) => {
      return {
        ...prevData,
        minAge: parseInt(value, 10),
      }
    })
  }

  const handleChangeMaxAge = (e) => {
    const { value } = e.target
    setUpdatedData((prevData) => {
      return {
        ...prevData,
        maxAge: parseInt(value, 10),
      }
    })
  }

  const handleChangeContractName = (e, contractIndex) => {
    const { value } = e.target
    setUpdatedData((prevData) => {
      const updatedSpecialContracts = [...prevData.specialContracts]
      updatedSpecialContracts[contractIndex].name = value
      return {
        ...prevData,
        specialContracts: updatedSpecialContracts,
      }
    })
  }

  const handleChangeContractDescription = (e, contractIndex) => {
    const { value } = e.target
    setUpdatedData((prevData) => {
      const updatedSpecialContracts = [...prevData.specialContracts]
      updatedSpecialContracts[contractIndex].description = value
      return {
        ...prevData,
        specialContracts: updatedSpecialContracts,
      }
    })
  }

  const handleChangeContractStandardPrice = (e, contractIndex) => {
    const { value } = e.target
    setUpdatedData((prevData) => {
      const updatedSpecialContracts = [...prevData.specialContracts]
      updatedSpecialContracts[contractIndex].standardPrice = parseInt(value, 10)
      return {
        ...prevData,
        specialContracts: updatedSpecialContracts,
      }
    })
  }

  const handleChangeContractAdvancedPrice = (e, contractIndex) => {
    const { value } = e.target
    setUpdatedData((prevData) => {
      const updatedSpecialContracts = [...prevData.specialContracts]
      updatedSpecialContracts[contractIndex].advancedPrice = parseInt(value, 10)
      return {
        ...prevData,
        specialContracts: updatedSpecialContracts,
      }
    })
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
                    defaultValue={data?.insuranceCompany.logoImageUrl}
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
                    defaultValue={data?.insuranceCompany.name}
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
                    defaultValue={data?.insuranceCompany.insuranceCompanyUrl}
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
                    defaultValue={data?.name}
                    onChange={handleChangeName}
                  />
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
                    defaultValue={data?.premium}
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
                    defaultValue={data?.minAge}
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
                    defaultValue={data?.maxAge}
                    onChange={handleChangeMaxAge}
                  />
                </Flex>
              </Box>
              {/* 특약 정보 표시 */}
              <Box>
                <Text fontSize={'20px'} mb={3}>
                  특약 정보
                </Text>

                {data?.specialContracts.map((contract, index) => {
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
                          defaultValue={contract.name}
                          onChange={(e) => {
                            handleChangeContractName(e, index)
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
                          defaultValue={contract.description}
                          onChange={(e) => {
                            handleChangeContractDescription(e, index)
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
                          defaultValue={contract.standardPrice || 0}
                          onChange={(e) => {
                            handleChangeContractStandardPrice(e, index)
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
                          defaultValue={contract.advancedPrice || 0}
                          onChange={(e) => {
                            handleChangeContractAdvancedPrice(e, index)
                          }}
                        />
                      </Flex>
                    </Flex>
                  )
                })}
              </Box>
              <Flex justifyContent={'space-between'}>
                <Box
                  display={'flex'}
                  textAlign={'center'}
                  marginTop={'30px'}
                  marginRight={'210px'}
                >
                  {/* 각 특약 조항 버튼을 배열로 매핑하여 동적으로 생성 */}
                  {[
                    { name: '항공기지연', value: data.flightDelay },
                    { name: '여권분실', value: data.passportLoss },
                    { name: '식중독', value: data.foodPoisoning },
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
                </Box>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex px={'10px'} py={'10px'} justifyContent={'center'}>
              <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
                저장
              </Button>
              <Button colorScheme="red" onClick={handleRemove}>
                삭제
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default InsuranceModal
