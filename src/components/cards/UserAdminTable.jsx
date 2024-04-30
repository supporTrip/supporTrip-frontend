import { Flex, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import HoverText from './HoverText'

const UserAdminTable = (props) => {
  const { joinedAt, name, birthDay, enabled, detail, title, number, onClick } =
    props

  return (
    <>
      <Flex
        alignItems="baseline"
        borderBottom="1px solid"
        borderColor={'gray.200'}
        pt={5}
        pb={5}
      >
        <Grid w="100%" templateColumns="0.8fr 1fr 1fr 1.2fr 1fr 0.6fr">
          <GridItem w="100%" h="6">
            <HoverText
              title={title}
              content={number}
              maxLength={10}
            ></HoverText>
          </GridItem>
          <GridItem w="100%" h="6">
            <HoverText title={title} content={name} maxLength={20}></HoverText>
          </GridItem>
          <GridItem w="100%" h="6">
            <HoverText
              title={title}
              content={birthDay}
              maxLength={10}
            ></HoverText>
          </GridItem>
          <GridItem w="100%" h="6">
            <HoverText
              title={title}
              content={joinedAt}
              maxLength={10}
            ></HoverText>
          </GridItem>

          <GridItem w="100%" h="6">
            <HoverText
              title={title}
              content={enabled}
              maxLength={10}
            ></HoverText>
          </GridItem>
          <GridItem w="100%" h="6">
            <HoverText
              title={title}
              content={detail}
              maxLength={10}
              onClick={onClick}
            ></HoverText>
          </GridItem>
        </Grid>
      </Flex>
    </>
  )
}

export default UserAdminTable
