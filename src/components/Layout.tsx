import { ReactNode } from 'react'
import { Nav } from './Nav'

type LayoutProps = {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  )
}
