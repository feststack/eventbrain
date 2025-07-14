// src/lib/amplify-client.ts ou app/_utils/amplify-client.ts
'use client'
import { Amplify } from 'aws-amplify'
import awsExports from '../../aws-exports'

Amplify.configure(awsExports)
