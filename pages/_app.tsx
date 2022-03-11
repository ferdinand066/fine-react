import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { AppWrapper } from '../context/State'

function MyApp({ Component, pageProps } : AppProps) {
  return (
    <AppWrapper>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </AppWrapper>
  )
}

export default MyApp
