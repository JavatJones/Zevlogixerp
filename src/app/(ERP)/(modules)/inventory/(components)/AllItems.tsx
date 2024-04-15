'use client'
import Link from 'next/link'
import React, { useState } from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


//ui
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

//icons
import { IoIosImages as TemplateIcon } from "react-icons/io";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MdOutlineAutoAwesomeMosaic } from "react-icons/md";
import { CiViewTable } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
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


const AllItems = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const [viewData, setViewData] = useState<String>('Mosaic');


    // Filtrar los items basados en el término de búsqueda
    const filteredItems = items.filter(item =>
        item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || item.referenciaInterna.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='flex flex-col space-y-5'>
            {/* Input para ingresar el término de búsqueda */}
            <div className='flex flex-row gap-5 justify-between'>
                <Input
                    className='max-w-md'
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />


                <div className='flex flex-row space-x-5 items-center'>

                    <ToggleGroup type="single" defaultValue='Mosaic'>
                        <ToggleGroupItem value="Mosaic" onClick={() => setViewData('Mosaic')}>
                            <MdOutlineAutoAwesomeMosaic size={25} />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="Table" onClick={() => setViewData('Table')}>
                            <CiViewTable size={25} />
                        </ToggleGroupItem>

                    </ToggleGroup>

                    <Button asChild>
                        <Link href={"/inventory/create"}>Agregar nuevo</Link>
                    </Button>
                </div>

            </div>


            {viewData === "Mosaic" ?

                // mosaico
                <div className='grid grid-cols-1 md:grid-cols-3  xl:grid-cols-5 gap-5'>
                    {filteredItems.map((data, index) => (
                        <Link className='transition hover:scale-105' key={index} href={`/inventory/${data.id}`}>
                            <Card>
                                <CardHeader className='gap-2'>
                                    <div className='flex flex-col items-center justify-center w-full'>

                                        {data.icon ?
                                            <p className='text-center text-[130px]'>
                                                {data.image}
                                            </p>
                                            :
                                            <img className='h-[130px] w-[130px]' src="https://images.pexels.com/photos/990439/pexels-photo-990439.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Foto" />
                                        }

                                    </div>
                                    <CardTitle className='truncate pb-1'>{data.titulo}</CardTitle>
                                    <CardDescription className='truncate pb-1'>{data.referenciaInterna}</CardDescription>
                                </CardHeader>
                                <CardContent className='flex flex-col space-y-3'>
                                    <CardDescription className='overflow-hidden line-clamp-3' >
                                        {data.description}
                                    </CardDescription>
                                    <p className='truncate capitalize'>
                                        Cantidad a mano: <br></br>
                                        {data.cantidad_disponible} {data.medida}
                                    </p>

                                    {/* <p className='truncate capitalize'>
                                        Cantidad pronosticada: <br></br>
                                        {data.cantidad_pronosticada} {data.medida}
                                    </p> */}
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
                :
                // nothing
                null
            }

            {viewData === "Table" ?

                // tabla
                <Card className='p-5'>
                    <Table>

                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[180px]">Referencia interna</TableHead>
                                <TableHead className="">Producto</TableHead>
                                <TableHead className="">Cantidad a mano</TableHead>
                                <TableHead className="">Cantidad pronosticada</TableHead>
                                <TableHead className="">Cantidad reservada</TableHead>
                                <TableHead>Medida</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            {filteredItems.map((data, index) => (

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
                                    <TableCell className="">
                                        <p className='truncate w-[130px]'>{data.cantidad_pronosticada}</p>
                                    </TableCell>
                                    <TableCell className="">
                                        <p className='truncate w-[130px]'>{data.cantidad_reservada}</p>
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
                </Card>
                :
                // nothing
                null
            }


        </div >
    )
}

export default AllItems