import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
//components
import ProviderInfo from './(components)/ProviderInfo'
import UserNotFound from './(components)/UserNotFound'
//icons
import { ChevronLeftCircle } from 'lucide-react';
import { getClientByID } from '@/data/contacts';

const ProviderPageDetails = async ({ params }: { params: { ProviderID: string } }) => {

  const getClient = await getClientByID(params.ProviderID)

  if (!getClient) {
    // Si el usuario no existe, devolver una página de error
    return (
      <UserNotFound errorID={params.ProviderID}></UserNotFound>
    );
  }


  return (
    <section className='flex flex-col space-y-8'>
      <div className='flex flex-row items-center space-x-4'>
        <Button variant={'ghost'} size={'icon'} asChild>
          <Link href={'/contacts/providers'}>
            <ChevronLeftCircle size={30} />
          </Link>
        </Button>
        <h1 className='text-lg font-semibold'>
          Lista de contactos
        </h1>
      </div>

      <section className=''>
        <ProviderInfo id={getClient.id} name={getClient.name} rfc={getClient.rfc} email={getClient.email}></ProviderInfo>
      </section>

    </section>
  )
}

export default ProviderPageDetails