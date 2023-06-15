import { getServerSession } from "next-auth/next"
import type { NextRequest } from "next/server"
import React from "react"
import { authOptions } from "@/app/(client)/api/auth/[...nextauth]/route"

export default async function Protected (req: NextRequest): Promise<any> {
  const session = await getServerSession(authOptions)

  return (
    <div className='bg-red-400'>
      <p>Protected page</p>
      <p>Hi {session?.user.name}</p>
    </div>
  )
}
