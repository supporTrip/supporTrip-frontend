import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    body: 'suite-regular, sans-serif',
    heading: 'suite-regular, sans- serif',
  },
  fontSizes: {
    xs: '14px',
    sm: '16px',
    md: '18px',
    lg: '20px',
    xl: '22px',
  },
  colors: {
    bg: {
      default: '#F9FAFB',
    },
    black: {
      soft: '#333333',
    },
    blue: {
      50: '#eff6ff',
      200: '#bfdbfe',
      400: '#60a5fa',
      600: '#2563eb',
      800: '#1e40af',
    },
    gray: {
      10: '#fbfcfd',
      50: '#f2f5f8',
      100: '#ebeef2',
      150: '#dce2e7',
      200: '#ced3da',
      400: '#a3abb3',
      500: '#767d86',
      600: '#4b535a',
      800: '#2c2f34',
      900: '#232629',
    },
    green: {
      200: '#eaf9f0',
      400: '#d4f2e0',
      600: '#b3e9ca',
      800: '#26bf66',
    },
    mint: {
      100: '#eaf9fa',
      200: '#96e6e5',
      400: '#2dcdcb',
      600: '#24a4a2',
      800: '#1a7b7a',
    },
    red: {
      50: '#fef4f7',
      200: '#fee0e8',
      400: '#ffabc1',
      600: '#f53165',
      800: '#dc2626',
    },
    yellow: {
      200: '#fff7e6',
      400: '#ffe9bf',
      600: '#ffd88c',
      800: '#ffaa00',
    },
    main: '#2dcdcb',
  },
})

export default theme
