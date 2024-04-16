"use client"
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'


//icons
import { ChevronLeftCircle } from 'lucide-react';
import { LuPencilRuler } from "react-icons/lu";
import { IoIosImages as TemplateIcon } from "react-icons/io";
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

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

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
import { Textarea } from "@/components/ui/textarea"
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
const items = [
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
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Input } from '@/components/ui/input';

const ItemPage = ({ params }: { params: { id: string } }) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    return (
        <div className='flex flex-col space-y-5'>
            <div className='flex flex-row items-center space-x-4'>
                <Button variant={'ghost'} size={'icon'} asChild>
                    <Link href={'/inventory'}>
                        <ChevronLeftCircle size={30} />
                    </Link>
                </Button>
                <h1 className='text-lg font-semibold'>
                    Inventario
                </h1>
            </div>



            <Card className='flex flex-col'>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6  gap-2 lg:gap-5 items-center p-5'>

                    {/* Cantidad a mano */}
                    <AlertDialog>

                        <AlertDialogTrigger >
                            <Card>
                                <CardHeader>
                                    <CardTitle className='text-sm truncate'>
                                        Cantidad a mano
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className='truncate'>5</p>
                                </CardContent>
                            </Card>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Cantidad a mano</AlertDialogTitle>
                                <AlertDialogDescription className='flex flex-col space-y-2'>
                                    <p>Actualizar la cantidad a mano de tu inventario</p>
                                    <Input
                                        placeholder='Cantidad'
                                        defaultValue='5'

                                    />
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Volver</AlertDialogCancel>
                                <AlertDialogAction>Actualizar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    {/* Cantidad a reservada */}
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-sm truncate text-center'>
                                Cantidad a reservada
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='text-center'>
                            <p className='truncate'>0</p>
                        </CardContent>
                    </Card>

                    {/* Cantidad a pronosticada */}
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-sm truncate text-center'>
                                Cantidad a pronosticada
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='text-center'>
                            <p className='truncate'>0</p>
                        </CardContent>
                    </Card>

                </div>

                <CardContent className='flex flex-col space-y-5'>

                    <Tabs defaultValue="generalInfo" className="">
                        <TabsList>
                            <TabsTrigger value="generalInfo">Información general</TabsTrigger>
                            <TabsTrigger value="manufacturing">Manufactura</TabsTrigger>
                        </TabsList>

                        <TabsContent value="generalInfo" className='flex flex-col space-y-5'>

                            <div className='flex flex-col md:flex-row justify-between space-y-5 md:space-y-0'>
                                <div className='flex flex-col w-12/12 md:w-6/12 space-y-5'>

                                    <div className='flex flex-col space-y-2 '>
                                        <p>Producto</p>
                                        <Input
                                            placeholder='Nombre'
                                            defaultValue='Manzanas'
                                            className='w-full'
                                        />
                                    </div>

                                    <div className='flex flex-col space-y-2 '>
                                        <p>Descripción</p>
                                        <Textarea className='max-h-96' defaultValue={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec lacus nec eros efficitur suscipit eget eu sapien.'} />

                                    </div>

                                </div>
                                <div className='flex flex-col items-center space-y-2 w-12/12 md:w-6/12'>
                                    <div className='relative group'>

                                        <img className='h-[130px] w-[130px] drop-shadow-md rounded' src="https://images.pexels.com/photos/990439/pexels-photo-990439.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Foto" />
                                        {/* <TemplateIcon className='text-[150px] text-center group-hover:blur-[12px]'></TemplateIcon> */}
                                        <div className='hidden group-hover:flex transition-all duration-500 absolute left-0 top-0 right-0 bottom-0 justify-center items-center z-10'>

                                            <Input

                                                type='file'
                                                accept='.png,.jpg'
                                                id='changeimage'
                                                className='hidden'

                                            ></Input>

                                            <label htmlFor='changeimage' className='cursor-pointer'>
                                                <LuPencilRuler className='text-[50px]'></LuPencilRuler>
                                            </label>

                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className='flex flex-col md:flex-row space-x-5'>

                                <div className='flex flex-col w-12/12 md:w-6/12 space-y-5'>

                                    <div className='flex flex-col space-y-2'>
                                        <label className='text-md'>
                                            Tipo de producto
                                        </label>

                                        <Select defaultValue={'Producto almacenable'}>
                                            <SelectTrigger className="">
                                                <SelectValue placeholder="Selecciona el tipo de producto" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Opciones</SelectLabel>
                                                    <SelectItem value="Producto almacenable">Producto almacenable</SelectItem>
                                                    <SelectItem value="Servicio">Servicio</SelectItem>
                                                </SelectGroup>

                                            </SelectContent>
                                        </Select>

                                    </div>

                                    <div className='flex flex-col space-y-2'>
                                        <label className='text-md'>
                                            Unidad de medida
                                        </label>

                                        <Select defaultValue={'Unidades'}>
                                            <SelectTrigger className="">
                                                <SelectValue placeholder="Selecciona una unidad de medida" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Longitud</SelectLabel>
                                                    <SelectItem value="Milímetro">Milímetro (mm)</SelectItem>
                                                    <SelectItem value="Centímetro">Centímetro (cm)</SelectItem>
                                                    <SelectItem value="Metro">Metro (m)</SelectItem>
                                                    <SelectItem value="Kilómetro">Kilómetro (km)</SelectItem>
                                                    <SelectItem value="Pulgada">Pulgada (in)</SelectItem>
                                                    <SelectItem value="Pie">Pie (ft)</SelectItem>
                                                    <SelectItem value="Yarda">Yarda (yd)</SelectItem>
                                                    <SelectItem value="Milla">Milla (mi)</SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel>Volumen</SelectLabel>
                                                    <SelectItem value="Mililitro">Mililitro (ml)</SelectItem>
                                                    <SelectItem value="Centímetro cúbico">Centímetro cúbico (cm³)</SelectItem>
                                                    <SelectItem value="Litro">Litro (l)</SelectItem>
                                                    <SelectItem value="Metro cúbico">Metro cúbico (m³)</SelectItem>
                                                    <SelectItem value="Onza líquida">Onza líquida (fl oz)</SelectItem>
                                                    <SelectItem value="Pinta">Pinta (pt)</SelectItem>
                                                    <SelectItem value="Cuarto">Cuarto (qt)</SelectItem>
                                                    <SelectItem value="Galón">Galón (gal)</SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel>Peso/Masa</SelectLabel>
                                                    <SelectItem value="Miligramo">Miligramo (mg)</SelectItem>
                                                    <SelectItem value="Gramo">Gramo (g)</SelectItem>
                                                    <SelectItem value="Kilogramo">Kilogramo (kg)</SelectItem>
                                                    <SelectItem value="Tonelada métrica">Tonelada métrica (t)</SelectItem>
                                                    <SelectItem value="Onza">Onza (oz)</SelectItem>
                                                    <SelectItem value="Libra">Libra (lb)</SelectItem>
                                                    <SelectItem value="Quintal">Quintal (cwt)</SelectItem>
                                                    <SelectItem value="Tonelada larga">Tonelada larga (LT)</SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel>Tiempo</SelectLabel>
                                                    <SelectItem value="Segundo">Segundo (s)</SelectItem>
                                                    <SelectItem value="Minuto">Minuto (min)</SelectItem>
                                                    <SelectItem value="Hora">Hora (h)</SelectItem>
                                                    <SelectItem value="Día">Día (d)</SelectItem>
                                                    <SelectItem value="Semana">Semana (wk)</SelectItem>
                                                    <SelectItem value="Mes">Mes (mo)</SelectItem>
                                                    <SelectItem value="Año">Año (yr)</SelectItem>
                                                    <SelectItem value="Década">Década (dec)</SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel>Área</SelectLabel>
                                                    <SelectItem value="Milímetro cuadrado">Milímetro cuadrado (mm²)</SelectItem>
                                                    <SelectItem value="Centímetro cuadrado">Centímetro cuadrado (cm²)</SelectItem>
                                                    <SelectItem value="Metro cuadrado">Metro cuadrado (m²)</SelectItem>
                                                    <SelectItem value="Kilómetro cuadrado">Kilómetro cuadrado (km²)</SelectItem>
                                                    <SelectItem value="Pulgada cuadrada">Pulgada cuadrada (in²)</SelectItem>
                                                    <SelectItem value="Pie cuadrado">Pie cuadrado (ft²)</SelectItem>
                                                    <SelectItem value="Yarda cuadrada">Yarda cuadrada (yd²)</SelectItem>
                                                    <SelectItem value="Acre">Acre (acre)</SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel>Extra</SelectLabel>
                                                    <SelectItem value="Unidades">Unidades</SelectItem>
                                                    <SelectItem value="Barriles">Barriles</SelectItem>
                                                    <SelectItem value="Bolsas">Bolsas</SelectItem>
                                                    <SelectItem value="Tambos">Tambos</SelectItem>
                                                    <SelectItem value="Sacos">Sacos</SelectItem>
                                                    <SelectItem value="Paquetes">Paquetes</SelectItem>
                                                    <SelectItem value="N/A">N/A</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>

                                    </div>

                                    {/* <div className='flex flex-col space-y-2'>
                                        <label className='text-md'>
                                            Unidad de medida de fabricación
                                        </label>

                                        <Select defaultValue={'Tonelada métrica'}>
                                            <SelectTrigger className="">
                                                <SelectValue placeholder="Selecciona una unidad de medida de compra" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Longitud</SelectLabel>
                                                    <SelectItem value="Milímetro">Milímetro (mm)</SelectItem>
                                                    <SelectItem value="Centímetro">Centímetro (cm)</SelectItem>
                                                    <SelectItem value="Metro">Metro (m)</SelectItem>
                                                    <SelectItem value="Kilómetro">Kilómetro (km)</SelectItem>
                                                    <SelectItem value="Pulgada">Pulgada (in)</SelectItem>
                                                    <SelectItem value="Pie">Pie (ft)</SelectItem>
                                                    <SelectItem value="Yarda">Yarda (yd)</SelectItem>
                                                    <SelectItem value="Milla">Milla (mi)</SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel>Volumen</SelectLabel>
                                                    <SelectItem value="Mililitro">Mililitro (ml)</SelectItem>
                                                    <SelectItem value="Centímetro cúbico">Centímetro cúbico (cm³)</SelectItem>
                                                    <SelectItem value="Litro">Litro (l)</SelectItem>
                                                    <SelectItem value="Metro cúbico">Metro cúbico (m³)</SelectItem>
                                                    <SelectItem value="Onza líquida">Onza líquida (fl oz)</SelectItem>
                                                    <SelectItem value="Pinta">Pinta (pt)</SelectItem>
                                                    <SelectItem value="Cuarto">Cuarto (qt)</SelectItem>
                                                    <SelectItem value="Galón">Galón (gal)</SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel>Peso/Masa</SelectLabel>
                                                    <SelectItem value="Miligramo">Miligramo (mg)</SelectItem>
                                                    <SelectItem value="Gramo">Gramo (g)</SelectItem>
                                                    <SelectItem value="Kilogramo">Kilogramo (kg)</SelectItem>
                                                    <SelectItem value="Tonelada métrica">Tonelada métrica (t)</SelectItem>
                                                    <SelectItem value="Onza">Onza (oz)</SelectItem>
                                                    <SelectItem value="Libra">Libra (lb)</SelectItem>
                                                    <SelectItem value="Quintal">Quintal (cwt)</SelectItem>
                                                    <SelectItem value="Tonelada larga">Tonelada larga (LT)</SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel>Tiempo</SelectLabel>
                                                    <SelectItem value="Segundo">Segundo (s)</SelectItem>
                                                    <SelectItem value="Minuto">Minuto (min)</SelectItem>
                                                    <SelectItem value="Hora">Hora (h)</SelectItem>
                                                    <SelectItem value="Día">Día (d)</SelectItem>
                                                    <SelectItem value="Semana">Semana (wk)</SelectItem>
                                                    <SelectItem value="Mes">Mes (mo)</SelectItem>
                                                    <SelectItem value="Año">Año (yr)</SelectItem>
                                                    <SelectItem value="Década">Década (dec)</SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel>Área</SelectLabel>
                                                    <SelectItem value="Milímetro cuadrado">Milímetro cuadrado (mm²)</SelectItem>
                                                    <SelectItem value="Centímetro cuadrado">Centímetro cuadrado (cm²)</SelectItem>
                                                    <SelectItem value="Metro cuadrado">Metro cuadrado (m²)</SelectItem>
                                                    <SelectItem value="Kilómetro cuadrado">Kilómetro cuadrado (km²)</SelectItem>
                                                    <SelectItem value="Pulgada cuadrada">Pulgada cuadrada (in²)</SelectItem>
                                                    <SelectItem value="Pie cuadrado">Pie cuadrado (ft²)</SelectItem>
                                                    <SelectItem value="Yarda cuadrada">Yarda cuadrada (yd²)</SelectItem>
                                                    <SelectItem value="Acre">Acre (acre)</SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel>Extra</SelectLabel>
                                                    <SelectItem value="Milímetro cuadrado">Unidades</SelectItem>
                                                    <SelectItem value="Centímetro cuadrado">Barriles</SelectItem>
                                                    <SelectItem value="Metro cuadrado">Bolsas</SelectItem>
                                                    <SelectItem value="Kilómetro cuadrado">Tambos</SelectItem>
                                                    <SelectItem value="Pulgada cuadrada">Sacos</SelectItem>
                                                    <SelectItem value="N/A">N/A</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>

                                    </div> */}

                                    <div className='flex flex-col space-y-2'>
                                        <label className='text-md'>
                                            Referencia interna
                                        </label>

                                        <Input placeholder='Referencia interna' type='text'></Input>


                                    </div>


                                </div>

                                <div className='flex flex-col w-12/12 md:w-6/12  space-y-5'>

                                    <div className='flex flex-col space-y-2'>
                                        <label className='text-md'>
                                            Moneda
                                        </label>

                                        <Select defaultValue={'MXN'}>
                                            <SelectTrigger className="">
                                                <SelectValue placeholder="Selecciona el tipo de producto" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Opciones</SelectLabel>
                                                    <SelectItem value="MXN">Pesos Mexicanos</SelectItem>
                                                    <SelectItem value="USD">Dolares Americanos</SelectItem>
                                                </SelectGroup>

                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className='flex flex-col space-y-2'>
                                        <label className='text-md'>
                                            Precio
                                        </label>

                                        <Input placeholder='Precio $$$' type='number' defaultValue={500}></Input>

                                    </div>

                                    <div className='flex flex-col space-y-2'>
                                        <label className='text-md'>
                                            Costo
                                        </label>

                                        <Input placeholder='Costo $$$' type='number'></Input>

                                    </div>

                                </div>

                            </div>
                            <div className='flex flex-row space-x-5'>
                                <Button variant={'secondary'}>
                                    Descartar
                                </Button>
                                <Button>
                                    Guardar
                                </Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="manufacturing" className='flex flex-col space-y-5'>
                            <p>Componentes de receta</p>
                            <div className='flex flex-row space-x-5 justify-end'>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button>Agregar</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Agregar a receta</AlertDialogTitle>
                                            <AlertDialogDescription>

                                                <Popover open={open} onOpenChange={setOpen}>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            aria-expanded={open}
                                                            className=" justify-between w-full"
                                                       
                                                        >
                                                            {value !== "" ? <p className='capitalize'>{value}</p>
                                                                : "Lista de productos..."}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="p-0 h-96 ">
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
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction>Agregar</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                            </div>

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

                                    {items.map((data, index) => (

                                        <TableRow key={index}>

                                            <TableCell className="w-[180px] font-medium truncate">
                                                <p className='truncate w-[130px]'>{data.referenciaInterna}</p>
                                            </TableCell>
                                            <TableCell className='truncate '>
                                                <p className='truncate w-[200px]'>{data.titulo}</p>
                                            </TableCell>

                                            <TableCell className="">
                                                <p className='truncate w-[130px]'>{data.cantidad_disponible}</p>
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

                        </TabsContent>
                    </Tabs>


                </CardContent>

            </Card>
        </div>
    )
}

export default ItemPage