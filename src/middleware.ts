import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {


    const path = request.nextUrl.pathname;
    console.log("path is : " , path);

const isPublicepath = path === "/login" || path === "/signup" || path === "/verifyemail";
console.log("ispubhicpath is : " , isPublicepath);


const token = request.cookies.get("token")?.value || "";


//condition

if(isPublicepath && token){
  return NextResponse.redirect(new URL('/', request.url))

}

if(!isPublicepath && !token){
    return NextResponse.redirect(new URL('/login', request.url))
  
  }



  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile',
    '/verifyemail',

  ],
}
