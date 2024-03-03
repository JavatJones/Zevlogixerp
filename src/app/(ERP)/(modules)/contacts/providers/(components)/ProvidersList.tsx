import React from 'react'
import { getContactProvider } from '@/data/contacts'
// import { useState } from 'react';
import Link from 'next/link'
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
import { MdSupportAgent } from "react-icons/md";



const ProvidersList = async () => {


    const GetProviders = await getContactProvider();

    // const [searchTerm, setSearchTerm] = useState<string>('');

    // const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchTerm(event.target.value);
    // };

    // const filteredClients = Clients.filter(data =>
    //     data.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    return (
        <div className='flex flex-col space-y-8'>
            <div className='flex flex-row gap-3 justify-between items-center'>
                <Input
                    type="text"
                    placeholder="Filtrar por nombre..."
                    className='w-full max-w-2xl'
                />

                <Button asChild variant={'default'}>
                    <Link href={"/contacts/providers/create"}>Crear cliente</Link>
                </Button>

            </div>
            {GetProviders.length === 0 && (
                <p className='text-center'>No se han encontrado resultados</p>
            )}
            <article className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
                {GetProviders.map((data, index) => (
                    <Link key={index} href={`/contacts/providers/[clientId]`} as={`/contacts/providers/${data.id}`} passHref className='hover:scale-105 transition-all'>
                        <Card className='flex flex-row items-center justify-start p-3 gap-5 md:gap-10 drop-shadow-xl '>

                            <div className='flex items-center justify-center'>
                                <p className='text-4xl md:text-7xl text-red-600'><MdSupportAgent></MdSupportAgent></p>
                            </div>

                            <div className='flex flex-col justify-center gap-2'>
                                <big className='font-bold'>{data.name}</big>
                            </div>
                        </Card>
                    </Link>
                ))}
            </article>
        </div>
    )
}

export default ProvidersList