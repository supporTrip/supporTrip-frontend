import React, { useState } from 'react'
import TermsConsent from './TermsConsent'
import BasicButton from '../../components/buttons/BasicButton'
import BasicUserInfo from './BasicUserInfo'

const terms = [
  {
    title: '만 14세 이상입니다.',
    requestName: 'consentAbove14',
    isNecessary: true,
  },
  {
    title: '서포트립 이용약관',
    requestName: 'serviceTermsConsent',
    isNecessary: true,
  },
  {
    title: '개인정보 수집 및 이용',
    requestName: 'consentPersonalInfo',
    isNecessary: true,
  },
  {
    title: '광고성 정보 수신 동의',
    requestName: 'adInfoConsent',
    isNecessary: false,
  },
  {
    title: '개인정보 수집 및 이용동의',
    requestName: 'consentPersonalInfoUsage',
    isNecessary: false,
  },
]

const UserInfoForm = ({ setUserInfo, goNextStep }) => {
  const [userInfoCompleted, setUserInfoCompleted] = useState(false)
  const [consentCompleted, setConsentCompleted] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [birthDay, setBirthDay] = useState('')
  const [gender, setGender] = useState('')
  const [telecomCompany, setTelecomCompany] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [checkedTerms, setCheckedTerms] = useState(
    Array(terms.length).fill(false),
  )

  const isCompleted = () => {
    return userInfoCompleted && consentCompleted
  }

  const handleClickButton = () => {
    if (!isCompleted()) {
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
      email,
      birthDay,
      gender,
      phoneNumber,
      allowedTerms,
    })

    // TODO: SMS 인증 요청 API 호출
    goNextStep()
  }

  return (
    <>
      <BasicUserInfo
        setName={setName}
        setEmail={setEmail}
        setBirthDay={setBirthDay}
        setGender={setGender}
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
        isDisabled={!isCompleted()}
      >
        인증
      </BasicButton>
    </>
  )
}

export default UserInfoForm
