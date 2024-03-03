import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


//icons
import { ChevronLeftCircle } from 'lucide-react';
import { MdSupportAgent } from "react-icons/md";
import { CiUser } from "react-icons/ci";

const contacts = [
    {
        id: 1,
        icon: <CiUser />,
        name: "Clientes",
        route: "clients"
    },
    {
        id: 2,
        icon: <MdSupportAgent />,
        name: "Provedores",
        route: "providers"
    },
];


const ContactsPage = () => {
    return (
        <section className='flex flex-col space-y-8'>
            <div className='flex flex-row items-center space-x-4'>
                <Button variant={'ghost'} size={'icon'} asChild>
                    <Link href={'/'}>
                        <ChevronLeftCircle size={30} />
                    </Link>
                </Button>
                <h1 className='text-lg font-semibold'>
                    Contactos
                </h1>
            </div>

            <article className='container max-w-2xl grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-10'>

                {contacts.map((data, index) => (
                    <Link key={index} href={`/contacts/${data.route}`} className='hover:scale-105 transition-all'>
                        <Card className='flex flex-col items-center justify-center p-5 gap-3 drop-shadow-xl '>

                            <div className='flex items-center justify-center'>
                                <p className='text-5xl text-red-600'>{data.icon}</p>
                            </div>

                            <div className='flex flex-col items-center justify-center font-bold'>
                                <span>{data.name}</span>
                            </div>
                        </Card>
                    </Link>
                ))}

            </article>

        </section>
    )
}

export default ContactsPage