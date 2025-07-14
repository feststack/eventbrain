// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import { Amplify } from 'aws-amplify'
import awsExports from '../aws-exports'

// Configuration Amplify (sans 'ssr')
Amplify.configure(awsExports)

export const metadata = {
  title: 'Mon app Next + Amplify',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
