import { ReactNode } from 'react'

export interface drawerProps {
  window?: () => Window,
  children: ReactNode,
  isOpen: boolean,
  onClick: any
}