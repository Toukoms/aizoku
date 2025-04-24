import {NextRequest, NextResponse} from "next/server";
import {getSession} from "@/src/lib/session";

const protectedRoutes = ["/chat"]
const publicRoutes = ["/", "/auth", "/password"]
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtected = protectedRoutes.some(route => path.startsWith(route))
  const isPublic = publicRoutes.some(route => path.startsWith(route))
  const session = await getSession()

  if (isProtected && !session?.userId) {
    return NextResponse.redirect(BASE_URL + "/auth")
  }
  if (isPublic && session?.userId) {
    return NextResponse.redirect(BASE_URL + "/chat")
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}