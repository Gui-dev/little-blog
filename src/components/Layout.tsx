import Head from 'next/head'
import { ReactNode } from 'react'
import { Nav } from './Nav'

type LayoutProps = {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="mx-6 md-mx-auto md:max-w-2xl">
      <Head>
        <title>Creative Minds</title>
      </Head>
      <Nav />
      <main>{children}</main>
    </div>
  )
}
