import React from 'react'

//components
import EditClient from './EditClient';
import ClientDelete from './ClientDelete'

//ui
import { Separator } from "@/components/ui/separator"
import { Button } from '@/components/ui/button';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

//icons
import { CiUser } from "react-icons/ci";

type getUser = {
    id: string;
    name: string;
    rfc: string;
    email: string;
}

const ProviderInfo: React.FC<getUser> = (props) => {
    return (
        <Card className='container max-w-xl'>
            <CardHeader>
                <CardTitle>
                    <div className='flex flex-col md:flex-row gap-5 items-center justify-between'>

                        <div className='flex'>
                            <p className='text-5xl md:text-7xl text-red-600'><CiUser></CiUser></p>
                        </div>

                        <div className='flex justify-end space-x-3'>
                            <ClientDelete id={props.id}></ClientDelete>
                            <EditClient id={props.id} client={props.name} rfc={props.rfc} email={props.email}></EditClient>
                        </div>

                    </div>
                </CardTitle>
                <CardDescription>
                    id: {props.id}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <article className='flex flex-col-reverse md:flex-row justify-between gap-5'>
                    <div className='flex flex-col space-y-5 w-full'>

                        <div className='flex flex-col space-y-2'>
                            <span className='font-bold'>Nombre:</span>
                            <span>{props.name}</span>
                        </div>
                        <Separator></Separator>

                        <div className='flex flex-col space-y-2'>
                            <span className='font-bold'>RFC:</span>
                            <span>{props.rfc}</span>
                        </div>
                        <Separator></Separator>
                        <div className='flex flex-col space-y-2'>
                            <span className='font-bold'>Email:</span>
                            <span>{props.email}</span>
                        </div>

                    </div>

                </article>
            </CardContent>
        </Card>
    )
}

export default ProviderInfo