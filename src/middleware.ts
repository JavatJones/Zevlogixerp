import NextAuth from "next-auth";
import authConfig from "./lib/auth.config";
import {
    publicRoutes,
    authRoutes,
    apiAuthPrefix,
    DEFAULT_LOGIN_REDIRECT,
    protectedRoutes

} from "@/routes"
const { auth } = NextAuth(authConfig);

export default auth(async (req) => {

    // const { nextUrl } = req;
    // const isLoggedIn = !!req.auth;
    // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    // const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    // // const isProtectedRoutes = protectedRoutes.includes(nextUrl.pathname)

    // if (isApiAuthRoute) {
    //     return undefined;
    // }

    // if (isAuthRoute) {
    //     if (isLoggedIn) {
    //         return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    //     }
    //     return undefined;
    // }

    // if (!isLoggedIn && !isPublicRoute) {
    //     return Response.redirect(new URL("/login", nextUrl));
    // }

    return undefined;
})

// Optionally, don't invoke Middleware on some paths
// export const config = {
//     matcher: [
//         // Exclude files with a "." followed by an extension, which are typically static files.
//         // Exclude files in the _next directory, which are Next.js internals.
//         "/((?!.+\\.[\\w]+$|_next).*)",
//         // Re-include any files in the api or trpc folders that might have an extension
//         "/(api|trpc)(.*)"
//     ]
// }