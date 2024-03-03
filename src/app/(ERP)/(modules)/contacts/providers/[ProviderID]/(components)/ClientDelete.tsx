"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react';
//actions
import deleteUser from "@/actions/contacts/clients/user/delete"
type getUser = {
    id: string;
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
import { DeleteUserSchema } from "@/schemas/index"
import { useTransition } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FormError } from '@/components/forms/form-error'
import { FormSuccess } from '@/components/forms/form-success'


const DeleteUserDialog: React.FC<getUser> = (props) => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();


    //Validation
    const form = useForm<z.infer<typeof DeleteUserSchema>>({
        resolver: zodResolver(DeleteUserSchema),
        defaultValues: {
            id: props.id,
        }
    });

    //upload user to delete
    const onSubmit = (values: z.infer<typeof DeleteUserSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            deleteUser(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                    router.push('/contacts/providers');
                    router.refresh();

                })
        });

    }


    return (

        <AlertDialog>

            <AlertDialogTrigger asChild>
                <Button variant="default">Borrar usuario</Button>
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
                                    <p>Borrando...</p>
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