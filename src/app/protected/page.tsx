import type { NextRequest } from "next/server"
import React from "react"

export default async function Protected (req: NextRequest): Promise<any> {
  return (
    <div>
      <p>Protected page</p>
    </div>
  )
}
