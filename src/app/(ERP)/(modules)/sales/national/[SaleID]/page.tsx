import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import EditSaleNational from './(components)/EditSaleNational';
import LoadNotFound from './(components)/LoadNotFound';

//data
import { getNationalLoad } from '@/data/loads';

//icons
import { ChevronLeftCircle } from 'lucide-react';
import FeesProviders from './(components)/FeesProviders';

const NationalSalePage = async ({ params }: { params: { SaleID: string } }) => {

    const load = await getNationalLoad(params.SaleID);


    if (!load) {
        //Si el usuario no existe, devolver una página de error
        return (
            <LoadNotFound errorID={params.SaleID}></LoadNotFound>
        );
    }


    return (
        <section className='flex flex-col space-y-8'>
            <div className='flex flex-row items-center space-x-4'>
                <Button variant={'ghost'} size={'icon'} asChild>
                    <Link href={'/sales/national'}>
                        <ChevronLeftCircle size={30} />
                    </Link>
                </Button>
                <h1 className='text-lg font-semibold'>
                    Ventas nacionales
                </h1>
            </div>

            <section className='flex flex-col space-y-10'>
                <EditSaleNational id={params.SaleID} load={load.load} invoice={load.invoice!} profit={load.profit!} salePrice={load.salePrice!} shipmentInvoice={load.shipmentInvoice!} ></EditSaleNational>
                <FeesProviders id={params.SaleID}></FeesProviders>
            </section>
        </section>
    )
}

export default NationalSalePage