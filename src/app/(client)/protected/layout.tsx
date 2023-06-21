
import { getServerSession } from "next-auth/next"
import React from "react"
import { authOptions } from "@/app/(client)/api/auth/[...nextauth]/route"
import Provider from "@/app/(client)/context/client-provider"

export default async function ProtectedLayout ({
  children
}: {
  children: React.ReactNode
}): React.ReactNode {
  const session = await getServerSession(authOptions)

  return (
    <Provider session={session}>
      {children}
    </Provider>
  )
}
