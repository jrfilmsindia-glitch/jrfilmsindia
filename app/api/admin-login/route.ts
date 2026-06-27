import { NextRequest, NextResponse } from 'next/server';

const isProd = process.env.NODE_ENV === 'production';

const cookieOpts = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: isProd,
  maxAge: 60 * 60 * 8,
  path: '/',
};

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const adminPass = process.env.ADMIN_PASSWORD;
  const editorPass = process.env.EDITOR_PASSWORD;

  if (password === adminPass) {
    const res = NextResponse.json({ ok: true, role: 'admin' });
    res.cookies.set('admin_token', process.env.ADMIN_SECRET_TOKEN!, cookieOpts);
    res.cookies.set('admin_role', 'admin', { sameSite: 'lax', secure: isProd, maxAge: 60 * 60 * 8, path: '/' });
    return res;
  }

  if (password === editorPass) {
    const res = NextResponse.json({ ok: true, role: 'editor' });
    res.cookies.set('admin_token', process.env.ADMIN_SECRET_TOKEN!, cookieOpts);
    res.cookies.set('admin_role', 'editor', { sameSite: 'lax', secure: isProd, maxAge: 60 * 60 * 8, path: '/' });
    return res;
  }

  return NextResponse.json({ ok: false, error: 'Invalid password' }, { status: 401 });
}
