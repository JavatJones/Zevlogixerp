import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
export const dynamic = 'force-dynamic'


//icons
import { ChevronLeftCircle } from 'lucide-react';
import AllItems from './(components)/AllItems';

const InventoryPage = async () => {
    return (
        <div className='flex flex-col space-y-5'>
            <div className='flex flex-row items-center space-x-4'>
                <Button variant={'ghost'} size={'icon'} asChild>
                    <Link href={'/'}>
                        <ChevronLeftCircle size={30} />
                    </Link>
                </Button>
                <h1 className='text-lg font-semibold'>
                    Inventario
                </h1>
            </div>

            <AllItems></AllItems>

        </div>
    )
}

export default InventoryPage