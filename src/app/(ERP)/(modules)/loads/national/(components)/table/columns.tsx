"use client"

import { ColumnDef } from "@tanstack/react-table";
import { GiSettingsKnobs } from "react-icons/gi";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import DeleteLoad from "../DeleteLoad";
// import DeleteAddressDialog from "../DeleteAddressDialog";

export type Schema = {
    id: string
    load: string
    orderDate: Date
    collectionDate: Date
    shippingDetails: string
    recollection: string
};


export const columns: ColumnDef<Schema>[] = [

    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "load",
        header: "Embarque",
    },
    {
        accessorKey: "orderDate",
        header: "Fecha de orden",
        cell: ({ row }) => {
            const data = row.original;

            var orderDate = new Date(data.orderDate);

            // Obtenemos los componentes de la fecha
            var orderDay = orderDate.getDate().toString().padStart(2, '0');
            var orderMonth = (orderDate.getMonth() + 1).toString().padStart(2, '0'); // El mes se indexa desde 0, por lo que se agrega 1
            var orderYear = orderDate.getFullYear().toString();


            return (
                <p>{`${orderDay} / ${orderMonth} / ${orderYear}`}</p>
            )
        },
    },
    {
        accessorKey: "collectionDate",
        header: "Fecha de recolección",
        cell: ({ row }) => {
            const data = row.original;

            var recollectionDate = new Date(data.collectionDate);

            // Obtenemos los componentes de la fecha
            var recollectionDay = recollectionDate.getDate().toString().padStart(2, '0');
            var recollectionMonth = (recollectionDate.getMonth() + 1).toString().padStart(2, '0'); // El mes se indexa desde 0, por lo que se agrega 1
            var recollectionYear = recollectionDate.getFullYear().toString();


            return (
                <p>{`${recollectionDay} / ${recollectionMonth} / ${recollectionYear}`}</p>
            )
        },
    },
    {
        accessorKey: "shippingDetails",
        header: "Detalles de envío",
    },
    {
        accessorKey: "recollection",
        header: "Recoleción",
    },

    {
        id: "actions",
        cell: ({ row }) => {
            const data = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menu</span>
                            <GiSettingsKnobs size={30} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="flex flex-col space-y-5">
                        <div className="flex flex-col space-y-1">
                            <DropdownMenuLabel className="text-center">Acciones</DropdownMenuLabel>
                            <DropdownMenuSeparator></DropdownMenuSeparator>
                        </div>

                        <DropdownMenuItem
                            asChild

                        >
                            <Button
                                asChild
                                variant={"Transparent"}
                            >
                                <Link href={`/loads/national/${data.id}`}>
                                    Ver detalles
                                </Link>
                            </Button>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            asChild
                        >
                            <DeleteLoad id={data.id}></DeleteLoad>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]