"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
//actions
import register from "@/actions/register"

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
import { Button } from "@/components/ui/button"
import { Switch } from '@/components/ui/switch'
import { Separator } from "@/components/ui/separator"

//validation
import * as z from "zod";
import { RegisterSchema } from "@/schemas/index"
import { useTransition } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FormError } from '@/components/forms/form-error'
import { FormSuccess } from '@/components/forms/form-success'
import { toast } from 'react-toastify'


const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",

            admin: false,
            loads: false,
            finances: false,
            billing: false,
            contacts: false
        }
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            register(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);

                    if (data.error === undefined) {
                        router.refresh();
                        router.push('/settings/users');
                        router.refresh();
                    }
                    toast.success(data.success)
                    toast.error(data.error)

                }).catch((error) => {
                    console.log(error)
                })
        });
        router.refresh();
    }

    return (

        <Card className='flex flex-col w-full max-w-md'>
            <CardHeader>
                <CardTitle className='font-bold text-center text-3xl'>Crear nuevo usuario</CardTitle>
                <CardDescription className='text-center'>Registrar nuevo usuario en el sistema</CardDescription>
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
                                        <Input placeholder='Nombre y apellido' type='text' {...field} disabled={isPending}></Input>
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
                                        <Input placeholder='john.doe@example.com' type='email' {...field} disabled={isPending}></Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            }}>
                        </FormField>

                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => {
                                return <FormItem>
                                    <FormLabel className='text-md'>
                                        Contraseña
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder='*****' type='text' {...field} disabled={isPending}></Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            }}>
                        </FormField>

                        <Separator className="my-4" />

                        <div className='flex flex-col space-y-5'>
                            <CardTitle className='text-center'>Asignar permisos</CardTitle>

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
                                                Cargamentos
                                            </FormLabel>
                                            <FormControl>

                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
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
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                }}>
                            </FormField>

                            {/* Modulo de contactos */}
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
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                }}>
                            </FormField>

                        </div>

                        <div className='flex flex-row space-x-4'>
                            <Button asChild className='w-full' variant={'ghost'} disabled={isPending}>
                                <Link href={"/settings/users"}>
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

export default RegisterForm