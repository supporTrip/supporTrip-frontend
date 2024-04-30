import { Flex, Text, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import InsuranceAdminTable from '../../components/cards/InsuranceAdminTable'
import { getAccessToken } from '../../utils/tokenStore'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import InsuranceModal from '../../components/modals/InsuranceModal'
import AddInsuranceModal from '../../components/modals/AddInsuranceModal'
import { ChevronRightIcon } from '@chakra-ui/icons'

const BASE_URL = import.meta.env.VITE_BASE_URL

function InsurancesAdminForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const accessToken = getAccessToken()
  const navigate = useNavigate()
  const [insuranceData, setInsuranceData] = useState([])
  const [insurancesData, setInsurancesData] = useState([])
  const [isClicked, setIsClicked] = useState([false, false, false])

  const handleRemove = async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/admin/flight-insurances/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      if (response.status === 204) {
        const updatedInsurances = insurancesData.filter((insurance) => {
          return insurance.id !== id
        })
        setInsurancesData(updatedInsurances)
        setIsOpen(false)
      }
    } catch (error) {
      console.error('삭제 에러:', error)
    }
    fetchInsurancesData()
  }

  const handleUpdate = async (updatedData) => {
    const updatedRequest = {
      id: updatedData.id,
      name: updatedData.name,
      minAge: updatedData.minAge,
      maxAge: updatedData.maxAge,
      premium: updatedData.premium,
      flightDelay: isClicked[0],
      passportLoss: isClicked[1],
      foodPoisoning: isClicked[2],
      insuranceCompany: {
        id: updatedData.insuranceCompany.id,
        name: updatedData.insuranceCompany.name,
        logoImageUrl: updatedData.insuranceCompany.logoImageUrl,
        insuranceCompanyUrl: updatedData.insuranceCompany.insuranceCompanyUrl,
      },

      specialContracts: updatedData.specialContracts.map((contract) => {
        return {
          id: contract.id,
          name: contract.name,
          description: contract.description,
          standardPrice: contract.standardPrice,
          advancedPrice: contract.advancedPrice,
          flightInsuranceId: updatedData.id,
        }
      }),
    }

    if (
      updatedRequest.id === null ||
      updatedRequest.name === null ||
      updatedRequest.minAge === null ||
      updatedRequest.maxAge === null ||
      updatedRequest.premium === null ||
      updatedRequest.specialContracts.some((contract) => {
        return (
          contract.id === null ||
          contract.name === null ||
          contract.description === null ||
          contract.standardPrice === null ||
          contract.advancedPrice === null
        )
      })
    ) {
      alert('값이 null일 수 없습니다.')
      return
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/admin/flight-insurances`,
        updatedRequest,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      if (response.status === 200) {
        const updatedInsuranceIndex = insurancesData.findIndex((insurance) => {
          return insurance.id === updatedData.id
        })
        if (updatedInsuranceIndex !== -1) {
          const updatedInsurancesData = [...insurancesData]
          updatedInsurancesData[updatedInsuranceIndex] = response.data
          setInsurancesData(updatedInsurancesData)
        }
      }
    } catch (error) {
      console.error('업데이트 에러:', error)
    }
    fetchInsurancesData()
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleDetailClick = async (id) => {
    if (!accessToken) {
      alert('로그인 후 이용해주세요.')
      navigator('/signIn')
      return
    }
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/admin/flight-insurances/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      if (response.status === 200) {
        const { flightDelay, passportLoss, foodPoisoning } = response.data
        setIsClicked([flightDelay, passportLoss, foodPoisoning])
        setInsuranceData(response.data)
        setIsOpen(true)
      }
    } catch (error) {
      if (error.response.status >= 400 && error.response.status < 600) {
        alert('로그인 정보를 불러오는데 실패했습니다. 다시 로그인해주세요.')
        navigate('/signIn')
      }
      console.error(error)
    }
  }

  const fetchInsurancesData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/admin/flight-insurances`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      if (response.status === 200) {
        setInsurancesData(response.data)
      }
    } catch (error) {
      if (error.response.status >= 400 && error.response.status < 600) {
        alert('로그인 정보를 불러오는데 실패했습니다. 다시 로그인해주세요.')
        navigate('/signIn')
      }
      console.error(error)
    }
  }

  const handleAddModalOpen = () => {
    setIsAddOpen(true)
  }

  const handleAddModalClose = () => {
    setIsAddOpen(false)
  }

  useEffect(() => {
    fetchInsurancesData()
  }, [])

  return (
    <>
      <Flex width="100%" flex={1} direction={'column'}>
        <Flex direction="column" flex={1}>
          <Flex
            alignItems="baseline"
            borderBottom="2px solid"
            pb={5}
            justifyContent={'space-between'}
          >
            <Flex width={300}>
              <Text
                fontSize={'xl'}
                mr={3}
                fontWeight={'bold'}
                letterSpacing={2}
              >
                보험목록
              </Text>
            </Flex>
            <Button
              color={'white'}
              bgColor={'main'}
              onClick={handleAddModalOpen}
            >
              보험 추가
            </Button>
          </Flex>
          <InsuranceAdminTable
            companyName="보험사"
            name="보험이름"
            premium="금액"
            ageRange="가입 연령대"
            detail="자세히"
            title={true}
          ></InsuranceAdminTable>
          {insurancesData.map((data, index) => {
            const ageRange = `${data.minAge} ~ ${data.maxAge}`
            return (
              <InsuranceAdminTable
                key={index}
                companyName={data.insuranceCompany.name}
                name={data.name}
                premium={data.premium}
                ageRange={ageRange}
                detail={
                  <ChevronRightIcon
                    cursor={'pointer'}
                    size={'sm'}
                    onClick={() => {
                      handleDetailClick(data.id)
                    }}
                  >
                    자세히
                  </ChevronRightIcon>
                }
              />
            )
          })}
        </Flex>
      </Flex>
      <AddInsuranceModal
        onClose={handleAddModalClose}
        isOpen={isAddOpen}
        fetchInsurancesData={fetchInsurancesData}
      />
      {/* 모달 창 */}
      {insuranceData &&
        insuranceData.insuranceCompany &&
        insuranceData.specialContracts && (
          <InsuranceModal
            onClose={handleCloseModal}
            isOpen={isOpen}
            data={insuranceData}
            onUpdate={handleUpdate}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
            onRemove={handleRemove}
          />
        )}
    </>
  )
}

export default InsurancesAdminForm
