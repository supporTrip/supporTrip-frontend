import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../images/logo.svg'

const Links = {
  '/account': '계좌',
  '/exchange': '환전',
  '/flight-insurance': '여행자보험',
  '/signin': '로그인',
  '/mypage': '마이페이지',
}

const NavLink = (props) => {
  const { children, href } = props

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={href}
    >
      {children}
    </Box>
  )
}

const Navbar = ({ bgColor, width = '100%' }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box width={width}>
      <Box bg={bgColor} px={4} fontSize={'md'} padding={'10px 0px'}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Link to={'/'}>
              <Flex alignItems={'center'} fontWeight={'bold'}>
                <Image src={Logo} alt="서포트립 로고" width={'40px'}></Image>
                서포트립
              </Flex>
            </Link>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Object.keys(Links).map((key, idx) => {
                return (
                  <NavLink key={idx} href={key}>
                    {Links[key]}
                  </NavLink>
                )
              })}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar size={'sm'} src={''} />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Object.keys(Links).map((key, idx) => {
                return (
                  <NavLink key={idx} href={key}>
                    {Links[key]}
                  </NavLink>
                )
              })}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Box>
  )
}

export default Navbar
