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


const DropdownMenuNavBar = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"Transparent"} size={'icon'}>
                    <Bolt className="h-[1.8rem] w-[1.8rem]" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='mx-2' align="center">
                <DropdownMenuLabel className='text-center'>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className='flex flex-col gap-2'>
                    <DropdownMenuItem asChild>
                        <Button variant={'ghost'}>
                            Perfil
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Button variant={'ghost'}>
                            Configuraciones
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Button variant={"default"}>
                            Cerrar sesión
                        </Button>
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default DropdownMenuNavBar