import '@/app/globals.css'
import React from 'react'
import { Montserrat } from 'next/font/google'
import Provider from "@/app/(client)/context/client-provider"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/(client)/api/auth/[...nextauth]/route"

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default async function RootLayout ({
  children
}: {
  children: React.ReactNode
}): React.ReactNode {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-primary min-h-screen min-w-screen`}>
        <Provider session={session}>
          {children}
        </Provider>
      </body>
    </html>
  )
}