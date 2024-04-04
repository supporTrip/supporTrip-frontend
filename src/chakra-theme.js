import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    body: "'Pretendard-Regular', 'Pretendard-Black', 'Pretendard-ExtraBold', 'Pretendard-Bold', 'Pretendard-SemiBold', 'Pretendard-Medium', 'Pretendard-Regular', 'Pretendard-Light', 'Pretendard-ExtraLight', 'Pretendard-Thin', sans-serif",
    heading: "'Pretendard-Regular', sans-serif",
  },
  colors: {
    bg: {
      default: '#F9FAFB',
    },
    black: {
      soft: '#333333',
    },
  },
})

export default theme
