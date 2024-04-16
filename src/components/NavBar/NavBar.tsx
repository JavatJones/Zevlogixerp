import React from 'react'
import Link from 'next/link';

//icons - pc

//icons - mobile
import { Minus, Plus } from "lucide-react"
import { Menu } from 'lucide-react';

//components
import ToggleTheme from "@/components/ToggleTheme/ToggleTheme"
import DropdownMenuNavBar from './(components)/DropdownMenuNavBar';
import Drawler from './(components)/Drawler';

const NavBar = () => {
    return (
        <header className='fixed top-0 z-50 w-full  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 '>
            <nav>
                <article className='container h-14 hidden lg:flex flex-row justify-between items-center'>
                    <Link href={"/"} className='text-xl hover:scale-105 transition-all'>ZEVLOGIX ERP</Link>
                    <div className='flex flex-row space-x-5'>
                        <ToggleTheme></ToggleTheme>
                        <DropdownMenuNavBar></DropdownMenuNavBar>
                    </div>
                </article>

                <article className='container h-14 flex lg:hidden flex-row justify-between items-center'>
                    <Link href={"/"} className='text-xl hover:scale-105 transition-all'>ZEVLOGIX ERP</Link>
                    <Drawler></Drawler>
                </article>
            </nav>
        </header>
    )
}

export default NavBar