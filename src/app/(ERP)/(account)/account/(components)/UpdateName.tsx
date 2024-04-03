"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react';
//actions
import UpdateName from "@/actions/updateName"
type getUser = {
    id: string;
    name: string;
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
import { UpdateNameSchema } from "@/schemas/index"
import { useTransition } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FormError } from '@/components/forms/form-error'
import { FormSuccess } from '@/components/forms/form-success'
import { toast } from 'react-toastify';


const DeleteUserDialog: React.FC<getUser> = (props) => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();


    //Validation
    const form = useForm<z.infer<typeof UpdateNameSchema>>({
        resolver: zodResolver(UpdateNameSchema),
        defaultValues: {
            id: props.id,
            name: props.name,
      
        }
    });

    //upload user to delete
    const onSubmit = (values: z.infer<typeof UpdateNameSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            UpdateName(values)
                .then((data) => {

                    setError(data.error);
                    setSuccess(data.success);


                    if (data.error === undefined) {

                        router.refresh();
                        form.reset()
                    }

                    toast.success(data.success)
                    toast.error(data.error)

                }).catch((error) => {
                    console.log(error)
                })
        });
    }


    return (

        <AlertDialog>

            <AlertDialogTrigger asChild>
                <Button variant="ghost">Cambiar contraseña</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Cambiar contraseña</AlertDialogTitle>
                </AlertDialogHeader>
                <Form {...form}>
                    <form id='' onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-5'>

                        <AlertDialogDescription className='flex flex-col space-y-5'>

                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => {
                                    return <FormItem>
                                        <div className='flex flex-col space-y-2'>
                                            <FormLabel className='text-md'>
                                                Contraseña
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder='Escribe la contraseña' type='text' {...field} disabled={isPending}></Input>
                                            </FormControl>
                                        </div>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                }}>
                            </FormField>

                        </AlertDialogDescription>

                        <AlertDialogFooter>
                            <AlertDialogCancel asChild>
                                <Button variant={'ghost'} onClick={() => (form.reset())}>
                                    Volver
                                </Button>
                            </AlertDialogCancel>
                            <Button type='submit' disabled={isPending}>

                                {isPending ?
                                    <p>Cambiando...</p>
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

export default DeleteUserDialog