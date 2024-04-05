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
import DeleteAddressDialog from "../DeleteAddressDialog";

export type AddressInfoSchema = {
    id: string
    name: string
    address: string
    codePostal: string
    city: string
    state: string
    country: string
};


export const columns: ColumnDef<AddressInfoSchema>[] = [

    // {
    //     accessorKey: "id",
    //     header: "Id",
    // },
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: "address",
        header: "Dirección",
    },
    {
        accessorKey: "codePostal",
        header: "Código postal",
    },
    {
        accessorKey: "city",
        header: "Ciudad",
    },

    {
        accessorKey: "state",
        header: "Estado",
    },
    {
        accessorKey: "country",
        header: "País",
    },

    {
        id: "actions",
        cell: ({ row }) => {
            const address = row.original

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
                            onClick={() => navigator.clipboard.writeText(address.id)}
                        >
                            <DeleteAddressDialog id={address.id}></DeleteAddressDialog>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]