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

export type schema = {
    id: string
    load: string
    // typeUnit: string
};


export const columns: ColumnDef<schema>[] = [

    // {
    //     accessorKey: "id",
    //     header: "Id",
    // },
    {
        accessorKey: "load",
        header: "Load",
    },
    {
        accessorKey: "nationality",
        header: "Nacionalidad",
    },
    {
        accessorKey: "transport_unit",
        header: "Unidad de transporte",
    },
    {
        accessorKey: "transport_type",
        header: "Tipo de transporte",
    },
    {
        id: "actions",
        header: "Acciones",
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
                        
                        >

                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]