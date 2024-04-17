import React, { useState } from 'react'
import TermsConsent from './TermsConsent'
import BasicButton from '../../components/buttons/BasicButton'
import BasicUserInfo from './BasicUserInfo'

const terms = [
  {
    title: '만 14세 이상입니다.',
    requestName: 'consent_above_14',
    isNecessary: true,
  },
  {
    title: '서포트립 이용약관',
    requestName: 'service_terms_consent',
    isNecessary: true,
  },
  {
    title: '개인정보 수집 및 이용',
    requestName: 'consent_personal_info',
    isNecessary: true,
  },
  {
    title: '광고성 정보 수신 동의',
    requestName: 'ad_info_consent',
    isNecessary: false,
  },
  {
    title: '개인정보 수집 및 이용동의',
    requestName: 'consent_personal_info_usage',
    isNecessary: false,
  },
]

const UserInfoForm = ({ setUserInfo }) => {
  const [userInfoCompleted, setUserInfoCompleted] = useState(false)
  const [consentCompleted, setConsentCompleted] = useState(false)

  const [name, setName] = useState('')
  const [birthDay, setBirthDay] = useState('')
  const [telecomCompany, setTelecomCompany] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [checkedTerms, setCheckedTerms] = useState(
    Array(terms.length).fill(false),
  )

  const handleClickButton = () => {
    if (!userInfoCompleted || !consentCompleted) {
      alert('모든 정보를 제대로 입력했는지 확인 후 다시 시도해주세요')
      return
    }

    const allowedTerms = terms.map((term, index) => {
      return {
        requestName: term.requestName,
        isAllowed: checkedTerms[index],
      }
    })

    setUserInfo({
      name,
      birthDay,
      phoneNumber,
      allowedTerms,
    })
  }

  return (
    <>
      <BasicUserInfo
        setName={setName}
        setBirthDay={setBirthDay}
        setPhoneNumber={setPhoneNumber}
        setTelecomCompany={setTelecomCompany}
        checkCompleted={setUserInfoCompleted}
      />

      <TermsConsent
        checkedItems={checkedTerms}
        setCheckedItems={setCheckedTerms}
        checkCompleted={setConsentCompleted}
        terms={terms}
        marginY={'30px'}
      />

      <BasicButton
        marginTop="20px"
        width="100%"
        bgColor="mint.400"
        color="white"
        onClick={handleClickButton}
      >
        인증
      </BasicButton>
    </>
  )
}

export default UserInfoForm
