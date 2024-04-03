"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"

function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"Transparent"} size="icon">
          <Sun className="h-[1.8rem] w-[1.8rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.8rem] w-[1.8rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only text-center">Temas</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-5 flex flex-col" align="center">
        <DropdownMenuLabel className="text-center">Temas</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild >
          <Button variant={"ghost"} onClick={() => setTheme("light")}>
            Claro
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button variant={"ghost"} onClick={() => setTheme("dark")}>
            Oscuro
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button variant={"ghost"} onClick={() => setTheme("system")}>
            Sistema
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ModeToggle