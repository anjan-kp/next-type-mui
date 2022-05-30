import { PhoneContextProvider } from '../components/context/PhoneBookContext'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <PhoneContextProvider>
    <Component {...pageProps} />
  </PhoneContextProvider>
}

export default MyApp
