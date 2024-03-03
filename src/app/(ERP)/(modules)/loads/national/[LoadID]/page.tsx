import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import LoadNotFound from './(components)/LoadNotFound';
import EditLoad from './(components)/EditLoad';

//icons
import { ChevronLeftCircle } from 'lucide-react';
//data
import { getNationalLoad } from '@/data/loads';


const LoadPage = async ({ params }: { params: { LoadID: string } }) => {

    const load = await getNationalLoad(params.LoadID);


    if (!load) {
        //Si el usuario no existe, devolver una página de error
        return (
            <LoadNotFound errorID={params.LoadID}></LoadNotFound>
        );
    }


    return (
        <section className='flex flex-col space-y-8'>
            <div className='flex flex-row items-center space-x-4'>
                <Button variant={'ghost'} size={'icon'} asChild>
                    <Link href={'/loads/national'}>
                        <ChevronLeftCircle size={30} />
                    </Link>
                </Button>
                <h1 className='text-lg font-semibold'>
                    Embarques Nacionales
                </h1>
            </div>

            <section>
                <EditLoad
                    id={load.id}
                    load={load.load}
                    client={load.contactId!}

                    orderDate={load.orderDate!}
                    collectionDate={load.collectionDate!}

                    shippingDetails={load.shippingDetails!}
                    recollection={load.recollection!}


                    originState={load.originState}
                    originCity={load.originState}

                    destinyState={load.destinyState}
                    destinyCity={load.destinyCity}
                ></EditLoad>
            </section>
        </section>
    )
}

export default LoadPage