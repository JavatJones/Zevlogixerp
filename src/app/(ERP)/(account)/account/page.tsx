import React from 'react'


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ResetPassword from './(components)/ResetPassword'
import { auth } from '@/lib/auth'
import { getUserByEmail } from '@/data/user'


const ProfilePage = async () => {
  const session = await auth();
  const UserData = await getUserByEmail(session?.user?.email!)

  return (


    <Card>
      <CardHeader>
        {JSON.stringify(session)}
        <CardTitle>{UserData?.name}</CardTitle>
        {/* <CardDescription>ID_User</CardDescription> */}
      </CardHeader>
      <CardContent className='flex flex-col'>



        <div>
          <CardHeader>
            <CardTitle>Opciones</CardTitle>
            <CardDescription>Personaliza algunos aspectos del sistema</CardDescription>
          </CardHeader>

          <CardContent className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>

            <Card className='flex-grow basis-10'>
              <CardHeader>
                <CardTitle>Perfil</CardTitle>
                <CardDescription>Configura aspectos relacionados a tu perfil</CardDescription>
              </CardHeader>
              <CardContent>
                <ResetPassword id='1'></ResetPassword>
              </CardContent>
              {/* <CardFooter>
                <p>Card Footer</p>
              </CardFooter> */}
            </Card>

          </CardContent>
        </div>
      </CardContent>

    </Card>
  )
}

export default ProfilePage