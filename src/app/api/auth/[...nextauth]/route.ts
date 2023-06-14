import { authenticate } from "@/services/authService"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize (credentials, req) {
        if (typeof credentials !== "undefined") {
          const res = await authenticate(credentials.email, credentials.password)
          if (typeof res !== "undefined") {
            return res.user
          } else {
            return null
          }
        } else {
          return null
        }
      }
    })
  ],
  session: { strategy: "jwt" }
})

export { handler as GET, handler as POST }
