import React from 'react'
import ModulesList from './(components)/ModulesList'
import { auth } from '@/lib/auth'
const HomePage = async () => {

  const session = await auth();

  
  return (
    <section className='flex flex-col '>
      {/* {JSON.stringify(session)} */}

      <ModulesList></ModulesList>
     
    </section>
  )
}

export default HomePage