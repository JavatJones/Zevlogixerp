"use client"

import { ColumnDef } from "@tanstack/react-table"
import { GiSettingsKnobs } from "react-icons/gi";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import DeleteUserDialog from "./DeleteUser";
import ResetPassword from "./ResetPassword";

// This type is used to define the shape of our data.
export type UserInfoSchema = {
    id: string
    name: String
    email: string
};

export const columns: ColumnDef<UserInfoSchema>[] = [

    // {
    //     accessorKey: "id",
    //     header: "Id",
    // },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nombre
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            const user = row.original

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
                        // onClick={() => navigator.clipboard.writeText(user.id)}
                        >
                            <Button variant={'ghost'} asChild className="text-start">
                                <Link href={`/settings/users/${user.id}`}>Editar Usuario</Link>
                            </Button>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            asChild
                        // onClick={() => navigator.clipboard.writeText(user.id)}
                        >
                            <ResetPassword id={user.id}></ResetPassword>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            asChild
                        // onClick={() => navigator.clipboard.writeText(user.id)}
                        >
                            <DeleteUserDialog id={user.id}></DeleteUserDialog>

                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]