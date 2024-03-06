import React from 'react'
import Link from 'next/link'
//ui
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { DataTable } from "./(components)/table/data-table"
import { getAllLoads } from '@/data/loads'
import { Schema, columns } from './(components)/table/columns'

//icons
import { ChevronLeftCircle } from 'lucide-react';




const NationalLoadsPage = async () => {

  async function getData(): Promise<Schema[]> {
    // Fetch data from your API here.
    const loads = await getAllLoads();

    if (!loads) {
      // Manejar el caso en que loads sea null
      console.error('Error: No se pudo obtener la carga');
      return [];
    }

    return loads.map((dt: any) => ({
      id: dt.id,
      load: dt.load,
      orderDate: dt.orderDate,
      collectionDate: dt.collectionDate,
      shippingDetails: dt.shippingDetails,
      recollection: dt.recollection,
    }));
  }

  const data = await getData();

  return (
    <section className='flex flex-col space-y-8'>
      <div className='flex flex-row items-center space-x-4'>
        <Button variant={'ghost'} size={'icon'} asChild>
          <Link href={'/loads'}>
            <ChevronLeftCircle size={30} />
          </Link>
        </Button>
        <h1 className='text-lg font-semibold'>
          Embarques Nacionales
        </h1>
      </div>

      <section className=''>

        <DataTable columns={columns} data={data} />

      </section>

    </section>
  )
}

export default NationalLoadsPage