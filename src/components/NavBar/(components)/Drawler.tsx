import React from 'react'
import Link from 'next/link';

//icons - pc

//icons - mobile
import { Minus, Plus } from "lucide-react"
import { Menu } from 'lucide-react';

//components
import ToggleTheme from "@/components/ToggleTheme/ToggleTheme"
import DropdownMenuNavBar from "./DropdownMenuNavBar"

//ui
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

const Drawler = () => {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="Transparent" size="icon">
                    <Menu size="36"></Menu>
                </Button>
            </DrawerTrigger>
            <DrawerContent className='mx-auto w-full max-w-md flex flex-col h-4/5'>

                <DrawerHeader className='border-b-2'>
                    <DrawerTitle className='flex flex-row justify-around items-center'>
                        <ToggleTheme></ToggleTheme>

                        <big>Menú</big>
                        
                        <DropdownMenuNavBar></DropdownMenuNavBar>
                    </DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col gap-3 p-5 h-6/6 overflow-y-auto">
                    
                    <p>Contenido</p>
                    <p>Contenido</p>
                    <p>Contenido</p>
                    <p>Contenido</p>
                    <p>Contenido</p>
                    <p>Contenido</p>
                    <p>Contenido</p>
                    <p>Contenido</p>
                    <p>Contenido</p>
                    <p>Contenido</p>
                    <p>Contenido</p>
                    <p>Contenido</p>
                    <p>Contenido</p>
                    <p>Contenido</p>
                    <p>Contenido</p>
                    <p>Contenido</p>
                    <p>Contenido</p>
                    <p>Contenido</p>

                </div>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button>Cerrar</Button>
                    </DrawerClose>
                </DrawerFooter>

            </DrawerContent>
        </Drawer>
    )
}

export default Drawler