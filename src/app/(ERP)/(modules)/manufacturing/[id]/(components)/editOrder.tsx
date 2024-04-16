'use client'
import React, { useState, ChangeEvent } from 'react';
import Link from 'next/link'
import { Button } from '@/components/ui/button'

//ui
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { IoEyeOutline } from "react-icons/io5";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

const products = [
    {
        value: "Batido de fresas",
        label: "Batido de fresas",
    },
    {
        value: "Arroz",
        label: "Azucar",
    },
    {
        value: "Avena",
        label: "Avena",
    },
    {
        value: "Whey Protein",
        label: "Whey Protein",
    },
    {
        value: "Fresa",
        label: "Fresa",
    },
    {
        value: "Leche",
        label: "Leche",
    },
    {
        value: "Platano",
        label: "Platano",
    },

    {
        value: "Café",
        label: "Café",
    },

]
import { IoIosImages as TemplateIcon } from "react-icons/io";
//fake data
const items = [
    {
        id: 1,
        icon: true,
        image: <TemplateIcon />,
        titulo: 'Arroz',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec lacus nec eros efficitur suscipit eget eu sapien.",
        medida: "Kilos",
        referenciaInterna: "eqw12",
        cantidad_disponible: 10,
        cantidad_pronosticada: 10,
        cantidad_reservada: 5,

    },
    {
        id: 2,
        icon: true,
        image: <TemplateIcon />,
        titulo: 'Avena',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec lacus nec eros efficitur suscipit eget eu sapien.",
        medida: "Gramos",
        referenciaInterna: "34dfe",
        cantidad_disponible: 10,
        cantidad_pronosticada: 10,
        cantidad_reservada: 5,

    },
    {
        id: 3,
        icon: true,
        image: <TemplateIcon />,
        titulo: 'Fresa',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec lacus nec eros efficitur suscipit eget eu sapien.",
        medida: "Unidades",
        referenciaInterna: "234asdf",
        cantidad_disponible: 23,
        cantidad_pronosticada: 0,
        cantidad_reservada: 5,

    },
    {
        id: 4,
        icon: true,
        image: <TemplateIcon />,
        titulo: 'Leche',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec lacus nec eros efficitur suscipit eget eu sapien.",
        medida: "litros",
        referenciaInterna: "123asdf",
        cantidad_disponible: 500,
        cantidad_pronosticada: 55,
        cantidad_reservada: 5,

    },
    {
        id: 5,
        icon: true,
        image: <TemplateIcon />,
        titulo: 'Whey protein',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec lacus nec eros efficitur suscipit eget eu sapien.",
        medida: "gramos",
        referenciaInterna: "zz123",
        cantidad_disponible: 1660,
        cantidad_pronosticada: 100,
        cantidad_reservada: 10,

    },
    {
        id: 6,
        icon: true,
        image: <TemplateIcon />,
        titulo: 'Platano',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec lacus nec eros efficitur suscipit eget eu sapien.",
        medida: "miligramos",
        referenciaInterna: "gh564a",
        cantidad_disponible: 10,
        cantidad_pronosticada: 10,
        cantidad_reservada: 5,

    },
    {
        id: 7,
        icon: true,
        image: <TemplateIcon />,
        titulo: 'Café',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec lacus nec eros efficitur suscipit eget eu sapien.",
        medida: "gramos",
        referenciaInterna: "54g3aw5",
        cantidad_disponible: 10,
        cantidad_pronosticada: 10,
        cantidad_reservada: 5,

    },
    {
        id: 8,
        icon: true,
        image: <TemplateIcon />,
        titulo: 'Azucar',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec lacus nec eros efficitur suscipit eget eu sapien.",
        medida: "gramos",
        referenciaInterna: "svd123",
        cantidad_disponible: 10,
        cantidad_pronosticada: 10,
        cantidad_reservada: 5,
    },

    {
        id: 9,
        icon: false,
        image: <TemplateIcon />,
        titulo: 'Batido de fresas',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec lacus nec eros efficitur suscipit eget eu sapien.",
        medida: "gramos",
        referenciaInterna: "svd123",
        cantidad_disponible: 10,
        cantidad_pronosticada: 10,
        cantidad_reservada: 5,
    },

]

