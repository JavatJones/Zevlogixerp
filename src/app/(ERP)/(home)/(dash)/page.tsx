import React from 'react'

import { auth } from '@/lib/auth'
import Modules from "@/components/myUi/Modules"
const HomePage = async () => {

  const session = await auth();

  return (
    <section className='flex flex-col '>
      {/* {JSON.stringify(session)} */}
      <Modules></Modules>
    </section>
  )
}

export default HomePage