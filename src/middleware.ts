import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {


    // const user = 'x'; // Debes implementar la lógica para obtener la información del usuario aquí.

    // // Verificar si el usuario no está autenticado y la ruta no es /login
    // if (!user && request.nextUrl.pathname !== '/login') {
    //     // Redirigir a la página de login
    //     return NextResponse.redirect(
    //         new URL('/login', request.url)
    //     )
    // }

    // // Si el usuario está autenticado y la ruta es /login, redirigir a la página principal ("/")
    // if (user && request.nextUrl.pathname === '/login') {
    //     return NextResponse.redirect(
    //         new URL('/', request.url)
    //     )
    // }

    // // Si el usuario está autenticado o la ruta es /login, permitir el acceso
    // return NextResponse.next()

    // const user = '';

    // if (!user) {
    //     return NextResponse.redirect(
    //         new URL('/login', request.url)
    //     )
    // }

    // return NextResponse.next()
}

