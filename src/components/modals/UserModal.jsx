import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import BasicButton from '../buttons/BasicButton'
import { format } from 'date-fns'

const UserModal = ({
  isOpen,
  onClose,
  userData,
  enabled,
  activate,
  disabled,
  handleSave,
  logsData,
}) => {
  const logsContainerRef = useRef(null)

  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight
    }
  }, [logsData])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="10" bg="white" maxW={'600px'}>
          <ModalHeader pt={16} alignSelf={'center'} fontSize={'2xl'}>
            회원 상세 정보
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex py={7} px={10} flexDirection={'column'}>
              {/* 보험 상품 정보 표시 */}
              <Box mb={5}>
                <Flex
                  alignItems="center"
                  justifyContent={'space-between'}
                  mb={5}
                >
                  <Text fontSize={'20px'}>프로필 이미지</Text>
                  <Image
                    maxW={'300px'}
                    borderRadius="full"
                    boxSize="100px"
                    src={userData.profileImageUrl}
                  ></Image>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent={'space-between'}
                  mb={5}
                >
                  <Text fontSize={'20px'}>이름</Text>
                  <Text flex={1} maxW={'300px'} textAlign={'end'}>
                    {userData.name}
                  </Text>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent={'space-between'}
                  mb={5}
                >
                  <Text fontSize={'20px'}>성별</Text>
                  <Text flex={1} maxW={'300px'} textAlign={'end'}>
                    {userData.gender == 'MALE' ? '남성' : '여성'}
                  </Text>
                </Flex>

                <Flex
                  alignItems="center"
                  justifyContent={'space-between'}
                  mb={5}
                >
                  <Text fontSize={'20px'}>이메일</Text>
                  <Text flex={1} maxW={'300px'} textAlign={'end'}>
                    {userData.email}
                  </Text>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent={'space-between'}
                  mb={5}
                >
                  <Text fontSize={'20px'}>전화번호</Text>
                  <Text flex={1} maxW={'300px'} textAlign={'end'}>
                    {userData.phoneNumber}
                  </Text>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent={'space-between'}
                  mb={5}
                >
                  <Text fontSize={'20px'}>생년월일</Text>
                  <Text flex={1} maxW={'300px'} textAlign={'end'}>
                    {userData.birthDay}
                  </Text>
                </Flex>

                <Flex
                  alignItems="center"
                  justifyContent={'space-between'}
                  mb={5}
                >
                  <Text fontSize={'20px'}>가입일</Text>
                  <Text flex={1} maxW={'300px'} textAlign={'end'}>
                    {userData.joinedAt}
                  </Text>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent={'space-between'}
                  mb={5}
                >
                  <Text fontSize={'20px'}>알림 동의 여부</Text>
                  <Text flex={1} maxW={'300px'} textAlign={'end'}>
                    {userData.notificationStatus ? '동의' : '비동의'}
                  </Text>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent={'space-between'}
                  mb={5}
                >
                  <Text fontSize={'20px'}>상태</Text>
                  <Flex>
                    <BasicButton
                      width={'100px'}
                      height={'49px'}
                      borderColor={'gray.200'}
                      borderRadius={'10px 0px 0px 10px'}
                      border={'1px solid'}
                      color={enabled ? 'main' : 'gray.200'}
                      bgColor={'white'}
                      _hover={{ color: 'main' }}
                      onClick={activate}
                    >
                      활성화
                    </BasicButton>
                    <BasicButton
                      width={'100px'}
                      height={'49px'}
                      borderRadius={'0px 10px 10px 0px'}
                      color={enabled ? 'gray.200' : 'main'}
                      border={'1px solid'}
                      bgColor={'white'}
                      _hover={{ color: 'main' }}
                      onClick={disabled}
                    >
                      비활성화
                    </BasicButton>
                  </Flex>
                </Flex>
                {/* 로그 데이터 표시 */}
                <Text fontSize={'20px'}>로그 기록</Text>
                <Box
                  maxHeight="300px"
                  overflowY="auto"
                  border={'1px'}
                  px={'3px'}
                >
                  {logsData &&
                  logsData.userLogs &&
                  logsData.userLogs.length > 0 ? (
                    logsData.userLogs.map((log, index) => {
                      return (
                        <Flex
                          key={index}
                          alignItems="center"
                          justifyContent="space-between"
                          mb={2}
                        >
                          <Text fontSize={'14px'}>{log.message}</Text>
                          <Text fontSize={'12px'}>
                            {format(log.createdAt, 'yyyy-MM-dd hh:mm:ss')}
                          </Text>
                        </Flex>
                      )
                    })
                  ) : (
                    <Text>No logs available</Text>
                  )}
                </Box>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex px={'10px'} justifyContent={'center'}>
              <Button
                width={'130px'}
                height={'50px'}
                colorScheme="blue"
                mr={7}
                onClose={onClose}
                onClick={() => {
                  handleSave(userData.id)
                }}
              >
                저장
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UserModal