const recipe = [
    // {
    //     id: 1,
    //     icon: true,
    //     image: <TemplateIcon />,
    //     titulo: 'Arroz',
    //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec lacus nec eros efficitur suscipit eget eu sapien.",
    //     medida: "Kilos",
    //     referenciaInterna: "eqw12",
    //     cantidad_disponible: 10,
    //     cantidad_pronosticada: 10,
    //     cantidad_reservada: 5,

    // },
    // {
    //     id: 2,
    //     icon: true,
    //     image: <TemplateIcon />,
    //     titulo: 'Avena',
    //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec lacus nec eros efficitur suscipit eget eu sapien.",
    //     medida: "Gramos",
    //     referenciaInterna: "34dfe",
    //     cantidad_disponible: 10,
    //     cantidad_pronosticada: 10,
    //     cantidad_reservada: 5,

    // },
    {
        id: 3,
        icon: true,
        image: <TemplateIcon />,
        titulo: 'Fresa',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec lacus nec eros efficitur suscipit eget eu sapien.",
        medida: "Unidades",
        referenciaInterna: "234asdf",
        cantidad_disponible: 3,
        cantidad_pronosticada: 0,
        cantidad_reservada: 5,

    },
    {
        id: 4,
        icon: true,
        image: <TemplateIcon />,
        titulo: 'Leche',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec lacus nec eros efficitur suscipit eget eu sapien.",
        medida: "litros",
        referenciaInterna: "123asdf",
        cantidad_disponible: 1,
        cantidad_pronosticada: 55,
        cantidad_reservada: 5,

    },
    {
        id: 5,
        icon: true,
        image: <TemplateIcon />,
        titulo: 'Whey protein',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec lacus nec eros efficitur suscipit eget eu sapien.",
        medida: "gramos",
        referenciaInterna: "zz123",
        cantidad_disponible: 50,
        cantidad_pronosticada: 100,
        cantidad_reservada: 10,

    },
    {
        id: 6,
        icon: true,
        image: <TemplateIcon />,
        titulo: 'Platano',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec lacus nec eros efficitur suscipit eget eu sapien.",
        medida: "unidades",
        referenciaInterna: "gh564a",
        cantidad_disponible: 1,
        cantidad_pronosticada: 10,
        cantidad_reservada: 5,

    },
    // {
    //     id: 7,
    //     icon: true,
    //     image: <TemplateIcon />,
    //     titulo: 'Café',
    //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec lacus nec eros efficitur suscipit eget eu sapien.",
    //     medida: "gramos",
    //     referenciaInterna: "54g3aw5",
    //     cantidad_disponible: 10,
    //     cantidad_pronosticada: 10,
    //     cantidad_reservada: 5,

    // },
    {
        id: 8,
        icon: true,
        image: <TemplateIcon />,
        titulo: 'Azucar',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec lacus nec eros efficitur suscipit eget eu sapien.",
        medida: "gramos",
        referenciaInterna: "svd123",
        cantidad_disponible: 8,
        cantidad_pronosticada: 10,
        cantidad_reservada: 5,
    },

    // {
    //     id: 9,
    //     icon: false,
    //     image: <TemplateIcon />,
    //     titulo: 'Batido de fresas',
    //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec lacus nec eros efficitur suscipit eget eu sapien.",
    //     medida: "gramos",
    //     referenciaInterna: "svd123",
    //     cantidad_disponible: 10,
    //     cantidad_pronosticada: 10,
    //     cantidad_reservada: 5,
    // },

]
//icons
import { ChevronLeftCircle } from 'lucide-react';
import { Input } from '@/components/ui/input'

