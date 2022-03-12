import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { AppWrapper } from '../context/State'
import ProtectedRoute from '../context/ProtectedRoute'

function MyApp({ Component, pageProps, router } : AppProps) {
  return (
    <AppWrapper>
      <ProtectedRoute router={ router }>
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>  
      </ProtectedRoute>
    </AppWrapper>
  )
}

export default MyApp
