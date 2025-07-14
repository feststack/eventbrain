'use client'

import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import awsExports from '../aws-exports'
import { Amplify } from 'aws-amplify'

Amplify.configure(awsExports as any)

type User = {
  username: string
}

type SignOut = () => void

function Home({ signOut, user }: { signOut: SignOut; user: User }) {
  return (
    <div>
      <h1>Bienvenue, {user.username}</h1>
      <button onClick={signOut}>Se déconnecter</button>
    </div>
  )
}

export default withAuthenticator(Home)
