"use client";
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react';

//actions
import createAddress from "@/actions/contacts/clients/address/create"
type ClientData = {
    id: string,

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
import { CreateNewAddressClientSchema } from "@/schemas/index"
import { useTransition } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FormError } from '@/components/forms/form-error'
import { FormSuccess } from '@/components/forms/form-success'

const CreateAddress: React.FC<ClientData> = (props) => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    //Validation
    const form = useForm<z.infer<typeof CreateNewAddressClientSchema>>({
        resolver: zodResolver(CreateNewAddressClientSchema),
        defaultValues: {
            id: props.id,
            address: "",
            codePostal: "",
            city: "",
            state: "",
            country: "",


        }
    });

    //submit form
    const onSubmit = (values: z.infer<typeof CreateNewAddressClientSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            createAddress(values)
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

    //Clear Message 
    const clearMessage = () => {
        setError("");
        setSuccess("");

    }


    return (
        <AlertDialog>

            <AlertDialogTrigger asChild>
                <Button variant="default">Agregar dirección</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Agregar dirección</AlertDialogTitle>
                </AlertDialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-5'>

                        <AlertDialogDescription className='flex flex-col space-y-5'>

                            <p>Esta acción no se puede deshacer. Esto editara los campos del sistema.</p>

                            {/* Dirección*/}
                            <FormField
                                control={form.control}
                                name='address'
                                render={({ field }) => {
                                    return <FormItem>
                                        <div className='flex flex-col space-y-3 items-start'>
                                            <FormLabel className='text-md'>
                                                Dirección
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder='Dirección' type='text' {...field} disabled={isPending}></Input>
                                            </FormControl>
                                        </div>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                }}>
                            </FormField>

                            {/* codePostal */}
                            <FormField
                                control={form.control}
                                name='codePostal'
                                render={({ field }) => {
                                    return <FormItem>
                                        <div className='flex flex-col space-y-3 items-start'>
                                            <FormLabel className='text-md'>
                                                Código postal
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder='Código postal' type='text' {...field} disabled={isPending}></Input>
                                            </FormControl>
                                        </div>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                }}>
                            </FormField>

                            {/* city*/}
                            <FormField
                                control={form.control}
                                name='city'
                                render={({ field }) => {
                                    return <FormItem>
                                        <div className='flex flex-col space-y-3 items-start'>
                                            <FormLabel className='text-md'>
                                                Ciudad
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder='Ciudad' type='text' {...field} disabled={isPending}></Input>
                                            </FormControl>
                                        </div>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                }}>
                            </FormField>

                            {/* state */}
                            <FormField
                                control={form.control}
                                name='state'
                                render={({ field }) => {
                                    return <FormItem>
                                        <div className='flex flex-col space-y-3 items-start'>
                                            <FormLabel className='text-md'>
                                                Estado
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder='Estado' type='text' {...field} disabled={isPending}></Input>
                                            </FormControl>
                                        </div>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                }}>
                            </FormField>

                            {/* country */}
                            <FormField
                                control={form.control}
                                name='country'
                                render={({ field }) => {
                                    return <FormItem>
                                        <div className='flex flex-col space-y-3 items-start'>
                                            <FormLabel className='text-md'>
                                                País
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder='País' type='text' {...field} disabled={isPending}></Input>
                                            </FormControl>
                                        </div>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                }}>
                            </FormField>

                        </AlertDialogDescription>

                        <AlertDialogFooter>
                            <AlertDialogCancel asChild>
                                <Button variant={'ghost'} onClick={() => clearMessage()}>
                                    Volver
                                </Button>
                            </AlertDialogCancel>
                            <AlertDialogAction type='submit' disabled={isPending}>

                                {isPending ?
                                    <p>Actualizando...</p>
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

export default CreateAddress