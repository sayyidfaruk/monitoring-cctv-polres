import { NextResponse } from 'next/server';
import withAuth from './app/middlewares/withAuth';

export function mainMiddleware(req) {
  const res = NextResponse.next();
  return res;
}
export default withAuth(mainMiddleware, ['/cctv', '/v1/admin', '/api/v1.0.0/auth']);
