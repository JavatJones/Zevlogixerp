import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'


//icons
import { ChevronLeftCircle } from 'lucide-react';

export const dynamic = 'force-dynamic'


const AdministrationPage = async () => {
    return (
        <div className='flex flex-col space-y-5'>
            <div className='flex flex-row items-center space-x-4'>
                <Button variant={'ghost'} size={'icon'} asChild>
                    <Link href={'/'}>
                        <ChevronLeftCircle size={30} />
                    </Link>
                </Button>
                <h1 className='text-lg font-semibold'>
                    Administración
                </h1>
            </div>



        </div>
    )
}

export default AdministrationPage