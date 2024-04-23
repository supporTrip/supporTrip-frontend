import {
  Box,
  HStack,
  Image,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import InfoIcon from '../../images/info-icon.svg'
import TermsConsent from './TermsConsent'
import BasicButton from '../../components/buttons/BasicButton'

const banks = [
  {
    name: '우리',
    value: 'WOORI',
  },
  {
    name: '신한',
    value: 'SHINHAN',
  },
  {
    name: '국민',
    value: 'KB',
  },
  {
    name: '하나',
    value: 'HANA',
  },
  {
    name: '기업',
    value: 'IBK',
  },
  {
    name: '농협',
    value: 'NH',
  },
  {
    name: '수협',
    value: 'SH',
  },
  {
    name: 'SC제일',
    value: 'SC',
  },
]

const terms = [
  {
    title: '오픈뱅킹 자동계좌이체 약관 동의',
    requestName: 'openBankingAutoTransferConsent',
    isNecessary: true,
  },
  {
    title: '오픈뱅킹 금융정보조회 약관 동의',
    requestName: 'openBankingFinancialInfoInquiryConsent',
    isNecessary: true,
  },
  {
    title: '금융정보 제3자 제공 동의',
    requestName: 'financialInfoThirdPartyProvisionConsent',
    isNecessary: true,
  },
  {
    title: '개인정보 제3자 제공 동의(오픈 뱅킹)',
    requestName: 'openBankingPersonalInfoThirdPartyProvisionConsent',
    isNecessary: true,
  },
  {
    title: '본인인증, 전자서명을 위한 개인정보 제3자 제공 동의',
    requestName: 'personalInfoThirdPartyConsentForESigniture',
    isNecessary: true,
  },
]

const BankAccountLink = ({ changeBankAccount, goNextStep }) => {
  const [validationResult, setValidationResult] = useState({
    bank: null,
    bankAccountNumber: null,
  })

  const [bankAccount, setBankAccount] = useState({})

  const [consentCompleted, setConsentCompleted] = useState(false)
  const [checkedTerms, setCheckedTerms] = useState(
    Array(terms.length).fill(false),
  )

  const handleBankAccountNumberChange = (e) => {
    validateBankAccountNumber(e.target.value)

    const newBankAccount = {
      ...bankAccount,
      bankAccountNumber: e.target.value,
    }
    setBankAccount(newBankAccount)
  }

  const handleBankChange = (e) => {
    validateBank(e.target.value)

    const newBankAccount = {
      ...bankAccount,
      bank: e.target.value,
    }
    setBankAccount(newBankAccount)
  }

  const handleClickButton = () => {
    const completed = isCompleted()

    if (!completed) {
      alert('모든 정보를 제대로 입력했는지 확인 후 다시 시도해주세요')
      return
    }

    const allowedTerms = terms.map((term, index) => {
      return {
        requestName: term.requestName,
        isAllowed: checkedTerms[index],
      }
    })

    changeBankAccount({
      ...bankAccount,
      allowedTerms,
    })
    goNextStep()
  }

  const isCompleted = () => {
    return (
      validationResult.bank === '' &&
      validationResult.bankAccountNumber === '' &&
      consentCompleted
    )
  }

  const validateBankAccountNumber = (accountNumber) => {
    setValidationResult({ ...validationResult, bankAccountNumber: '' })

    if (!accountNumber.trim()) {
      setValidationResult({
        ...validationResult,
        bankAccountNumber: '계좌번호를 입력해주세요',
      })
      return
    }

    if (!/^\d+$/.test(accountNumber)) {
      setValidationResult({
        ...validationResult,
        bankAccountNumber: '숫자만 입력해주세요',
      })
      return
    }

    if (accountNumber.length < 10 || accountNumber.length > 14) {
      setValidationResult({
        ...validationResult,
        bankAccountNumber: '10자리에서 14자리 사이의 숫자로 입력해주세요',
      })
      return
    }
  }

  const validateBank = (bank) => {
    setValidationResult({ ...validationResult, bank: '' })

    if (!bank.trim()) {
      setValidationResult({ ...validationResult, bank: '은행을 선택해주세요' })
      return
    }
  }

  const hasError = (validationError) => {
    return validationError !== '' && validationError !== null
  }

  const getFirstError = () => {
    return validationResult.bank || validationResult.bankAccountNumber
  }

  return (
    <>
      <Box
        bg={'gray.50'}
        borderRadius={'sm'}
        color={'gray.500'}
        width={'100%'}
        height={'50px'}
        alignContent={'center'}
        paddingLeft={'14px'}
      >
        <HStack>
          <Image src={InfoIcon} />
          <Text fontSize={'14px'}>
            간편한 환전금 충전을 위해 계좌를 연결해주세요
          </Text>
        </HStack>
      </Box>

      <VStack width={'100%'} alignItems={'baseline'} marginTop={'10px'}>
        <HStack align={'start'} width={'100%'}>
          <Select
            width={'150px'}
            placeholder="은행 선택"
            _placeholder={{ color: 'gray.200' }}
            onChange={handleBankChange}
            {...(hasError(validationResult.bank) && {
              borderColor: 'red',
              marginBottom: '0px',
            })}
          >
            {banks.map((bank) => {
              return (
                <option key={bank.value} value={bank.value}>
                  {bank.name}
                </option>
              )
            })}
          </Select>

          <Input
            placeholder={'계좌번호 (숫자만 입력)'}
            onChange={handleBankAccountNumberChange}
            {...(hasError(validationResult.bankAccountNumber) && {
              color: 'red',
              marginBottom: '0px',
            })}
          />
        </HStack>
        {hasError(getFirstError()) && (
          <Text color={'red'} fontSize={'14px'}>
            {getFirstError()}
          </Text>
        )}
      </VStack>

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
        연결
      </BasicButton>
    </>
  )
}

export default BankAccountLink
