import { NextRequest, NextResponse, userAgent } from 'next/server'
import getCurrentUser from './app/actions/getCurrentUser';
 
export function middleware(request: NextRequest) {
  const { device } = userAgent(request);
  // const cookieStore = cookies();
  const res = NextResponse.next();
  
  
  
  
  // device.type can be: 'mobile', 'tablet', 'console', 'smarttv',
  // 'wearable', 'embedded', or undefined (for desktop browsers)
  const viewport = device.type || 'desktop'
  res.cookies.set('device', viewport);
 

  // Apply those cookies to the request
  // applySetCookie(request, res);

  return res;
}