import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

type User = {
    errorID: string;
}

const UserNotFound: React.FC<User> = (props) => {
    return (
        <div className='flex flex-col container h-full w-full max-w-lg'>
            <Card>
                <CardHeader>
                    <CardTitle className='flex flex-row gap-3 items-center'> <AlertCircle size={50} /> Error #404</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>No se ha encontrado al usuario {props.errorID}</p>
                </CardContent>
                <CardFooter>
                    <Link className='hover:underline' href={"/settings/users"}>Ver todos los usuarios disponibles</Link>
                </CardFooter>
            </Card>
        </div>
    )
}

export default UserNotFound