"use client";
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react';

//actions
import updateClient from "@/actions/contacts/clients/user/update"
type ClientData = {
  id: string,
  client: string,
  rfc: string,
  email: string,
}

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


//validation
import * as z from "zod";
import { UpdateClientSchema } from "@/schemas/index"
import { useTransition } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FormError } from '@/components/forms/form-error'
import { FormSuccess } from '@/components/forms/form-success'


const EditClient: React.FC<ClientData> = (props) => {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  //Validation
  const form = useForm<z.infer<typeof UpdateClientSchema>>({
    resolver: zodResolver(UpdateClientSchema),
    defaultValues: {
      id: props.id,
      name: props.client,
      rfc: props.rfc,
      email: props.email,
    }
  });

  //upload user to delete
  const onSubmit = (values: z.infer<typeof UpdateClientSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      updateClient(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
          router.refresh();
        })
    });

  }

  return (
    <AlertDialog>

      <AlertDialogTrigger asChild>
        <Button variant="default">Editar usuario</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Editar usuario</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-5'>

            <AlertDialogDescription className='flex flex-col space-y-5'>

              <p>Esta acción no se puede deshacer. Esto editara los campos del sistema.</p>
             
              {/* dummy for id*/}
              <FormField
                control={form.control}
                name='id'
                render={({ field }) => {
                  return <FormItem>
                    <div className='hidden flex-col space-y-3 items-start'>
                      <FormLabel className='text-md'>
                        id
                      </FormLabel>
                      <FormControl>
                        <Input placeholder='id' type='text' {...field} disabled></Input>
                      </FormControl>
                    </div>
                    <FormMessage></FormMessage>
                  </FormItem>
                }}>
              </FormField>


              <FormField
                control={form.control}
                name='name'
                render={({ field }) => {
                  return <FormItem>
                    <div className='flex flex-col space-y-3 items-start'>
                      <FormLabel className='text-md'>
                        Nombre
                      </FormLabel>
                      <FormControl>
                        <Input placeholder='Nombre del cliente' type='text' {...field} disabled={isPending}></Input>
                      </FormControl>
                    </div>
                    <FormMessage></FormMessage>
                  </FormItem>
                }}>
              </FormField>

              <FormField
                control={form.control}
                name='rfc'
                render={({ field }) => {
                  return <FormItem>
                    <div className='flex flex-col space-y-3 items-start'>
                      <FormLabel className='text-md'>
                        RFC
                      </FormLabel>
                      <FormControl>
                        <Input placeholder='ej. LOGJ580812RH7' type='text' {...field} disabled={isPending}></Input>
                      </FormControl>
                    </div>
                    <FormMessage></FormMessage>
                  </FormItem>
                }}>
              </FormField>

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => {
                  return <FormItem>
                    <div className='flex flex-col space-y-3 items-start'>
                      <FormLabel className='text-md'>
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input placeholder='email' type='text' {...field} disabled={isPending}></Input>
                      </FormControl>
                    </div>
                    <FormMessage></FormMessage>
                  </FormItem>
                }}>
              </FormField>

              <FormError message={error}></FormError>
              <FormSuccess message={success}></FormSuccess>

            </AlertDialogDescription>

            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant={'ghost'}>
                  Volver
                </Button>
              </AlertDialogCancel>
              <Button type='submit' disabled={isPending}>

                {isPending ?
                  <p>Actualizando...</p>
                  :
                  <p>Confirmar</p>
                }
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>

    </AlertDialog>
  )
}

export default EditClient