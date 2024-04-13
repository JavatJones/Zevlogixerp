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
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri'; // Importa los iconos necesarios


//validation
import * as z from "zod";
import { LoginSchema } from "@/schemas/index"
import { useTransition } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FormError } from '@/components/forms/form-error'
import { FormSuccess } from '@/components/forms/form-success'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'


const LoginForm = () => {

    const router = useRouter();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña

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

                    form.reset()
                    router.refresh();

                    toast.error(data.error)

                }).catch((error) => {
                    console.log(error)
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
                    <CardTitle className='font-bold text-center text-3xl'>!Company_Name!</CardTitle>
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
                                            <div className="relative">
                                                <Input
                                                    placeholder={showPassword ? 'Contraseña' : '******'}
                                                    type={showPassword ? 'text' : 'password'}
                                                    {...field}
                                                    disabled={isPending}
                                                    className="py-2 px-3 border rounded-lg w-full"
                                                />
                                                <Button
                                                    size={'icon'}
                                                    type='button'
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute top-1/2 right-0 transform -translate-y-1/2"

                                                >
                                                    {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                }}>
                            </FormField>

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