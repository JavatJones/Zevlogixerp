"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

//actions
import createProviderAction from "@/actions/sales/providers/create"
import getProviders from "@/actions/sales/getProviders"

//ui
import { Check, ChevronsUpDown } from "lucide-react"
import { format, setDate } from "date-fns"
import { CalendarIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Switch } from '@/components/ui/switch'
import { Separator } from "@/components/ui/separator"
import { toast } from 'react-toastify';

//validation
import * as z from "zod";
import { CreateFeeSchema } from "@/schemas/index"
import { useTransition } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FormError } from '@/components/forms/form-error'
import { FormSuccess } from '@/components/forms/form-success'

type getIDLoad = {
  id: string;

};


type GetProvidersName = {
  id: string;
  name: string;
};


const CreateProvider: React.FC<getIDLoad> = (props) => {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();


  //------------------------------------------------------------
  const [providersName, setProvidersName] = useState<GetProvidersName[]>([]);

  // cargar provedores guardados
  const loadProviders = async () => {
    try {

      // Realizar la consulta a tu base de datos de Prisma
      const data = await getProviders(); // Reemplaza getClients con tu función de consulta real

      // Mapear los datos para obtener solo los nombres de los clientes
      const providersNames: GetProvidersName[] = data.provider.map((providers) => ({
        id: providers.id,
        name: providers.name
      }));

      // Actualizar el contenido con los nombres de los clientes
      setProvidersName(providersNames);

    } catch (error) {
      console.error("Error al cargar los providers:", error);
    }
  };

  // Cargar los clientes al montar el componente
  useEffect(() => {
    loadProviders();
  }, []); // Solo se ejecuta una vez al montar el componente
  //------------------------------------------------------------

  //asignar sus valores desde los props
  const form = useForm<z.infer<typeof CreateFeeSchema>>({
    resolver: zodResolver(CreateFeeSchema),
    defaultValues: {

      loadId: props.id,

      provider: "",

    }
  });

  const onSubmit = (values: z.infer<typeof CreateFeeSchema>) => {
    setError("");
    setSuccess("");


    startTransition(() => {
      createProviderAction(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);

          if (data.error === undefined) {
            router.refresh();
          }

          toast.success(data.success?.toString());
          toast.error(data.error?.toString());


        }).catch((error) => {
          console.log(error)
        });
    });

    router.refresh();
  }

  const onClearForm = () => {
    form.reset()
    setError("");
    setSuccess("");
  }


  return (


    <Dialog>
      <DialogTrigger asChild>
        <Button>Agregar proveedor</Button>
      </DialogTrigger>
      <DialogContent className='flex flex-col space-y-5'>
        <DialogHeader>
          <DialogTitle>Agregar proveedor al embarque</DialogTitle>
          <DialogDescription>
            Description
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id='thisFrom' onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-5'>
            <div className='flex flex-col space-y-5'>

              {/* ID */}
              {/* <FormField
                control={form.control}
                name='loadId'
                render={({ field }) => {
                  return <FormItem>
                    <FormLabel className='text-md'>
                      ID
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Id del load' type='text' {...field} disabled></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                }}>
              </FormField> */}

              {/* provider */}
              <FormField
                control={form.control}
                name='provider'
                render={({ field }) => {
                  return <FormItem className='flex flex-col'>
                    <FormLabel className='text-md'>
                      Proveedor
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? providersName.find(
                                (dt) => dt.id === field.value
                              )?.name
                              : "Seleccionar proveedor"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[250px] h-96 p-2">
                        <Command>
                          <CommandInput placeholder="Buscar proveedor..." />
                          <CommandEmpty>Proveedor no encontrado.</CommandEmpty>
                          <CommandGroup className='flex overflow-auto'>
                            {providersName.map((dt) => (
                              <CommandItem
                                disabled={isPending}
                                className='cursor-pointer'
                                value={dt.name}
                                key={dt.id}
                                onSelect={() => {
                                  form.setValue("provider", dt.id)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    dt.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {dt.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage></FormMessage>
                  </FormItem>
                }}>
              </FormField>

              {/* Costo */}
              <FormField
                control={form.control}
                name='cost'
                render={({ field }) => {
                  return <FormItem>
                    <FormLabel className='text-md'>
                      Costo (MXN)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Costo del proveedor' type='number' {...field} disabled={isPending}></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                }}>
              </FormField>

            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={onClearForm} variant={'outline'} disabled={isPending}>
                  Volver
                </Button>
              </DialogClose>
            
                <Button variant={'default'} type='submit' disabled={isPending}>

                  {isPending ?
                    <p>Guardando...</p>
                    :
                    <p>Guardar</p>
                  }
                </Button>
          
            </DialogFooter>

          </form>
        </Form>



      </DialogContent>
    </Dialog>



  )
}

export default CreateProvider