"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

//actions
import editSale from "@/actions/sales/national/edit"

//ui
import { Check, ChevronsUpDown } from "lucide-react"
import { format, setDate } from "date-fns"
import { CalendarIcon } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Switch } from '@/components/ui/switch'
import { Separator } from "@/components/ui/separator"

//validation
import * as z from "zod";
import { EditSaleNationalSchema } from "@/schemas/index"
import { useTransition } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FormError } from '@/components/forms/form-error'
import { FormSuccess } from '@/components/forms/form-success'


//***props***
type LoadSaleData = {
    id: string;
    load: string;
    invoice: string;
    shipmentInvoice: Date;
    salePrice: number;
    profit: number;
}


const EditSaleNational: React.FC<LoadSaleData> = (props) => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();


    //asignar sus valores desde los props
    const form = useForm<z.infer<typeof EditSaleNationalSchema>>({
        resolver: zodResolver(EditSaleNationalSchema),
        defaultValues: {
            id: props.id,
            load: props.load,
            invoice: props.invoice || "",
            shipmentInvoice: props.shipmentInvoice || undefined,
            salePrice: props.salePrice || 0,
            profit: props.profit || 0,

        }
    });


    const onSubmit = (values: z.infer<typeof EditSaleNationalSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            editSale(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                });
        });

        router.refresh();
    }

    return (
        <Form {...form}>
            <form id='thisFrom' onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col'>
                <div className='flex flex-col space-y-5'>

                    <div className='flex flex-row justify-end'>
                        <div className='flex flex-row space-x-4'>
                            <Button asChild className='w-full hidden' variant={'ghost'} disabled={isPending}>
                                <Link href={"/sales/national"}>
                                    <p>Volver</p>
                                </Link>
                            </Button>
                            <Button className='w-full' type='submit' disabled={isPending}>

                                {isPending ?
                                    <p>Guardando...</p>
                                    :
                                    <p>Guardar cambios</p>
                                }
                            </Button>
                        </div>
                    </div>

                    <Card className='flex flex-col w-full'>
                        <CardHeader>
                            <CardTitle className='flex flex-row items-center'>


                                {/* Load  ={isPending} */}
                                <FormField
                                    control={form.control}
                                    name='load'
                                    render={({ field }) => {
                                        return <FormItem className='flex flex-col md:flex-row items-start md:items-center gap-3'>
                                            <FormLabel className='text-md'>
                                                Embarque
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className='border-0 text-2xl min-w-full'
                                                    placeholder='Identificador de Load'
                                                    type='text'
                                                    {...field}
                                                    disabled
                                                ></Input>
                                            </FormControl>
                                            <FormMessage></FormMessage>
                                        </FormItem>
                                    }}>
                                </FormField>
                            </CardTitle>
                            <CardDescription>id: {props.id}</CardDescription>
                        </CardHeader>
                        <CardContent className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>


                            <Card className='flex flex-col w-full max-w-xl'>
                                <CardHeader>
                                    <CardTitle>Factura</CardTitle>
                                    <CardDescription>Asigna una factura al embarque</CardDescription>
                                </CardHeader>
                                <CardContent className='flex flex-col space-y-5'>

                                    {/* invoice */}
                                    <FormField
                                        control={form.control}
                                        name='invoice'
                                        render={({ field }) => {
                                            return <FormItem>
                                                <FormLabel className='text-md'>
                                                    Factura
                                                </FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Factura del load' type='text' {...field} disabled={isPending}></Input>
                                                </FormControl>
                                                <FormMessage></FormMessage>
                                            </FormItem>
                                        }}>
                                    </FormField>

                                    {/* shipmentInvoice */}
                                    <FormField
                                        control={form.control}
                                        name='shipmentInvoice'
                                        render={({ field }) => {
                                            return <FormItem className='flex flex-col'>
                                                <FormLabel className='text-md'>
                                                    Fecha de envio de factura
                                                </FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                disabled={isPending}
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-full pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span>Elige una fecha</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                                // date > new Date() || 
                                                                date < new Date("1900-01-01")
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage></FormMessage>
                                            </FormItem>
                                        }}>
                                    </FormField>

                                </CardContent>

                            </Card>

                            <Card className='flex flex-col w-full max-w-xl'>
                                <CardHeader>
                                    <CardTitle>Precio</CardTitle>
                                    <CardDescription>Asigna los detalles monetarios</CardDescription>
                                </CardHeader>
                                <CardContent className='flex flex-col space-y-5'>

                                    {/* salePrice */}
                                    <FormField
                                        control={form.control}
                                        name='salePrice'
                                        render={({ field }) => {
                                            return <FormItem>
                                                <FormLabel className='text-md'>
                                                    Precio de venta
                                                </FormLabel>
                                                <FormControl>
                                                    <Input placeholder='$$$' type='number' {...field} disabled={isPending}></Input>
                                                </FormControl>
                                                <FormMessage></FormMessage>
                                            </FormItem>
                                        }}>
                                    </FormField>

                                    {/* profit */}
                                    <FormField
                                        control={form.control}
                                        name='profit'
                                        render={({ field }) => {
                                            return <FormItem>
                                                <FormLabel className='text-md'>
                                                    Profit de venta
                                                </FormLabel>
                                                <FormControl>
                                                    <Input placeholder='$$$' type='number' {...field} disabled={isPending}></Input>
                                                </FormControl>
                                                <FormMessage></FormMessage>
                                            </FormItem>
                                        }}>
                                    </FormField>

                                </CardContent>
                            </Card>

                            {/* <Card className='flex flex-col w-full col-span-3'>
                                <CardHeader>
                                    <CardTitle>Proveedores</CardTitle>
                                    <CardDescription>Asigna los detalles de los provedores</CardDescription>
                                </CardHeader>
                                <CardContent className='flex flex-col space-y-5'>
                                    <DataTable columns={}></DataTable>
                                </CardContent>
                            </Card> */}


                        </CardContent>
                        <CardFooter className='flex flex-col gap-5'>
                           
                            <FormError message={error}></FormError>
                            <FormSuccess message={success}></FormSuccess>

                        </CardFooter>
                    </Card>
                </div>
            </form>
        </Form>
    )
}

export default EditSaleNational