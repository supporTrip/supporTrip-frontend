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

function AccountBalance(props) {
  const { country } = props
  const clickHandler = () => {}

  return (
    <>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow="hidden"
        variant="outline"
        alignItems={'center'}
        width={'100%'}
        height={100}
        onClick={clickHandler}
      >
        <Flex
          marginLeft={6}
          width={'70px'}
          height={'70px'}
          borderRadius={'100%'}
          border={'solid'}
          justifyContent={'center'}
          alignItems={'center'}
          bgColor="gray.200"
          color="gray.200"
        >
          <Image
            padding={'8px'}
            src={country.flag}
            boxSize={'90px'}
            alt="Caffe Latte"
          />
        </Flex>

        <Stack>
          <CardBody>
            <Heading size="md" fontSize={14} color={'gray.600'} marginTop={2}>
              {country.name}
            </Heading>

            <Text color={'Black'} as={'b'} fontSize={18}>
              {country.value + ' ' + country.unit}
            </Text>
          </CardBody>
        </Stack>
      </Card>
    </>
  )
}

export default AccountBalance
