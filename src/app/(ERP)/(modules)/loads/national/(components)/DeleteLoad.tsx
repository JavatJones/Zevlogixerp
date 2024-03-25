"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react';
//actions
import deleteLoad from "@/actions/loads/deleteLoad"
type getLoad = {
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
import { toast } from 'react-toastify';


//validation
import * as z from "zod";
import { DeleteLoadSchema } from "@/schemas/index"
import { useTransition } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FormError } from '@/components/forms/form-error'
import { FormSuccess } from '@/components/forms/form-success'

const DeleteLoad: React.FC<getLoad> = (props) => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();


    //Validation
    const form = useForm<z.infer<typeof DeleteLoadSchema>>({
        resolver: zodResolver(DeleteLoadSchema),
        defaultValues: {
            id: props.id,
        }
    });

    //upload user to delete
    const onSubmit = (values: z.infer<typeof DeleteLoadSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            deleteLoad(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);

                    if (data.error === undefined) {
                        router.refresh();
                    }

                    toast.success(data.success?.toString());
                    toast.error(data.error?.toString());

                })
                .catch((error) => {
                    console.log(error)
                })
        });

    }


    return (
        <AlertDialog>

            <AlertDialogTrigger asChild>
                <Button variant="default">Borrar embarque</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Está completamente seguro?</AlertDialogTitle>
                </AlertDialogHeader>
                <Form {...form}>
                    <form id='' onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-5'>

                        <AlertDialogDescription>

                            Esta acción no se puede deshacer. Esto borrará permanentemente del sistema.

                        </AlertDialogDescription>

                        <AlertDialogFooter>
                            <AlertDialogCancel asChild>
                                <Button variant={'ghost'}>
                                    Volver
                                </Button>
                            </AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button type='submit' disabled={isPending}>

                                    {isPending ?
                                        <p>Borrando...</p>
                                        :
                                        <p>Confirmar</p>
                                    }
                                </Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>

        </AlertDialog>
    )
}

export default DeleteLoad