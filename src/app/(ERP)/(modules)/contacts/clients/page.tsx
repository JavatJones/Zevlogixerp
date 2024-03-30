import React from 'react'
import Link from 'next/link'
import ClientsList from './(components)/ClientsList';

//ui
import { Button } from '@/components/ui/button'

//icons
import { ChevronLeftCircle } from 'lucide-react';

//db
import { db } from "@/lib/db";
import { getContactClient } from '@/data/contacts';

export const dynamic = 'force-dynamic'

const ClientsPage = () => {

  return (
    <section className='flex flex-col space-y-8'>
      <div className='flex flex-row items-center space-x-4'>
        <Button variant={'ghost'} size={'icon'} asChild>
          <Link href={'/contacts'}>
            <ChevronLeftCircle size={30} />
          </Link>
        </Button>
        <h1 className='text-lg font-semibold'>
          Clientes
        </h1>
      </div>

      <section className=''>
        <ClientsList />
      </section>

    </section>
  )
}

export default ClientsPage