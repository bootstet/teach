import '../styles/globals.css'
import { ChakraProvider, CSSReset } from '@chakra-ui/react';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider >
      <Component {...pageProps} />
    </ChakraProvider>)
}

export default MyApp
