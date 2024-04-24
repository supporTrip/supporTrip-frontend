import { Box, Flex, Text, Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import TableCard from '../../components/cards/TableCard'
import BasicButton from '../../components/buttons/BasicButton'
import { format } from 'date-fns'

function MyInfoForm() {
  // 더미 데이터 대신 상태로 정보 관리
  const [userData, setUserData] = useState({
    profilePic: 'https://bit.ly/dan-abramov',
    name: '김태혁',
    email: 'recoo14@naver.com',
    birthDate: '1999.03.08',
    gender: '남자',
    registrationDate: '2024.03.21',
    phoneNumber: '010-4181-6329',
    bankAccount: '신한은행 110483972643',
  })
  const [receiveStatus, setReceiveStatus] = useState(true)

  const handleReceiveClick = (status) => {
    setReceiveStatus(status)
  }

  return (
    <>
      <Flex width="100%" flex={1} direction={'column'}>
        <Flex direction="column" flex={1}>
          <Flex alignItems="baseline" borderBottom="2px solid" pb={5}>
            <Text fontSize={'xl'} mr={3} fontWeight={'bold'} letterSpacing={2}>
              기본 회원정보
            </Text>
            <span>
              <Text fontSize={'xs'} color={'gray.400'}>
                수정불가
              </Text>
            </span>
          </Flex>
          <Flex borderBottom="1px solid" borderColor={'gray.200'} pt={5} pb={5}>
            <Box width={200}>
              <Text>프로필사진</Text>
            </Box>
            <Image
              borderRadius="full"
              boxSize="100px"
              src={userData.profilePic}
              alt="프로필사진"
            />
          </Flex>
          {/* 내용을 상태로부터 동적으로 렌더링 */}
          <TableCard title="이름(실명)" content={userData.name}></TableCard>
          <TableCard
            title="생년월일"
            content={format(userData.birthDate, 'yyyy년 MM월 dd일')}
          ></TableCard>
          <TableCard title="성별" content={userData.gender}></TableCard>
          <TableCard
            title="가입일자"
            content={userData.registrationDate}
          ></TableCard>
        </Flex>

        <Flex direction="column" flex={1} mt={20}>
          <Flex alignItems="baseline" borderBottom="2px solid" pb={5}>
            <Text fontSize={'xl'} mr={3} fontWeight={'bold'} letterSpacing={2}>
              추가 회원정보
            </Text>
            <span>
              <Text fontSize={'xs'} color={'gray.400'}>
                수정가능
              </Text>
            </span>
          </Flex>
          <TableCard title="휴대번호" content={userData.phoneNumber}>
            <BasicButton size="sm">휴대번호 변경</BasicButton>
          </TableCard>
          <TableCard title="이메일" content={userData.email}>
            <BasicButton size="sm">이메일 변경</BasicButton>
          </TableCard>
          <TableCard title="연결계좌" content={userData.bankAccount}>
            <BasicButton size="sm">연결계좌 관리</BasicButton>
          </TableCard>
          <Flex borderBottom="1px solid" borderColor={'gray.200'} pt={5} pb={5}>
            <Box width={200}>
              <Text>수신여부</Text>
            </Box>
            <Box width={200}>
              <BasicButton
                borderColor={'gray.200'}
                borderRadius={'10px 0px 0px 10px'}
                border={'1px solid'}
                color={receiveStatus ? 'main' : 'gray.200'}
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
                color={!receiveStatus ? 'main' : 'gray.200'}
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
    </>
  )
}

export default MyInfoForm
