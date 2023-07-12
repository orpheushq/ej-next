import { withAuth } from "next-auth/middleware"
import acceptLanguage from 'accept-language'
import { fallbackLng, languages } from "@/i18n/settings"
import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { NextResponse } from "next/server"

acceptLanguage.languages(languages)
// export const config = {
//   // matcher: '/:lng*'
//   matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
// }
const cookieName = 'i18next'

// middleware is applied to all routes, use conditionals to select

export default withAuth(
  function middleware (req) {
    // TODO: find a better way to exclude images and assets from being redirected
    if (req.nextUrl.pathname.match('/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)') != null) {
      let lng: string | null = ""
      if (req.cookies.has(cookieName)) {
        lng = acceptLanguage.get((req.cookies.get(cookieName) as RequestCookie).value)
      }
      if (lng !== null) {
        lng = acceptLanguage.get(req.headers.get('Accept-Language'))
      }
      if (lng !== null) {
        lng = fallbackLng
      }

      // Redirect if lng in path is supported
      if (
        !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
        !req.nextUrl.pathname.startsWith('/_next') &&
        !req.nextUrl.pathname.endsWith('.svg') &&
        !req.nextUrl.pathname.startsWith('/auth') &&
        !req.nextUrl.pathname.startsWith('/protected')
      ) {
        return NextResponse.redirect(new URL(`/${lng as string}${req.nextUrl.pathname}`, req.url))
      }

      if (req.headers.has('referer')) {
        const refererUrl = new URL(req.headers.get('referer') as string)
        const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
        const response = NextResponse.next()
        if (typeof lngInReferer !== "undefined") {
          response.cookies.set(cookieName, lngInReferer)
        }
        return response
      }

      return NextResponse.next()
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (
          req.nextUrl.pathname.startsWith('/protected') &&
          token === null
        ) {
          return false
        }
        return true
      }
    }
  }
)
