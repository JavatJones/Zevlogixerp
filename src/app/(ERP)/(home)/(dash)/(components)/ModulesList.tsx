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

import { TbReceipt } from "react-icons/tb";
import { LuSlidersHorizontal } from "react-icons/lu";
import { GiMoneyStack } from "react-icons/gi";
import { FaShippingFast } from "react-icons/fa";

const modules = [
    {
        id: 1,
        icon: <FaShippingFast />,
        name: "Embarques",
        route: "loads"
    },
    {
        id: 2,
        icon: <TbReceipt />,
        name: "Facturación",
        route: "billing"
    },
    {
        id: 3,
        icon: <GiMoneyStack />,
        name: "Ventas",
        route: "sales"
    },
    {
        id: 4,
        icon: <LuSlidersHorizontal />,
        name: "Configuraciones",
        route: "settings"
    },
];



const ModulesList = () => {
    return (
        <article className='grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-10'>
            {modules.map((data, index) => (
                <Link key={index} href={`/${data.route}`} className='hover:scale-105 transition-all'>
                    <Card className='flex flex-col items-center justify-center p-5 gap-3 drop-shadow-xl dark:drop-shadow-[0_4px_12px_rgba(255,255,255,0.30)]'>

                        <div className='flex items-center justify-center'>
                            <p className='text-5xl'>{data.icon}</p>
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