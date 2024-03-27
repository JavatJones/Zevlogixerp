import React from 'react'
import Link from 'next/link'
import ClientsList from './(components)/ClientsList';

//ui
import { Button } from '@/components/ui/button'

//icons
import { ChevronLeftCircle } from 'lucide-react';
import { getContactClient } from '@/data/contacts';

//db
import { db } from "@/lib/db";


const ClientsPage = async () => {

  // const GetClients = await getContactClient();

  const GetClientsDb = await db.contact.findMany({
    where: {
      type: "Client",
    },
  });

  const GetClients = GetClientsDb.map((item) => ({
    id: item.id,
    name: item.name,
  }))


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
        <ClientsList
          GetClients={GetClients}
        ></ClientsList>
      </section>

    </section>
  )
}

export default ClientsPage