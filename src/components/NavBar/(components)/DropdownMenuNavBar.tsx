import React from 'react'

//icons
import { Bolt } from 'lucide-react';

//ui
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import Link from 'next/link';
import { auth, signOut } from '@/lib/auth'

const DropdownMenuNavBar = async () => {
    const session = await auth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"Transparent"} size={'icon'}>
                    <Bolt className="h-[1.8rem] w-[1.8rem]" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='mx-2' align="center">
                <DropdownMenuLabel className='text-center'>
                    {session?.user?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className='flex flex-col gap-2'>
                    <DropdownMenuItem asChild>
                        <Button asChild variant={'ghost'}>
                            <Link href={"account"}>Perfil</Link>
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <form action={async () => {
                            "use server"
                            await signOut();
                        }}>
                            <Button type='submit' variant={"default"}>
                                Cerrar sesión
                            </Button>
                        </form>
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default DropdownMenuNavBar