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
import { getUserByEmail } from '@/data/user';

const DropdownMenuNavBar = async () => {
    const session = await auth();

    const UserData = await getUserByEmail(session?.user?.email!)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"Transparent"} size={'icon'}>
                    <Bolt className="h-[1.8rem] w-[1.8rem]" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='mx-2' align="center">
                <DropdownMenuLabel asChild className='text-center w-[140px]'>
                    <p className='truncate'>{UserData?.name}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className='flex flex-col gap-2'>
                    <DropdownMenuItem asChild>
                        <Button asChild variant={'ghost'}>
                            <Link href={"/account"}>Perfil</Link>
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <form action={async () => {
                            "use server"
                            await signOut();
                        }}>
                            <Button className='w-full' type='submit' variant={"default"}>
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