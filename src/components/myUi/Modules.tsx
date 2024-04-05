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
import { LuSlidersHorizontal } from "react-icons/lu";
import { FaShippingFast } from "react-icons/fa";
import { RiContactsBookFill } from "react-icons/ri";
import { FaFileInvoice } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { HiCreditCard } from "react-icons/hi2";
import { BsClipboard2DataFill } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";

const modules = [
    {
        id: 1,
        icon: <FaShippingFast />,
        name: "Embarques",
        route: "loads"
    },
    {
        id: 2,
        icon: <FaFileInvoice />,
        name: "Cotización",
        route: "quote"
    },
    {
        id: 3,
        icon: <HiCreditCard />,
        name: "Facturación",
        route: "billing"
    },
    {
        id: 4,
        icon: <BsClipboard2DataFill />,
        name: "Finanzas",
        route: "financial"
    },
    {
        id: 5,
        icon: <GiTakeMyMoney />,
        name: "Ventas",
        route: "sales"
    },
    {
        id: 6,
        icon: <RiContactsBookFill />,
        name: "Contactos",
        route: "contacts"
    },
    {
        id: 7,
        icon: <LuSlidersHorizontal />,
        name: "Configuraciones",
        route: "settings"
    },
];

const Modules = async () => {
    return (
       
            <article className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5'>

                {/* Logistica */}
                <div className='flex flex-col space-y-5'>
                    <p className='truncate font-medium text-xl'>Logistica</p>

                    <Link href={`/loads`} className='hover:scale-105 transition-all'>
                        <Card className='flex flex-col items-center justify-center p-5 gap-3 drop-shadow-xl '>

                            <div className='flex items-center justify-center'>
                                <p className='text-5xl text-red-600'><FaShippingFast /></p>
                            </div>

                            <div className='flex flex-col items-center justify-center'>
                                <p className='truncate'>Embarques</p>
                            </div>
                        </Card>
                    </Link>

                </div>

                {/* Ventas */}
                <div className='flex flex-col space-y-5'>
                    <p className='truncate font-medium text-xl'>Ventas</p>

                    <Link href={`/quotes`} className='hover:scale-105 transition-all'>
                        <Card className='flex flex-col items-center justify-center p-5 gap-3 drop-shadow-xl '>

                            <div className='flex items-center justify-center'>
                                <p className='text-5xl text-red-600'><FaFileInvoice /></p>
                            </div>

                            <div className='flex flex-col items-center justify-center'>
                                <p className='truncate'>Cotizaciones</p>
                            </div>
                        </Card>
                    </Link>



                    <Link href={`/sales`} className='hover:scale-105 transition-all'>
                        <Card className='flex flex-col items-center justify-center p-5 gap-3 drop-shadow-xl '>

                            <div className='flex items-center justify-center'>
                                <p className='text-5xl text-red-600'><GiTakeMyMoney /></p>
                            </div>

                            <div className='flex flex-col items-center justify-center'>
                                <p className='truncate'>Ventas</p>
                            </div>
                        </Card>
                    </Link>
                </div>

                {/* Finanzas */}
                <div className='flex flex-col space-y-5'>
                    <p className='truncate font-medium text-xl'>Finanzas</p>

                    <Link href={`/financial`} className='hover:scale-105 transition-all'>
                        <Card className='flex flex-col items-center justify-center p-5 gap-3 drop-shadow-xl '>

                            <div className='flex items-center justify-center'>
                                <p className='text-5xl text-red-600'><BsClipboard2DataFill /></p>
                            </div>

                            <div className='flex flex-col items-center justify-center'>
                                <p className='truncate'>Finanzas</p>
                            </div>
                        </Card>
                    </Link>

                    <Link href={`/billing`} className='hover:scale-105 transition-all'>
                        <Card className='flex flex-col items-center justify-center p-5 gap-3 drop-shadow-xl '>

                            <div className='flex items-center justify-center'>
                                <p className='text-5xl text-red-600'><HiCreditCard /></p>
                            </div>

                            <div className='flex flex-col items-center justify-center'>
                                <p className='truncate'>Facturación</p>
                            </div>
                        </Card>
                    </Link>
                </div>

                {/* Social */}
                <div className='flex flex-col space-y-5'>
                    <p className='truncate font-medium text-xl'>Social</p>

                    <Link href={`/contacts`} className='hover:scale-105 transition-all'>
                        <Card className='flex flex-col items-center justify-center p-5 gap-3 drop-shadow-xl '>

                            <div className='flex items-center justify-center'>
                                <p className='text-5xl text-red-600'><RiContactsBookFill /></p>
                            </div>

                            <div className='flex flex-col items-center justify-center'>
                                <p className='truncate'>Contactos</p>
                            </div>
                        </Card>
                    </Link>

                </div>

                {/* Administración */}
                <div className='flex flex-col space-y-5'>
                    <p className='truncate font-medium text-xl'>Administración</p>

                    <Link href={`/settings`} className='hover:scale-105 transition-all'>
                        <Card className='flex flex-col items-center justify-center p-5 gap-3 drop-shadow-xl '>

                            <div className='flex items-center justify-center'>
                                <p className='text-5xl text-red-600'><IoIosSettings /></p>
                            </div>

                            <div className='flex flex-col items-center justify-center'>
                                <p className='truncate'>Configuraciones</p>
                            </div>
                        </Card>
                    </Link>
                </div>

            </article>
    )
}

export default Modules