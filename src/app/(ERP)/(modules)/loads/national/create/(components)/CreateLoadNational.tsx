"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

//actions
import createLoad from "@/actions/loads/create"
import getClients from "@/actions/loads/getClients"

//ui
import { Check, ChevronsUpDown } from "lucide-react"
import { format, setDate } from "date-fns"
import { CalendarIcon } from "lucide-react"
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
import { CreateLoadNationalSchema } from "@/schemas/index"
import { useTransition } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FormError } from '@/components/forms/form-error'
import { FormSuccess } from '@/components/forms/form-success'

type GetClientsName = {
    id: string;
    name: string;
};

//locations autocomplate
import { Country, ICountry, State, IState, City, ICity } from "country-state-city"

interface Option {
    label: string;
    value: string;
}

const CreateLoadNational = () => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const [clientName, setClientName] = useState<GetClientsName[]>([]);

    // cargar clientes guardados
    const loadClients = async () => {
        try {

            // Realizar la consulta a tu base de datos de Prisma
            const data = await getClients(); // Reemplaza getClients con tu función de consulta real

            // Mapear los datos para obtener solo los nombres de los clientes
            const clientNames: GetClientsName[] = data.clients.map((client) => ({
                id: client.id,
                name: client.name
            }));

            // Actualizar el contenido con los nombres de los clientes
            setClientName(clientNames);

        } catch (error) {
            console.error("Error al cargar los clientes:", error);
        }
    };

    // Cargar los clientes al montar el componente
    useEffect(() => {
        loadClients();
    }, []); // Solo se ejecuta una vez al montar el componente

    //Locations ---------------------------------------------------

    const [selectedOriginCountry, setSelectedOriginCountry] = useState<string>('MX'); // México (MX) como país por defecto para origen
    const [selectedOriginState, setSelectedOriginState] = useState<string>('');
    const [selectedOriginCity, setSelectedOriginCity] = useState<string>('');
    const [selectedDestinationCountry, setSelectedDestinationCountry] = useState<string>('MX'); // México (MX) como país por defecto para destino
    const [selectedDestinationState, setSelectedDestinationState] = useState<string>('');
    const [selectedDestinationCity, setSelectedDestinationCity] = useState<string>('');
    const [originStates, setOriginStates] = useState<Option[]>([]);
    const [destinationStates, setDestinationStates] = useState<Option[]>([]);
    const [originCities, setOriginCities] = useState<Option[]>([]);
    const [destinationCities, setDestinationCities] = useState<Option[]>([]);

    useEffect(() => {
        loadStates(selectedOriginCountry, 'origin');
        loadStates(selectedDestinationCountry, 'destination');
    }, []);

    const loadStates = (countryCode: string, location: 'origin' | 'destination') => {
        const stateOptions: Option[] = State.getStatesOfCountry(countryCode).map((state: IState) => ({
            label: state.name,
            value: state.isoCode,
        }));
        if (location === 'origin') {
            setOriginStates(stateOptions);
        } else {
            setDestinationStates(stateOptions);
        }
    };

    const loadCities = (countryCode: string, stateCode: string, location: 'origin' | 'destination') => {
        const cityOptions: Option[] = City.getCitiesOfState(countryCode, stateCode).map((city) => ({
            label: city.name,
            value: city.name,
        }));
        if (location === 'origin') {
            setOriginCities(cityOptions);
        } else {
            setDestinationCities(cityOptions);
        }
    };

    const handleCountryChange = (selectedValue: string, location: 'origin' | 'destination') => {
        if (location === 'origin') {
            setSelectedOriginCountry(selectedValue);
            setSelectedOriginState('');
            setSelectedOriginCity('');
            setOriginCities([]);
            loadStates(selectedValue, 'origin');
        } else {
            setSelectedDestinationCountry(selectedValue);
            setSelectedDestinationState('');
            setSelectedDestinationCity('');
            setDestinationCities([]);
            loadStates(selectedValue, 'destination');
        }
    };

    const handleStateChange = (selectedValue: string, location: 'origin' | 'destination') => {
        if (location === 'origin') {
            setSelectedOriginState(selectedValue);
            setSelectedOriginCity('');
            setOriginCities([]);
            form.setValue("originCity", '');
            loadCities(selectedOriginCountry, selectedValue, 'origin');
        } else {
            setSelectedDestinationState(selectedValue);
            setSelectedDestinationCity('');
            setDestinationCities([]);
            form.setValue("destinyCity", '');
            loadCities(selectedDestinationCountry, selectedValue, 'destination');
        }
    };

    const handleCityChange = (selectedValue: string, location: 'origin' | 'destination') => {
        if (location === 'origin') {
            setSelectedOriginCity(selectedValue);
        } else {
            setSelectedDestinationCity(selectedValue);
        }
    };

    //---------------------------------------------------


    const form = useForm<z.infer<typeof CreateLoadNationalSchema>>({
        resolver: zodResolver(CreateLoadNationalSchema),
        defaultValues: {
            load: "",
            orderDate: undefined,
            collectionDate: undefined,
            nameClient: "",
            originCountry: "México",
            originState: "",
            originCity: "",

            destinyCountry: "México",
            destinyState: "",
            destinyCity: "",

            shippingDetails: "",
            recollection: "",


        }
    });

    const onSubmit = (values: z.infer<typeof CreateLoadNationalSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            createLoad(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);

                    if (data.error === undefined) {
                        form.reset()
                        router.refresh();
                        router.push('/loads/national');
                        router.refresh();
                    }

                    toast.success(data.success?.toString())
                    toast.error(data.error?.toString())


                })
                .catch((error) => {
                    console.log(error)
                })
        });

        router.refresh();
    }


    return (
        <Card className='flex flex-col w-full'>
            <CardHeader>
                <CardTitle className='font-bold text-center text-3xl'>Crear nuevo embarque nacional</CardTitle>
                {/* <CardDescription className='text-center'>lorem</CardDescription> */}
            </CardHeader>
            <CardContent>

                <Form {...form}>
                    <form id='thisFrom' onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-5'>

                        <div className='flex justify-end'>
                            <div className='flex flex-row space-x-3'>

                                <Button asChild className='w-full' variant={'ghost'} disabled={isPending}>
                                    <Link href={"/loads/national"}>
                                        <p>Cancelar</p>
                                    </Link>
                                </Button>
                                <Button className='w-full' type='submit' onClick={form.handleSubmit(onSubmit)} disabled={isPending}>

                                    {isPending ?
                                        <p>Creando...</p>
                                        :
                                        <p>Crear embarque</p>
                                    }
                                </Button>

                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                            {/* Load */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className='font-bold text-center text-3xl'>Embarque</CardTitle>
                                    <CardDescription className='text-center'>Ingresa el ID del embarque</CardDescription>
                                </CardHeader>
                                <CardContent className='flex flex-col space-y-5'>
                                    <FormField
                                        control={form.control}
                                        name='load'
                                        render={({ field }) => {
                                            return <FormItem>
                                                <FormLabel className='text-md'>
                                                    Identificador de Load
                                                </FormLabel>
                                                <FormControl>
                                                    <Input placeholder='ID' type='text' {...field} disabled={isPending}></Input>
                                                </FormControl>
                                                <FormMessage></FormMessage>
                                            </FormItem>
                                        }}>
                                    </FormField>
                                </CardContent>
                            </Card>

                            {/* cliente */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className='font-bold text-center text-3xl'>Cliente</CardTitle>
                                    <CardDescription className='text-center'>Asigna un cliente</CardDescription>
                                </CardHeader>
                                <CardContent className='flex flex-col space-y-5'>
                                    <FormField
                                        control={form.control}
                                        name='nameClient'
                                        render={({ field }) => {
                                            return <FormItem className='flex flex-col'>
                                                <FormLabel className='text-md'>
                                                    Cliente
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
                                                                    ? clientName.find(
                                                                        (client) => client.id === field.value
                                                                    )?.name
                                                                    : "Seleccionar cliente"}
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-[250px] h-96 p-2">
                                                        <Command>
                                                            <CommandInput placeholder="Buscar clientes..." />
                                                            <CommandEmpty>Cliente no encontrado.</CommandEmpty>
                                                            <CommandGroup className='flex overflow-auto'>
                                                                {clientName.map((client) => (
                                                                    <CommandItem
                                                                        disabled={isPending}
                                                                        className='cursor-pointer'
                                                                        value={client.name}
                                                                        key={client.id}
                                                                        onSelect={() => {
                                                                            form.setValue("nameClient", client.id)
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                client.id === field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                        {client.name}
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
                                </CardContent>
                            </Card>

                            {/* Dates */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className='font-bold text-center text-3xl'>Fechas</CardTitle>
                                    <CardDescription className='text-center'>Registrar nuevo load en el sistema</CardDescription>
                                </CardHeader>
                                <CardContent className='flex flex-col space-y-5'>
                                    {/* orderDate */}
                                    <FormField
                                        control={form.control}
                                        name='orderDate'
                                        render={({ field }) => {
                                            return <FormItem className='flex flex-col'>
                                                <FormLabel className='text-md'>
                                                    Fecha de pedido
                                                </FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                disabled={isPending}
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-full pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span>Elige una fecha</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                                // date > new Date() || 
                                                                date < new Date("1900-01-01")
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage></FormMessage>
                                            </FormItem>
                                        }}>
                                    </FormField>

                                    {/* collectionDate */}
                                    <FormField
                                        control={form.control}
                                        name='collectionDate'
                                        render={({ field }) => {
                                            return <FormItem className='flex flex-col'>
                                                <FormLabel className='text-md'>
                                                    Fecha recolección
                                                </FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                disabled={isPending}
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-full pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span>Elige una fecha</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                                // date > new Date() || 
                                                                date < new Date("1900-01-01")
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage></FormMessage>
                                            </FormItem>
                                        }}>
                                    </FormField>
                                </CardContent>
                            </Card>

                            {/* specs */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className='font-bold text-center text-3xl'>Detalles del embarque</CardTitle>
                                    <CardDescription className='text-center'>Especificaciones del envío</CardDescription>
                                </CardHeader>
                                <CardContent className='flex flex-col space-y-5'>
                                    {/* shippingDetails */}
                                    <FormField
                                        control={form.control}
                                        name='shippingDetails'
                                        render={({ field }) => {
                                            return <FormItem>
                                                <FormLabel className='text-md'>
                                                    Detalles de envío
                                                </FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Datos de detalles de envío' type='text' {...field} disabled={isPending}></Input>
                                                </FormControl>
                                                <FormMessage></FormMessage>
                                            </FormItem>
                                        }}>
                                    </FormField>

                                    {/* recollection */}
                                    <FormField
                                        control={form.control}
                                        name='recollection'
                                        render={({ field }) => {
                                            return <FormItem>
                                                <FormLabel className='text-md'>
                                                    Recolección
                                                </FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Datos de recolección' type='text' {...field} disabled={isPending}></Input>
                                                </FormControl>
                                                <FormMessage></FormMessage>
                                            </FormItem>
                                        }}>
                                    </FormField>
                                </CardContent>
                            </Card>



                            {/* Origen del embarque */}
                            <Card>

                                <CardHeader>
                                    <CardTitle className='font-bold text-center text-3xl'>Origen del embarque</CardTitle>
                                    <CardDescription className='text-center'>¿Cual es el origen del embarque?</CardDescription>
                                </CardHeader>

                                <CardContent className='flex flex-col space-y-5'>
                                    {/* OriginCountry */}
                                    <FormField
                                        control={form.control}
                                        name='originCountry'
                                        render={({ field }) => {
                                            return <FormItem>
                                                <FormLabel className='text-md'>
                                                    País
                                                </FormLabel>
                                                <FormControl>
                                                    <Input placeholder='País' type='text' {...field} disabled></Input>
                                                </FormControl>
                                                <FormMessage></FormMessage>
                                            </FormItem>
                                        }}>
                                    </FormField>

                                    {/* originState */}
                                    <FormField
                                        control={form.control}
                                        name='originState'
                                        render={({ field }) => (
                                            <FormItem className='flex flex-col'>
                                                <FormLabel className='text-md'>Estado</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                className="w-full justify-between"
                                                                disabled={isPending}
                                                            >
                                                                {field.value ? originStates.find((item) => item.label === field.value)?.label : "Seleccionar estado"}
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-[250px] h-96 p-2">
                                                        <Command>
                                                            <CommandInput placeholder="Buscar ubicaciones..." />
                                                            <CommandEmpty>Sin resultados.</CommandEmpty>
                                                            <CommandGroup className='flex overflow-auto'>
                                                                {originStates.map((state) => (
                                                                    <CommandItem
                                                                        disabled={isPending}
                                                                        className='cursor-pointer'
                                                                        value={state.label}
                                                                        key={state.value}
                                                                        onSelect={() => {
                                                                            setSelectedOriginState(state.value);
                                                                            form.setValue("originState", state.label);
                                                                            loadCities(selectedOriginCountry, state.value, 'origin');
                                                                            handleStateChange(state.value, 'origin');
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                state.label === field.value ? "opacity-100" : "opacity-0"
                                                                            )}
                                                                        />
                                                                        {state.label}
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage></FormMessage>
                                            </FormItem>
                                        )}
                                    />

                                    {/* originCity */}
                                    <FormField
                                        control={form.control}
                                        name='originCity'
                                        render={({ field }) => (
                                            <FormItem className='flex flex-col'>
                                                <FormLabel className='text-md'>Ciudad</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                className="w-full justify-between"
                                                            >
                                                                {field.value ? originCities.find((item) => item.value === field.value)?.value : "Seleccionar ciudad"}
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-[250px] h-96 p-2">
                                                        <Command>
                                                            <CommandInput placeholder="Buscar ubicaciones..." />
                                                            <CommandEmpty>Sin resultados.</CommandEmpty>
                                                            <CommandGroup className='flex overflow-auto'>
                                                                {originCities.map((city) => (
                                                                    <CommandItem
                                                                        disabled={isPending}
                                                                        className='cursor-pointer'
                                                                        value={city.value}
                                                                        key={city.value}
                                                                        onSelect={() => {
                                                                            setSelectedOriginCity(city.value);
                                                                            form.setValue("originCity", city.label);
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                city.value === field.value ? "opacity-100" : "opacity-0"
                                                                            )}
                                                                        />
                                                                        {city.label}
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage></FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            {/* Destino del embarque */}
                            <Card>

                                <CardHeader>
                                    <CardTitle className='font-bold text-center text-3xl'>Destino del embarque</CardTitle>
                                    <CardDescription className='text-center'>¿Cual es el destino del embarque?</CardDescription>
                                </CardHeader>
                                
                                <CardContent className='flex flex-col space-y-5'>
                                    {/* destinyCountry */}
                                    <FormField
                                        control={form.control}
                                        name='destinyCountry'
                                        render={({ field }) => {
                                            return <FormItem>
                                                <FormLabel className='text-md'>
                                                    País
                                                </FormLabel>
                                                <FormControl>
                                                    <Input placeholder='País' type='text' {...field} disabled></Input>
                                                </FormControl>
                                                <FormMessage></FormMessage>
                                            </FormItem>
                                        }}>
                                    </FormField>

                                    {/* destinyState */}
                                    <FormField
                                        control={form.control}
                                        name='destinyState'
                                        render={({ field }) => (
                                            <FormItem className='flex flex-col'>
                                                <FormLabel className='text-md'>Estado</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                className="w-full justify-between"
                                                            >
                                                                {field.value ? destinationStates.find((item) => item.label === field.value)?.label : "Seleccionar estado"}
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-[250px] h-96 p-2">
                                                        <Command>
                                                            <CommandInput placeholder="Buscar ubicaciones..." />
                                                            <CommandEmpty>Sin resultados.</CommandEmpty>
                                                            <CommandGroup className='flex overflow-auto'>
                                                                {destinationStates.map((state) => (
                                                                    <CommandItem
                                                                        disabled={isPending}
                                                                        className='cursor-pointer'
                                                                        value={state.label}
                                                                        key={state.value}
                                                                        onSelect={() => {
                                                                            setSelectedDestinationState(state.value);
                                                                            form.setValue("destinyState", state.label);
                                                                            loadCities(selectedDestinationCountry, state.value, 'destination');
                                                                            handleStateChange(state.value, 'destination');
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                state.label === field.value ? "opacity-100" : "opacity-0"
                                                                            )}
                                                                        />
                                                                        {state.label}
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage></FormMessage>
                                            </FormItem>
                                        )}
                                    />

                                    {/* destinyCity */}
                                    <FormField
                                        control={form.control}
                                        name='destinyCity'
                                        render={({ field }) => (
                                            <FormItem className='flex flex-col'>
                                                <FormLabel className='text-md'>Ciudad</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                className="w-full justify-between"
                                                            >
                                                                {field.value ? destinationCities.find((item) => item.label === field.value)?.label : "Seleccionar ciudad"}
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-[250px] h-96 p-2">
                                                        <Command>
                                                            <CommandInput placeholder="Buscar ubicaciones..." />
                                                            <CommandEmpty>Sin resultados.</CommandEmpty>
                                                            <CommandGroup className='flex overflow-auto'>
                                                                {destinationCities.map((city) => (
                                                                    <CommandItem
                                                                        disabled={isPending}
                                                                        className='cursor-pointer'
                                                                        value={city.label}
                                                                        key={city.value}
                                                                        onSelect={() => {
                                                                            setSelectedDestinationCity(city.value);
                                                                            form.setValue("destinyCity", city.label);
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                city.value === field.value ? "opacity-100" : "opacity-0"
                                                                            )}
                                                                        />
                                                                        {city.label}
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage></FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                        </div>


                    </form>
                </Form>
            </CardContent>
        </Card >
    )
}

export default CreateLoadNational