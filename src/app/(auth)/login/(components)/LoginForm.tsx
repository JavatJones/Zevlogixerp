"use client"
import React, { useState } from 'react'

//actions
import login from "@/actions/login"

//ui
import ModeToggle from '@/components/ToggleTheme/ToggleTheme'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


//validation
import * as z from "zod";
import { LoginSchema } from "@/schemas/index"
import { useTransition } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FormError } from '@/components/forms/form-error'
import { FormSuccess } from '@/components/forms/form-success'



const LoginForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                })
        });
    }

    return (
        <section className='flex flex-col justify-center items-center w-full gap-3'>
            <div className='flex items-end justify-end w-full max-w-md'>
                <ModeToggle></ModeToggle>
            </div>
            <Card className='flex flex-col w-full max-w-md'>
                <CardHeader>
                    <CardTitle className='font-bold text-center text-3xl'>Aldevaram</CardTitle>
                    <CardDescription className='text-center'>¡Bienvenido de vuelta!</CardDescription>
                </CardHeader>
                <CardContent >

                    <Form {...form}>
                        <form id='thisFrom' onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-10'>
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
                                            <Input placeholder='*****' type='password' {...field} disabled={isPending}></Input>
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                }}>
                            </FormField>
                            <FormError message={error}></FormError>
                            <FormSuccess message={success}></FormSuccess>
                            <Button type='submit' disabled={isPending}>

                                {isPending ?
                                    <p>Cargando...</p>
                                    :
                                    <p>Entrar</p>
                                }
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </section>
    )
}

export default LoginForm