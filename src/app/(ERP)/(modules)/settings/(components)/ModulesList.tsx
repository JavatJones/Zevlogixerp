import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';

//icons
import { FaBuildingUser } from "react-icons/fa6";

const modules = [
    {
        id: 1,
        icon: <FaBuildingUser />,
        name: "Usuarios del sistema",
        route: "users"
    },

];


const ModulesList = () => {
    return (
        <article className='grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-10'>
            {modules.map((data, index) => (
                <Link key={index} href={`/settings/${data.route}`} className='hover:scale-105 transition-all'>
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
    )
}

export default ModulesList