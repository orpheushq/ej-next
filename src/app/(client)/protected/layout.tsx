
import { getServerSession } from "next-auth/next"
import React from "react"
import { authOptions } from "@/app/(client)/api/auth/[...nextauth]/route"
import SessionProvider from "@/context/session-provider"

export default async function ProtectedLayout ({
  children
}: {
  children: React.ReactNode
}): React.ReactNode {
  const session = await getServerSession(authOptions)

  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}
