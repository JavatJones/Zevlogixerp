import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

//icons
import { ChevronLeftCircle } from 'lucide-react';

//components
import { Schema, columns } from './(components)/table/columns'
import { getAllLoads } from '@/data/loads'
import { DataTable } from './(components)/table/data-table'

async function getData(): Promise<Schema[]> {
    // Fetch data from your API here.
    const loads = await getAllLoads();

    return loads.map((dt: any) => ({
        id: dt.id,
        load: dt.load,
      
    }));
}

const NationalSalesPage = async () => {

    const data = await getData();


    return (
        <section className='flex flex-col space-y-8'>
            <div className='flex flex-row items-center space-x-4'>
                <Button variant={'ghost'} size={'icon'} asChild>
                    <Link href={'/'}>
                        <ChevronLeftCircle size={30} />
                    </Link>
                </Button>
                <h1 className='text-lg font-semibold'>
                    Ventas nacionales
                </h1>
            </div>

            <article>
                <DataTable columns={columns} data={data}></DataTable>
            </article>

        </section>
    )
}

export default NationalSalesPage