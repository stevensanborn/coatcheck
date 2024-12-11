import middleware, { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server"
import { getToken } from 'next-auth/jwt';

// // More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
// export default withAuth({
//   callbacks: {
//     authorized: ({ req, token }) =>{
//       // /admin requires admin role, but /me only requires the user to be logged in.
//         console.log("checking .,,,," + req.nextUrl.pathname)
//       return req.nextUrl.pathname !== "/admin" || token?.userRole === "admin";
//     },
//   },
// })

// export const config = { matcher: ["/admin", "/profile"] }


// export default async function middleware(req: NextRequest) {
//   console.log('Hello, world!')
//   const protectedRoutes = ['/profile']
//   const publicRoutes = ['/login', '/signup', '/']

//   const path = req.nextUrl.pathname;
//   const isProtectedRoute = protectedRoutes.includes(path);

//   const isPublicRoute = publicRoutes.includes(path);

//   const token = await getToken({ req });
    
//   const isAuthenticated = !!token;

//   if(isProtectedRoute && !isAuthenticated) {
//     return NextResponse.redirect(new URL('/signin', req.url))
//   }

//   console.log(token)

//   const authMiddleware = await withAuth({
//     pages: {
//       signIn: `/login`,
//     },
//   });


// }   


// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req) {
//     console.log('middleware')
//     console.log(req.nextauth.token)
//     console.log(req.nextUrl.pathname)
//     // if(req.nextUrl.pathname === '/dashboard'){
//     //   // if(!req.nextauth.token){
//     //     return NextResponse.redirect(new URL('/signin', req.url))
//     //   // }
//     // }
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) =>  token ? true : false // If there is a token, the user is authenticated
//     },
//   },
// )

export const config = { matcher: ["/coatcheck/:path*"] }


import { authOptions } from "@/pages/api/auth/[...nextauth]"

export default withAuth(
  function middleware(req) {
    console.log('middleware')
    console.log(req.nextauth.token)
    console.log(req.nextUrl.pathname)
  },
  {
    callbacks: {
    authorized: ({  token }) =>{ 
      console.log('authorized', token)
      return !!token
    },
  },
}

)