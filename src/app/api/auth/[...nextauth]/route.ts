import { authenticate } from "@/services/authService"
import NextAuth from "next-auth"
import type { User, AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { JWT } from "next-auth/jwt"

export const authOptions: AuthOptions = {
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
            const u: User = { ...res.user, apiToken: res.token, type: "User" }
            return u
          } else {
            return null
          }
        } else {
          return null
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async session ({ session, token, user }) {
      const sanitizedToken = Object.keys(token).reduce((p, c) => {
        // strip unnecessary properties
        if (
          c !== "iat" &&
          c !== "exp" &&
          c !== "jti" &&
          c !== "apiToken"
        ) {
          return { ...p, [c]: token[c] }
        } else {
          return p
        }
      }, {})
      return { ...session, user: sanitizedToken, apiToken: token.apiToken }
    },
    async jwt ({ token, user, account, profile }) {
      if (typeof user !== "undefined" && user.type === "User") {
        // user has just signed in so the user object is populated
        return user as JWT
      }
      return token
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
