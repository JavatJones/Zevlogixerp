import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

//icons
import { ChevronLeftCircle } from 'lucide-react';

export const dynamic = 'force-dynamic'

//components
import { columns, schema } from './(components)/columns'
import { DataTable } from './(components)/data-table'

import { getAllNationalLoads } from '@/data/loads'


const AllQuotesPage = async () => {


    async function getData(): Promise<schema[]> {
        // Fetch data from your API here.
        const loads = await getAllNationalLoads()

        if (!loads) {
            // Manejar el caso en que loads sea null
            console.error('Error: No se pudo obtener la carga');
            return [];
        }
        return loads.map((dt) => ({
            id: dt.id,
            load: dt.load,
            // typeLoad:dt.
        }));
    }

    const data = await getData();


    return (
        <div className='flex flex-col space-y-5'>
            <div className='flex flex-row items-center space-x-4'>
                <Button variant={'ghost'} size={'icon'} asChild>
                    <Link href={'/'}>
                        <ChevronLeftCircle size={30} />
                    </Link>
                </Button>
                <h1 className='text-lg font-semibold'>
                    Cotizaciones
                </h1>
            </div>
            <DataTable columns={columns} data={data} ></DataTable>
        </div>
    )
}

export default AllQuotesPage