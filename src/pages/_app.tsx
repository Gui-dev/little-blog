import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

import { Layout } from '../components/Layout'
import 'react-toastify/dist/ReactToastify.css'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ToastContainer position="top-center" limit={1} theme="dark" />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
