import React from 'react';
import Link from 'next/link'

//ui
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button"

//icons
import { CiUser } from "react-icons/ci";

//utils
import { useRouter } from 'next/navigation'
import { db } from "@/lib/db";
import { getContactClient } from '@/data/contacts';
// import GetListClients from '@/actions/contacts/clients/GetListClients'

const ClientsList = async () => {

    const getListClients = async () => {

        const clients = await getContactClient()
    
        return clients
    }
    
    const GetClients = await getListClients();

    

    return (
        <div className='flex flex-col space-y-8'>
            <div className='flex flex-row gap-3 justify-between items-center'>
                <Input
                    type="text"
                    placeholder="Filtrar por nombre..."
                    className='w-full max-w-2xl'
                />

                <Button asChild variant={'default'}>
                    <Link href={"/contacts/clients/create"}>Crear cliente</Link>
                </Button>

            </div>

            {GetClients.length === 0 && (
                <p className='text-center'>No se han encontrado resultados</p>
            )}

            <article className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
                {GetClients.map((client) => (
                    <Link key={client.id} href={`/contacts/clients/[clientId]`} as={`/contacts/clients/${client.id}`} passHref className='hover:scale-105 transition-all'>
                        <Card className='flex flex-row items-center justify-start p-3 gap-5 md:gap-10 drop-shadow-xl '>

                            <div className='flex items-center justify-center'>
                                <p className='text-4xl md:text-7xl text-red-600'><CiUser></CiUser></p>
                            </div>

                            <div className='flex flex-col justify-center gap-2'>
                                <span className='font-bold'>{client.name}</span>
                            </div>
                        </Card>
                    </Link>
                ))}
            </article>
        </div>
    )
}

export default ClientsList