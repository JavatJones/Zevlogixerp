"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react';
//actions
import deleteAddress from "@/actions/contacts/clients/address/delete"
type getID = {
  id: string;
}
//ui
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
import { toast } from 'react-toastify';



//validation
import * as z from "zod";
import { DeleteAddressSchema } from "@/schemas/index"
import { useTransition } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FormError } from '@/components/forms/form-error'
import { FormSuccess } from '@/components/forms/form-success'



const DeleteAddressDialog: React.FC<getID> = (props) => {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();


  //Validation
  const form = useForm<z.infer<typeof DeleteAddressSchema>>({
    resolver: zodResolver(DeleteAddressSchema),
    defaultValues: {
      id: props.id,
    }
  });

  //upload user to delete
  const onSubmit = (values: z.infer<typeof DeleteAddressSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      deleteAddress(values)
        .then((data) => {

          setSuccess(data.success)
          setError(data.error)

          if (data.error === undefined) {
            router.refresh()
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
    <AlertDialog>

      <AlertDialogTrigger asChild>
        <Button variant="default">Borrar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Está completamente seguro?</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form id='' onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-5'>

            <AlertDialogDescription>
              {/* dummy for id*/}
              <FormField
                control={form.control}
                name='id'
                render={({ field }) => {
                  return <FormItem>
                    <div className='hidden flex-row space-x-4 items-center'>
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

              Esta acción no se puede deshacer. Esto borrará permanentemente la cuenta del sistema.

            </AlertDialogDescription>

            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant={'ghost'}>
                  Volver
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction type='submit' disabled={isPending}>

                {isPending ?
                  <p>Borrando...</p>
                  :
                  <p>Confirmar</p>
                }
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>

    </AlertDialog>
  )
}

export default DeleteAddressDialog