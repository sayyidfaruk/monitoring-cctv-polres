import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export default function withAuth(middleware, requireAuth) {
  return async (req, next) => {
    const pathname = req.nextUrl.pathname;
    const isProtectedRoute = requireAuth.some((route) => pathname.startsWith(route));
    const isLoginPath = pathname === '/cctv/login' || pathname === '/v1/admin/login';
    const isApiRoute = pathname.startsWith('/api/v1.0.0/auth');
    if (isProtectedRoute && !isLoginPath) {
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

      if (!token) {
        if (isApiRoute) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const redirectPath = pathname.startsWith('/cctv') ? '/cctv/login' : '/v1/admin/login';
        const url = new URL(redirectPath, req.url);
        url.searchParams.set('callbackUrl', encodeURI(req.url));
        return NextResponse.redirect(url);
      }
      if (pathname.startsWith('/v1/admin') && token.role !== 'Admin') {
        const url = new URL('/v1/admin/login', req.url);
        url.searchParams.set('callbackUrl', encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      if (pathname.startsWith('/cctv') && token.role !== 'User') {
        const url = new URL('/cctv/login', req.url);
        url.searchParams.set('callbackUrl', encodeURI(req.url));
        return NextResponse.redirect(url);
      }
    }

    return middleware(req, next);
  };
}
