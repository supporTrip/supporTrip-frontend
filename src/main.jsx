import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/fonts/suite/suite.css'
import './assets/fonts/avenirNext/avenirNext.css'
import theme from './chakra-theme.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  //</React.StrictMode>,
)
