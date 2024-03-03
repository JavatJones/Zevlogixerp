import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
//components
import ClientInfo from './(components)/ClientInfo'
import AddressInfo from './(components)/AddressInfo'
import UserNotFound from './(components)/UserNotFound'
//icons
import { ChevronLeftCircle } from 'lucide-react';
import { getClientByID } from '@/data/contacts';

const ClientIDPage = async ({ params }: { params: { ClientID: string } }) => {

  const getClient = await getClientByID(params.ClientID)

  if (!getClient) {
    // Si el usuario no existe, devolver una página de error
    return (
      <UserNotFound errorID={params.ClientID}></UserNotFound>
    );
  }

  return (

    <section className='flex flex-col space-y-8'>
      <div className='flex flex-row items-center space-x-4'>
        <Button variant={'ghost'} size={'icon'} asChild>
          <Link href={'/contacts/clients'}>
            <ChevronLeftCircle size={30} />
          </Link>
        </Button>
        <h1 className='text-lg font-semibold'>
          Lista de contactos
        </h1>
      </div>

      <section className='flex flex-col md:flex-row justify-between gap-5'>
        <ClientInfo id={getClient.id} name={getClient.name} rfc={getClient.rfc} email={getClient.email}></ClientInfo>
        <AddressInfo id={getClient.id}></AddressInfo>
      </section>

    </section>

  )
}

export default ClientIDPage