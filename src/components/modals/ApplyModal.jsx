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
} from '@chakra-ui/react'
import BasicButton from '../buttons/BasicButton'

const ApplyModal = ({ responseData, isOpen, onClose, formatDate }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
              <Text>가입 시작일</Text>
              <Text>{formatDate(responseData?.coverageStartAt)}</Text>
            </Flex>
            <Flex
              justifyContent={'space-between'}
              flexDirection={'row'}
              mt={'20px'}
            >
              <Text>가입 종료일</Text>
              <Text>{formatDate(responseData?.coverageEndAt)}</Text>
            </Flex>
            <Flex
              justifyContent={'space-between'}
              flexDirection={'row'}
              mt={'20px'}
            >
              <Text>가입자</Text>
              <Text>홍길동</Text>
            </Flex>
            <Flex
              justifyContent={'space-between'}
              flexDirection={'row'}
              mt={'20px'}
            >
              <Text>생년월일</Text>
              <Text>1998년01월01일</Text>
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
                  px={'25px'}
                  alignItems={'center'}
                  mt={'12px'}
                >
                  <Text fontSize={'21px'} fontWeight={'bold'}>
                    예상 보험료
                  </Text>
                  {responseData?.premium && (
                    <Text fontSize={20} fontWeight={'bold'}>
                      {`${responseData.premium.toLocaleString()}원`}
                    </Text>
                  )}
                </Flex>
              </Box>
            </Flex>
            <Flex flexDirection={'column'} pt={'50px'}>
              <Checkbox defaultChecked>개인정보 수집 및 이용동의</Checkbox>
              <Checkbox defaultChecked>개인정보 수집 및 이용동의</Checkbox>
              <Checkbox defaultChecked>개인정보 수집 및 이용동의</Checkbox>
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
