import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const isLogin=request.cookies.get("data");

    if(!isLogin){
        if(request.nextUrl.pathname.startsWith("/customer")){
            return NextResponse.redirect("http://localhost:3000/login");
        }
    }

    if(isLogin){
        if(request.url==="http://localhost:3000/login"){
            return NextResponse.redirect("http://localhost:3000");
        }
    }

  if (request.nextUrl.pathname.startsWith('/about')) {
    return NextResponse.rewrite(new URL('/about-2', request.url))
  }
 
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  }
}