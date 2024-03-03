"use client"
import React from 'react'
import { useState } from 'react';
import Link from 'next/link';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input';

//icons
import { MdContactPhone } from "react-icons/md";

const ContactsTest = [
    {
        id: 1,
        name: "Juan camanei",
        country: "México",
        type: "Cliente",

    },

    {
        id: 2,
        name: "Janito navajas",
        country: "México",
        type: "Cliente",

    },

    {
        id: 3,
        name: "Pablito pistolas",
        country: "México",
        type: "Provedor",

    },
    {
        id: 4,
        name: "Juanito alimaña",
        country: "México",
        type: "Cliente",

    },
    {
        id: 5,
        name: "Pedro picapiedra",
        country: "México",
        type: "Provedor",

    },
];


const ContactList = () => {

    const [filterType, setFilterType] = useState<string>(''); // Estado para almacenar el tipo de filtro
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterType(e.target.value); // Actualizar el estado cuando el usuario cambia el tipo de filtro
    };
    // Filtrar los datos en función del tipo
    const filteredContacts = ContactsTest.filter(data => data.type === filterType);

    ContactsTest.filter(data => data)
    return (
        <article className='flex flex-col w-full space-y-8'>
            <div className='flex flex-row w-full justify-between'>
                <div className='flex w-1/2'>
                    <Input
                        type="text"
                        value={filterType}
                        onChange={handleFilterChange}
                        placeholder="Ingrese el tipo de filtro"
                        className='flex w-full max-w-md'
                    />
                </div>
                <div className='flex w-1/2'>
                    b
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                {filteredContacts.map((data, index) => (
                    <Link key={index} href={`/${data.id}`} className='hover:scale-105 transition-all'>
                        <Card className='flex flex-row items-center justify-start p-3 gap-5 md:gap-10 drop-shadow-xl '>

                            <div className='flex items-center justify-center'>
                                <p className='text-4xl md:text-7xl text-red-600'><MdContactPhone></MdContactPhone></p>
                            </div>

                            <div className='flex flex-col justify-center gap-2'>
                                <big className='font-bold'>{data.name}</big>
                                <span className='font-medium'>{data.type}</span>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </article>
    )
}

export default ContactList