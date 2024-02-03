import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

//icons
import { ChevronLeftCircle } from 'lucide-react';

const LoadsPage = () => {
  return (
    <section className='flex flex-col space-y-8'>
      <div className='flex flex-row items-center space-x-4'>
        <Button variant={'ghost'} size={'icon'} asChild>
          <Link href={'/'}>
            <ChevronLeftCircle size={30} />
          </Link>
        </Button>
        <h1 className='text-lg font-semibold'>
          Embarques
        </h1>
      </div>

      <section className='container'>
        contenido
      </section>

    </section>
  )
}

export default LoadsPage