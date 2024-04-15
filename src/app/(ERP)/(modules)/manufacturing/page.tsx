import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
export const dynamic = 'force-dynamic'


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

//fake data
const items = [
  {
    id: 1,
    producto: "Batido de fresa",
    cantidad_a_fabricar: 5,
    medida: "Unidades",
    fecha_entrega: new Date(2024, 4, 19),

  },

]

const ManufacturingPage = () => {

  return (
    <div className='flex flex-col space-y-5'>
      <div className='flex flex-row items-center space-x-4'>
        <Button variant={'ghost'} size={'icon'} asChild>
          <Link href={'/'}>
            <ChevronLeftCircle size={30} />
          </Link>
        </Button>
        <h1 className='text-lg font-semibold'>
          Manufactura
        </h1>
      </div>

      <div className='flex flex-col items-end'>
        <Button asChild>
          <Link href={'/manufacturing/create'}>
            Crear nueva orden de producción
          </Link>
        </Button>
      </div>

      <Table>

        <TableHeader>
          <TableRow>
            <TableHead className="">Producto</TableHead>
            <TableHead className="">Cantidad</TableHead>
            <TableHead>Medida</TableHead>
            <TableHead>Fecha de entrega</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {items.map((data, index) => (

            <TableRow key={index}>


              <TableCell className='truncate '>
                <p className='truncate w-[200px]'>{data.producto}</p>
              </TableCell>

              <TableCell className="">
                <p className='truncate w-[150px]'>{data.cantidad_a_fabricar}</p>
              </TableCell>

              <TableCell>
                <p className='truncate w-[150px]'>{data.medida}</p>
              </TableCell>
              <TableCell>
                <p className='truncate w-[150px]'>
                  {
                    data.fecha_entrega.toLocaleDateString("es-ES")
                  }
                </p>
              </TableCell>
              <TableCell className="text-right">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button asChild variant={'ghost'} size={'icon'}>
                        <Link href={`/manufacturing/${data.id}`}>
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
    </div>
  )
}

export default ManufacturingPage