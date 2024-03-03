import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ModulesList from './(components)/ModulesList';

//icons
import { ChevronLeftCircle } from 'lucide-react';


const ConfigPage = () => {
  return (
    <section className='flex flex-col space-y-8'>
      <div className='flex flex-row items-center space-x-4'>
        <Button variant={'ghost'} size={'icon'} asChild>
          <Link href={'/'}>
            <ChevronLeftCircle size={30} />
          </Link>
        </Button>
        <h1 className='text-lg font-semibold'>
          Configuraciones
        </h1>
      </div>

      <section className='container max-w-2xl'>
        <ModulesList></ModulesList>
      </section>

    </section>
  )
}

export default ConfigPage