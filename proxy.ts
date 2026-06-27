import { NextRequest, NextResponse } from 'next/server';

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/admin/dashboard') || pathname.startsWith('/admin/manage')) {
    const token = req.cookies.get('admin_token')?.value;
    if (!token || token !== process.env.ADMIN_SECRET_TOKEN) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*', '/admin/manage/:path*'],
};
