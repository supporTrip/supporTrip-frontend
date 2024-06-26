import { Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import UserAdminTable from '../../components/cards/UserAdminTable'
import axios from 'axios'
import { getAccessToken } from '../../utils/tokenStore'
import UserModal from '../../components/modals/UserModal'
import { ChevronRightIcon } from '@chakra-ui/icons'

const BASE_URL = import.meta.env.VITE_BASE_URL

const UserAdminForm = () => {
  const accessToken = getAccessToken()
  const [usersData, setUsersData] = useState([])
  const [userData, setUserData] = useState({})
  const [logsData, setLogsData] = useState([])
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

  const handleSave = async (id) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/admin/users`,
        {
          id,
          enabled,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      if (response.status === 200) {
        setEnabled(response.data.enabled)
        setIsOpen(false)
      }
    } catch (error) {
      if (error.response.status >= 400 && error.response.status < 600) {
        alert(error.response.data.message)
      }
      console.error(error)
    }
    fetchUsersData()
  }

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
        alert(error.response.data.message)
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

        const logResponse = await axios.get(
          `${BASE_URL}/api/v1/admin/users/${id}/logs`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        if (logResponse.status === 200) {
          setLogsData(logResponse.data)
          setIsOpen(true)
        }
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
        handleSave={handleSave}
        logsData={logsData}
      />
    </>
  )
}

export default UserAdminForm
