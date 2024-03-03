import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'


//icons
import { ChevronLeftCircle } from 'lucide-react';
import ProvidersList from './(components)/ProvidersList';
const ProvidersPage = () => {
  return (
    <section className='flex flex-col space-y-8'>
      <div className='flex flex-row items-center space-x-4'>
        <Button variant={'ghost'} size={'icon'} asChild>
          <Link href={'/contacts'}>
            <ChevronLeftCircle size={30} />
          </Link>
        </Button>
        <h1 className='text-lg font-semibold'>
          Provedores
        </h1>
      </div>

      <article className=''>
        <ProvidersList></ProvidersList>
      </article>

    </section>
  )
}

export default ProvidersPage