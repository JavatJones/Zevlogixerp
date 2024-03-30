import React from 'react'
import Link from 'next/link'
import { UserInfoSchema, columns } from "./(components)/columns"
import { DataTable } from "./(components)/data-table"
import { getAllUsers } from '@/data/user'
import { Button } from '@/components/ui/button'

//icons
import { ChevronLeftCircle } from 'lucide-react';

export const dynamic = 'force-dynamic'


async function getData(): Promise<UserInfoSchema[]> {
  // Fetch data from your API here.
  const users = await getAllUsers();

  if (!users) {
    // Manejar el caso en que loads sea null
    console.error('Error: No se pudo obtener la carga');
    return [];
  }

  return users.map((user: any) => ({
    id: user.id,
    name: user.name,
    lastName: user.lastName,
    email: user.email,
  }));
}

const UserPage = async () => {
  const data = await getData();

  return (
    <section className='flex flex-col space-y-8'>
      <div className='flex flex-row items-center space-x-4'>
        <Button variant={'ghost'} size={'icon'} asChild>
          <Link href={'/settings'}>
            <ChevronLeftCircle size={30} />
          </Link>
        </Button>
        <h1 className='text-lg font-semibold'>
          Usuarios
        </h1>
      </div>
      <DataTable columns={columns} data={data} />
      
    </section>
  )
}

export default UserPage