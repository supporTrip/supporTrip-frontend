import React from 'react'
import { useParams } from 'react-router-dom'

const FlightInsuranceDetail = () => {
  const params = useParams()
  console.log(params.insuranceId)
  return <>FlightInsuranceDetail</>
}

export default FlightInsuranceDetail
