import { Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import UserAdminTable from '../../components/cards/UserAdminTable'
import axios from 'axios'
import { getAccessToken } from '../../utils/tokenStore'
import { useNavigate } from 'react-router-dom'
import UserModal from '../../components/modals/UserModal'
import { ChevronRightIcon } from '@chakra-ui/icons'

const BASE_URL = import.meta.env.VITE_BASE_URL

const UserAdminForm = () => {
  const accessToken = getAccessToken()
  const navigate = useNavigate()
  const [usersData, setUsersData] = useState([])
  const [userData, setUserData] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [enabled, setEnabled] = useState(userData.enabled)

  const activate = () => {
    setEnabled(true)
  }
  const disabled = () => {
    setEnabled(false)
  }
  const handleCloseModal = () => {
    setEnabled(userData.enabled)
    setIsOpen(false)
  }

  //   const handleSave = async (id) => {
  //     try {
  //       const response = await axios.put(`${BASE_URL}/api/v1/admin/users/${id}`, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //         enabled,
  //       })
  //       if (response.status === 200) {
  //         setIsOpen(false)
  //         fetchUsersData()
  //       }
  //     } catch (error) {
  //       if (error.response.status >= 400 && error.response.status < 600) {
  //         alert('로그인 정보를 불러오는데 실패했습니다. 다시 로그인해주세요.')
  //         navigate('/signIn')
  //       }
  //       console.error(error)
  //     }
  //   }

  const fetchUsersData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/admin/users`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      if (response.status === 200) {
        setUsersData(response.data)
      }
    } catch (error) {
      if (error.response.status >= 400 && error.response.status < 600) {
        alert('로그인 정보를 불러오는데 실패했습니다. 다시 로그인해주세요.')
        navigate('/signIn')
      }
      console.error(error)
    }
  }

  useEffect(() => {
    fetchUsersData()
  }, [])

  const handleDetailClick = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      if (response.status === 200) {
        setUserData(response.data)
        setEnabled(response.data.enabled)
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
            <Flex width={100}>
              <Text
                fontSize={'xl'}
                mr={2}
                fontWeight={'bold'}
                letterSpacing={2}
              >
                보험목록
              </Text>
            </Flex>
          </Flex>
          <UserAdminTable
            number="회원번호"
            joinedAt="가입일자"
            name="회원이름"
            birthDay="생년월일"
            enabled="회원상태"
            detail="자세히"
            title={true}
          ></UserAdminTable>
          {usersData.map((data, index) => {
            return (
              <UserAdminTable
                key={index}
                number={index + 1}
                joinedAt={data.joinedAt}
                name={data.name}
                birthDay={data.birthDay}
                enabled={data.enabled ? '활성화' : '비활성화'}
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
      <UserModal
        onClose={handleCloseModal}
        isOpen={isOpen}
        userData={userData}
        enabled={enabled}
        activate={activate}
        disabled={disabled}
        // handleSave={handleSave}
      />
    </>
  )
}

export default UserAdminForm
