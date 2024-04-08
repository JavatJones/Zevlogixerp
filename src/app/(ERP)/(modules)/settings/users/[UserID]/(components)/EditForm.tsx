"use client";
import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
//actions
import update from "@/actions/update"


//Data fetch of user from a server component
type getActualData = {
  id: string;
  name: string;
  email: string;

  admin: boolean;
  loads: boolean;
  finances: boolean;
  billing: boolean;
  contacts: boolean;
  sales: boolean;
  quotes: boolean;
}

//ui
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from "@/components/ui/separator"


//validation
import * as z from "zod";
import { UpdateSchema } from "@/schemas/index"
import { useTransition } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FormError } from '@/components/forms/form-error'
import { FormSuccess } from '@/components/forms/form-success'
import { toast } from 'react-toastify';


const EditForm: React.FC<getActualData> = (props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  //Validation
  const form = useForm<z.infer<typeof UpdateSchema>>({
    resolver: zodResolver(UpdateSchema),
    defaultValues: {
      id: props.id,
      name: props.name,
      email: props.email,

      admin: props.admin,
      loads: props.loads,
      finances: props.finances,
      billing: props.billing,
      contacts: props.contacts,
      quotes: props.quotes,
      sales: props.sales,
    }
  });

  //update user data
  const onSubmit = (values: z.infer<typeof UpdateSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      update(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);


          if (data.error === undefined) {
            router.refresh();
          }

          toast.success(data.success)
          toast.error(data.error)

        }).catch((error) => {
          console.log(error)
        })
    });
  }


  return (
    <Card className='container max-w-md'>
      <CardHeader>
        <CardTitle className='font-bold text-center text-3xl'>Editar usuario</CardTitle>
        <CardDescription className='text-center'>Id: {props.id}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-5'>
          <CardContent className='flex flex-col space-y-5'>


            <div className='flex flex-col space-y-5'>
              {/* Nombre */}
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => {
                  return <FormItem>
                    <div className='flex flex-row space-x-4 items-center'>
                      <FormLabel className='text-md'>
                        Nombre
                      </FormLabel>
                      <FormControl>
                        <Input placeholder='Nombre y apellido' type='text' {...field} disabled={isPending}></Input>
                      </FormControl>
                    </div>
                    <FormMessage></FormMessage>
                  </FormItem>
                }}>
              </FormField>
              {/* Email */}
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => {
                  return <FormItem>
                    <div className='flex flex-row space-x-4 items-center'>
                      <FormLabel className='text-md'>
                        Correo
                      </FormLabel>
                      <FormControl>
                        <Input placeholder='Email del usuario' type='text' {...field} disabled={isPending}></Input>
                      </FormControl>
                    </div>
                    <FormMessage></FormMessage>
                  </FormItem>
                }}>
              </FormField>

            </div>

            <Separator />

            <div className='flex flex-col space-y-5'>
              <CardTitle className='font-bold text-center text-3xl'>Asignar permisos</CardTitle>
              <CardDescription className='text-center'>Asigna los permisos del usuario</CardDescription>

              {/* admin */}
              <FormField
                control={form.control}
                name='admin'
                render={({ field }) => {
                  return <FormItem>
                    <div className='flex flex-row justify-between items-center'>
                      <FormLabel className='text-md'>
                        Administrador
                      </FormLabel>
                      <FormControl>

                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isPending}
                        />
                      </FormControl>
                    </div>
                    <FormMessage></FormMessage>
                  </FormItem>
                }}>
              </FormField>

              {/* Cargamentos */}
              <FormField
                control={form.control}
                name='loads'
                render={({ field }) => {
                  return <FormItem>
                    <div className='flex flex-row justify-between items-center'>
                      <FormLabel className='text-md'>
                        Embarques
                      </FormLabel>
                      <FormControl>

                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isPending}
                        />
                      </FormControl>
                    </div>
                    <FormMessage></FormMessage>
                  </FormItem>
                }}>
              </FormField>

              {/* Finanzas */}
              <FormField
                control={form.control}
                name='finances'
                render={({ field }) => {
                  return <FormItem>
                    <div className='flex flex-row justify-between items-center'>
                      <FormLabel className='text-md'>
                        Finanzas
                      </FormLabel>
                      <FormControl>

                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isPending}
                        />
                      </FormControl>
                    </div>
                    <FormMessage></FormMessage>
                  </FormItem>
                }}>
              </FormField>

              {/* facturación */}
              <FormField
                control={form.control}
                name='billing'
                render={({ field }) => {
                  return <FormItem>
                    <div className='flex flex-row justify-between items-center'>
                      <FormLabel className='text-md'>
                        Facturación
                      </FormLabel>
                      <FormControl>

                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isPending}
                        />
                      </FormControl>
                    </div>
                    <FormMessage></FormMessage>
                  </FormItem>
                }}>
              </FormField>

              {/* sales */}
              <FormField
                control={form.control}
                name='sales'
                render={({ field }) => {
                  return <FormItem>
                    <div className='flex flex-row justify-between items-center'>
                      <FormLabel className='text-md'>
                        Ventas
                      </FormLabel>
                      <FormControl>

                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isPending}
                        />
                      </FormControl>
                    </div>
                    <FormMessage></FormMessage>
                  </FormItem>
                }}>
              </FormField>

                {/* quotes */}
                <FormField
                control={form.control}
                name='quotes'
                render={({ field }) => {
                  return <FormItem>
                    <div className='flex flex-row justify-between items-center'>
                      <FormLabel className='text-md'>
                        Cotizaciones
                      </FormLabel>
                      <FormControl>

                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isPending}
                        />
                      </FormControl>
                    </div>
                    <FormMessage></FormMessage>
                  </FormItem>
                }}>
              </FormField>

              {/* contactos */}
              <FormField
                control={form.control}
                name='contacts'
                render={({ field }) => {
                  return <FormItem>
                    <div className='flex flex-row justify-between items-center'>
                      <FormLabel className='text-md'>
                        Contactos
                      </FormLabel>
                      <FormControl>

                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isPending}
                        />
                      </FormControl>
                    </div>
                    <FormMessage></FormMessage>
                  </FormItem>
                }}>
              </FormField>


            </div>
          </CardContent>


          <CardFooter className='flex flex-row space-x-4'>
            <Button asChild className='w-full' variant={'ghost'} disabled={isPending}>
              <Link href={"/settings/users"}>
                <p>Volver</p>
              </Link>
            </Button>
            <Button className='w-full' type='submit' disabled={isPending}>

              {isPending ?
                <p>Guardando...</p>
                :
                <p>Guardar</p>
              }
            </Button>
          </CardFooter>

        </form>
      </Form>

    </Card >

  )
}

export default EditForm