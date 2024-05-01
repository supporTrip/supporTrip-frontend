import { Flex, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import HoverText from './HoverText'

function InsuranceAdminTable(props) {
  const { detail, companyName, name, premium, ageRange, title } = props

  return (
    <>
      <Flex
        alignItems="baseline"
        borderBottom="1px solid"
        borderColor={'gray.200'}
        pt={5}
        pb={5}
      >
        <Grid w="100%" templateColumns="1fr 1.5fr 1fr 1fr 0.8fr" gap={'20px'}>
          <GridItem w="100%" h="6">
            <HoverText
              title={title}
              content={companyName}
              maxLength={20}
            ></HoverText>
          </GridItem>
          <GridItem w="100%" h="6">
            <HoverText title={title} content={name} maxLength={20}></HoverText>
          </GridItem>
          <GridItem w="100%" h="6">
            <HoverText
              title={title}
              content={premium}
              maxLength={20}
            ></HoverText>
          </GridItem>
          <GridItem w="100%" h="6">
            <HoverText
              title="연령대"
              content={ageRange}
              maxLength={20}
            ></HoverText>
          </GridItem>
          <GridItem w="100%" h="6">
            <HoverText
              title={title}
              content={detail}
              maxLength={20}
            ></HoverText>
          </GridItem>
        </Grid>
      </Flex>
    </>
  )
}

export default InsuranceAdminTable
