import '@/styles/globals.css'
import 'react-tooltip/dist/react-tooltip.css'
import { Toaster } from 'react-hot-toast'
import PropTypes from 'prop-types'
import { SessionProvider as AuthProvider } from 'next-auth/react'

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <>
      <AuthProvider session={session}>
        <Component {...pageProps} />
      </AuthProvider>
      <Toaster />
    </>
  )
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
}

export default App
