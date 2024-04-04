import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Card,
  Stack,
  CardBody,
  Flex,
  Heading,
  Button,
  Image,
  Text,
} from '@chakra-ui/react'
import flag from '../../images/united-states-of-america.svg'

function AccountBalance(props) {
  return (
    <>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow="hidden"
        variant="outline"
        alignItems={'center'}
        width={'100%'}
      >
        <Flex
          marginLeft={6}
          width={'50px'}
          height={'50px'}
          borderRadius={'100%'}
          border={'solid'}
          justifyContent={'center'}
          alignItems={'center'}
          bgColor="gray.200"
          color="gray.200"
        >
          <Image
            padding={'8px'}
            src={flag}
            boxSize={'80px'}
            alt="Caffe Latte"
          />
        </Flex>

        <Stack>
          <CardBody>
            <Heading size="md">미국달러</Heading>

            <Text py="2">13 USD</Text>
          </CardBody>
        </Stack>
      </Card>
    </>
  )
}

AccountBalance.propTypes = {}

export default AccountBalance
