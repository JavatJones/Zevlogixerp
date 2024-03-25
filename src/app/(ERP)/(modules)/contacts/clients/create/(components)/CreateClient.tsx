"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

//actions
import create from "@/actions/contacts/clients/user/create"

//ui
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from 'react-toastify';

//validation
import * as z from "zod";
import { CreateNewClientSchema } from "@/schemas/index"
import { useTransition } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FormError } from '@/components/forms/form-error'
import { FormSuccess } from '@/components/forms/form-success'



const CreateClient = () => {

  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateNewClientSchema>>({
    resolver: zodResolver(CreateNewClientSchema),
    defaultValues: {
      name: "",
      rfc: "",
      email: "",
    }
  });

  const onSubmit = (values: z.infer<typeof CreateNewClientSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      create(values)
        .then((data) => {

          setSuccess(data.success)
          setError(data.error)

          if (data.error === undefined) {
            form.reset()
            router.refresh();
            router.push('/contacts/clients');
            router.refresh();
          }

          toast.success(data.success?.toString())
          toast.error(data.error?.toString())


        })
        .catch((error) => {
          console.log(error)
        })
    });

  }

  return (

    <Card className='flex flex-col w-full max-w-md'>
      <CardHeader>
        <CardTitle className='font-bold text-center text-3xl'>Crear nuevo cliente</CardTitle>
        <CardDescription className='text-center'>Registrar nuevo cliente en la agenda de contactos</CardDescription>
      </CardHeader>
      <CardContent >

        <Form {...form}>
          <form id='thisFrom' onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-6'>

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => {
                return <FormItem>
                  <FormLabel className='text-md'>
                    Nombre
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='Nombre de empresa' type='text' {...field} disabled={isPending}></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              }}>
            </FormField>

            <FormField
              control={form.control}
              name='rfc'
              render={({ field }) => {
                return <FormItem>
                  <FormLabel className='text-md'>
                    RFC
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='ej. LOGJ580812RH7' type='text' {...field} disabled={isPending}></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              }}>
            </FormField>

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => {
                return <FormItem>
                  <FormLabel className='text-md'>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='ej. jhon.doe@example.com' type='text' {...field} disabled={isPending}></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              }}>
            </FormField>

            {/* <FormError message={error}></FormError>
            <FormSuccess message={success}></FormSuccess> */}


            <div className='flex flex-row space-x-4'>
              <Button asChild className='w-full' variant={'ghost'} disabled={isPending}>
                <Link href={"/contacts/clients"}>
                  <p>Volver</p>
                </Link>
              </Button>
              <Button className='w-full' type='submit' disabled={isPending}>

                {isPending ?
                  <p>Creando...</p>
                  :
                  <p>Crear usuario</p>
                }
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>

  )
}

export default CreateClient