import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

//icons
import { ChevronLeftCircle } from 'lucide-react';

//data
import { getUserByID } from '@/data/user'
import UserNotFound from './(components)/UserNotFound';
import EditForm from './(components)/EditForm';

const UserIDPage = async ({ params }: { params: { UserID: string } }) => {

  const user = await getUserByID(params.UserID);

  if (!user) {
    // Si el usuario no existe, devolver una página de error
    return (
      <UserNotFound errorID={params.UserID}></UserNotFound>
    );
  }

  return (

    <section className='flex flex-col space-y-8'>
      <div className='flex flex-row items-center space-x-4'>
        <Button variant={'ghost'} size={'icon'} asChild>
          <Link href={'/settings/users'}>
            <ChevronLeftCircle size={30} />
          </Link>
        </Button>
        <h1 className='text-lg font-semibold'>
          Usuarios / {user.name}
        </h1>
      </div>

      <EditForm id={user.id} name={user.name} email={user.email} admin={user.admin} loads={user.loads} finances={user.finances} billing={user.billing} contacts={user.contacts}></EditForm>

    </section>
  )
}

export default UserIDPage