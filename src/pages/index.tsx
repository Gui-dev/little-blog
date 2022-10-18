import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <link rel="icon" href="/code.png" />
        <title>Creative Minds</title>
      </Head>
      <h1 className="text-5xl font-bold">Hello World</h1>
    </>
  )
}

export default Home