const EditOrder = () => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("Batido de fresas")
    const [quantity, setQuantity] = React.useState<number>(5)

    // Controlador de cambio para manejar cuando cambia el valor del input
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        // Actualizar el estado con el nuevo valor del input
        setQuantity(parseInt(event.target.value));
    };

    // Función para calcular la multiplicación
    const calcQuantity = (cantidad: number): number => {
        return cantidad * quantity;
    };


    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const formattedDate = date ? date.toLocaleDateString() : '';
    return (

        <Card>
            <CardHeader>
                <CardTitle>Orden de producción</CardTitle>
                <CardDescription>Orden de producción no.1 </CardDescription>

                <div className='flex flex-col md:flex-row gap-5 items-center justify-between'>
                    <div className='flex flex-col md:flex-row gap-5'>
                        <Button variant={'ghost'}>
                            Descartar cambios
                        </Button>
                        <Button>
                            Guardar
                        </Button>
                    </div>
                    <div className='flex flex-row space-x-5'>

                        <Button>
                            Borrar
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent className='flex flex-col space-y-5'>

                <Card>
                    <CardHeader>
                        <CardTitle>Producto</CardTitle>
                    </CardHeader>
                    <CardContent className='flex flex-col md:flex-row space-x-5'>

                        <div className='flex flex-col space-y-5 w-12/12 md:w-6/12'>
                            <div className='flex flex-col space-y-2'>
                                <label className='text-md'>
                                    Seleccionar producto
                                </label>

                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className=" justify-between"
                                            disabled
                                        >
                                            {value !== "" ? <p className='capitalize'>{value}</p>
                                                : "Lista de productos..."}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0 h-96 ">
                                        <Command>
                                            <CommandInput placeholder="Buscar..." />
                                            <CommandEmpty>Producto no encontrado.</CommandEmpty>
                                            <CommandGroup>
                                                {products.map((product) => (
                                                    <CommandItem
                                                        key={product.label}
                                                        value={product.label}
                                                        onSelect={(currentValue) => {
                                                            setValue(currentValue === value ? "" : currentValue)
                                                            setOpen(false)
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                product.label === value ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        {product.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>

                            </div>
                            {value !== "" ?
                                <>
                                    <div className='flex flex-row space-x-5'>
                                        <div className='flex flex-col space-y-2 w-full'>
                                            <label className='text-md'>
                                                Cantidad a producir
                                            </label>

                                            <Input
                                                type='number'
                                                value={quantity}
                                                onChange={handleChange}
                                            />

                                        </div>
                                        <div className='flex flex-col space-y-2 w-full'>
                                            <label className='text-md'>
                                                Unidad de medida
                                            </label>

                                            <Input type='text' defaultValue={'Unidades'} disabled />

                                        </div>
                                    </div>
                                </>

                                :
                                null
                            }
                        </div>

                        {value !== "" ?
                            <div className='flex flex-col space-y-5 w-12/12 md:w-6/12'>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant={'ghost'}>
                                            Fecha de entrega: {formattedDate}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className='p-0'>
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            className=""
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            :
                            null
                        }
                    </CardContent>

                </Card>

                {value !== "" ?
                    <Card>
                        <CardHeader>
                            <CardTitle>Componentes</CardTitle>
                        </CardHeader>

                        <CardContent>

                            <Table>

                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[180px]">Referencia interna</TableHead>
                                        <TableHead className="">Producto</TableHead>
                                        <TableHead className="">Cantidad</TableHead>
                                        <TableHead>Medida</TableHead>
                                        <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>

                                    {recipe.map((data, index) => (

                                        <TableRow key={index}>

                                            <TableCell className="w-[180px] font-medium truncate">
                                                <p className='truncate w-[130px]'>{data.referenciaInterna}</p>
                                            </TableCell>
                                            <TableCell className='truncate '>
                                                <p className='truncate w-[200px]'>{data.titulo}</p>
                                            </TableCell>

                                            <TableCell className="">
                                                <p className='truncate w-[130px]'>{
                                                    isNaN(quantity) ? '0' : calcQuantity(data.cantidad_disponible)
                                                }
                                                </p>
                                            </TableCell>

                                            <TableCell>
                                                <p className='truncate w-[130px]'> {data.medida}</p>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button asChild variant={'ghost'} size={'icon'}>
                                                                <Link href={`/inventory/${data.id}`}>
                                                                    <IoEyeOutline size={25}></IoEyeOutline>
                                                                </Link>
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Visitar</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>

                                            </TableCell>
                                        </TableRow>

                                    ))}


                                </TableBody>
                            </Table>


                        </CardContent>



                    </Card>

                    :
                    null
                }

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Informes
                        </CardTitle>

                        <CardDescription>
                            Descarga todos los informes de tu orden de producción
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='flex flex-col  gap-5'>
                        <Button className='max-w-md'>
                            Descargar orden de producción
                        </Button>
                        <Button className='max-w-md'>
                            Descargar datos financieros
                        </Button>
                    </CardContent>
                </Card>

            </CardContent>




        </Card>

    )
}

export default EditOrder