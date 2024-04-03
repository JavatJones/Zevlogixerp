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


const ProfilePage = () => {
  return (


    <div>
      <CardHeader>
        <CardTitle>Nombre y apellido del usuario del erp</CardTitle>
        <CardDescription>ID_User</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col'>



        <Card>
          <CardHeader>
            <CardTitle>Opciones</CardTitle>
            <CardDescription>Personaliza algunos aspectos del sistema</CardDescription>
          </CardHeader>

          <CardContent className='grid grid-cols-1 lg:grid-cols-3 gap-5'>

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
        </Card>
      </CardContent>

    </div>
  )
}

export default ProfilePage