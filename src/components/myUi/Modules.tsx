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
import { auth } from '@/lib/auth'

//icons
import { LuSlidersHorizontal } from "react-icons/lu";
import { FaShippingFast } from "react-icons/fa";
import { RiContactsBookFill } from "react-icons/ri";
import { FaFileInvoice } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { HiCreditCard } from "react-icons/hi2";
import { BsClipboard2DataFill } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import { GiMoneyStack } from "react-icons/gi";
import { getUserByID } from '@/data/user';

//lucid icons
import { Package } from 'lucide-react';
import { Cpu } from 'lucide-react';
import { MdPrecisionManufacturing } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";

const Modules = async () => {

    const session = await auth();
    const existingUser = await getUserByID(session?.user?.id!)

    return (

        <article className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5'>

            {/* Logistica */}

            {/* {existingUser?.loads ?
                <div className='flex flex-col space-y-5'>
                    <p className='truncate font-medium text-xl'>Logistica</p>
                    {existingUser?.loads && (
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
                    )}
                </div>
                :
                <></>
            } */}


            {/* Ventas */}
            {/* {existingUser?.quotes || existingUser?.sales ?
                <div className='flex flex-col space-y-5'>
                    <p className='truncate font-medium text-xl'>Ventas</p>
                    {existingUser?.quotes && (
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
                    )}
                    {existingUser?.sales && (
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
                    )}
                </div>
                :
                <></>
            } */}

            {/* Finanzas */}
            {/* <div className='flex flex-col space-y-5'>
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
                </div> */}

            {/* {existingUser?.finances || existingUser?.billing ?
                <div className='flex flex-col space-y-5'>
                    <p className='truncate font-medium text-xl'>Finanzas</p>
                    {existingUser?.finances && (
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
                    )}
                    {existingUser?.billing && (
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
                    )}
                </div>
                :
                <></>
            } */}


            {/* Social */}
            {/* {existingUser?.contacts ?
                <div className='flex flex-col space-y-5'>
                    <p className='truncate font-medium text-xl'>Social</p>
                    {existingUser?.contacts && (
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
                    )}
                </div>
                :
                <></>
            } */}


            {/* Administración */}
            {/* {existingUser?.admin ?
                <div className='flex flex-col space-y-5'>
                    <p className='truncate font-medium text-xl'>Administración</p>
                    {existingUser?.admin && (
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
                    )}
                </div>
                :
                <></>
            } */}

            <div className='flex flex-col space-y-5'>
                <p className='truncate font-medium text-xl'>Inventario</p>
                <Link href={`/inventory`} className='hover:scale-105 transition-all'>
                    <Card className='flex flex-col items-center justify-center p-5 gap-3 drop-shadow-xl '>

                        <div className='flex items-center justify-center'>
                            <p className='text-5xl text-red-600'><Package size={55} /></p>
                        </div>

                        <div className='flex flex-col items-center justify-center'>
                            <p className='truncate'>Inventario</p>
                        </div>
                    </Card>
                </Link>

                <Link href={`/manufacturing`} className='hover:scale-105 transition-all'>
                    <Card className='flex flex-col items-center justify-center p-5 gap-3 drop-shadow-xl '>

                        <div className='flex items-center justify-center'>
                            <p className='text-5xl text-red-600'><MdPrecisionManufacturing size={55} /></p>
                        </div>

                        <div className='flex flex-col items-center justify-center'>
                            <p className='truncate'>Manufactura</p>
                        </div>
                    </Card>
                </Link>
            </div>

            <div className='flex flex-col space-y-5'>
                <p className='truncate font-medium text-xl'>Administración</p>
                <Link href={`/administration`} className='hover:scale-105 transition-all'>
                    <Card className='flex flex-col items-center justify-center p-5 gap-3 drop-shadow-xl '>

                        <div className='flex items-center justify-center'>
                            <p className='text-5xl text-red-600'><MdAdminPanelSettings size={55} /></p>
                        </div>

                        <div className='flex flex-col items-center justify-center'>
                            <p className='truncate'>Administración</p>
                        </div>
                    </Card>
                </Link>
            </div>

        </article>
    )
}

export default Modules