import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
//icons
import { ChevronLeftCircle } from 'lucide-react';
//components
import CreateNewLoadNational from "./(components)/CreateLoadNational"

const CreateNewLoadNationalPage = () => {
    return (

        <section className='flex flex-col space-y-8'>
            <div className='flex flex-row items-center space-x-4'>
                <Button variant={'ghost'} size={'icon'} asChild>
                    <Link href={'/loads/national'}>
                        <ChevronLeftCircle size={30} />
                    </Link>
                </Button>
                <h1 className='text-lg font-semibold'>
                    Embarques Nacionales
                </h1>
            </div>

            <section className='flex flex-col items-center justify-center'>
                <CreateNewLoadNational></CreateNewLoadNational>
            </section>
        </section>


    )
}

export default CreateNewLoadNationalPage