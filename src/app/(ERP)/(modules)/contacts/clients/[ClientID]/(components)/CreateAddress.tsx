"use client";
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react';

//actions
import createAddress from "@/actions/contacts/clients/address/create"
type ClientData = {
    id: string,

}

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


import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from 'react-toastify';

//validation
import * as z from "zod";
import { CreateNewAddressClientSchema } from "@/schemas/index"
import { useTransition } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FormError } from '@/components/forms/form-error'
import { FormSuccess } from '@/components/forms/form-success'

//locations autocomplate
import { Country, ICountry, State, IState, City, ICity } from "country-state-city"

interface Option {
    label: string;
    value: string;
}


const CreateAddress: React.FC<ClientData> = (props) => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();



    //Locations ---------------------------------------------------

    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedState, setSelectedState] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');

    const [countries, setCountry] = useState<Option[]>([]);
    const [states, setStates] = useState<Option[]>([]);
    const [cities, setCities] = useState<Option[]>([]);

    useEffect(() => {
        loadCountries();
    }, []);

    const loadCountries = () => {
        const countriesOptions: Option[] = Country.getAllCountries().map((dt: ICountry) => ({
            label: dt.name,
            value: dt.isoCode,
        }));
        setCountry(countriesOptions)
    };

    const loadStates = (countryCode: string) => {
        const stateOptions: Option[] = State.getStatesOfCountry(countryCode).map((state: IState) => ({
            label: state.name,
            value: state.isoCode,
        }));
        setStates(stateOptions);
    };

    const loadCities = (countryCode: string, stateCode: string) => {
        const cityOptions: Option[] = City.getCitiesOfState(countryCode, stateCode).map((city) => ({
            label: city.name,
            value: city.name,
        }));
        setCities(cityOptions);
    };


    //Locations changes-----------
    const handleCountryChange = (selectedValue: string) => {
        setSelectedCountry(selectedValue)
        setSelectedState('');
        setSelectedCity('');
        setStates([]); //limpiar los campos de la lista de estados
        setCities([]); //limpiar los campos de la lista de ciudades
        form.setValue("state", ''); //limpiar los campos de la lista de estados del form
        form.setValue("city", ''); //limpiar los campos de la lista de ciudades del form
        loadStates(selectedValue);
    };

    const handleStateChange = (selectedValue: string) => {
        setSelectedState(selectedValue);
        setSelectedCity('');
        setCities([]); //limpiar los campos de la lista de ciudades
        form.setValue("city", ''); //limpiar los campos de la lista de ciudades del form
        loadCities(selectedCountry, selectedValue);
    };

    const handleCityChange = (selectedValue: string) => {
        setSelectedCity(selectedValue);
    };


    //Validation
    const form = useForm<z.infer<typeof CreateNewAddressClientSchema>>({
        resolver: zodResolver(CreateNewAddressClientSchema),
        defaultValues: {
            id: props.id,
            name: "",
            address: "",
            codePostal: "",
            city: "",
            state: "",
            country: "",


        }
    });





    //submit form
    const onSubmit = (values: z.infer<typeof CreateNewAddressClientSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            createAddress(values)
                .then((data) => {

                    setSuccess(data.success)
                    setError(data.error)

                    if (data.error === undefined) {
                        form.reset()
                        router.refresh()
                    }

                    toast.success(data.success?.toString())
                    toast.error(data.error?.toString())

                })
                .catch((error) => {
                    console.log(error)
                })
        });

    }

    //Clear Message 
    const clearMessage = () => {
        setError("");
        setSuccess("");

    }


    return (
        <AlertDialog>

            <AlertDialogTrigger asChild>
                <Button variant="default">Agregar dirección</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='z-50'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Agregar dirección</AlertDialogTitle>
                </AlertDialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-5'>

                        <AlertDialogDescription className='flex flex-col space-y-5'>

                            <p>Esta acción no se puede deshacer. Esto editara los campos del sistema.</p>

                            {/* Dirección*/}
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => {
                                    return <FormItem>
                                        <div className='flex flex-col space-y-3 items-start'>
                                            <FormLabel className='text-md'>
                                                Nombre de ubicación
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder='Ej. Oficina' type='text' {...field} disabled={isPending}></Input>
                                            </FormControl>
                                        </div>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                }}>
                            </FormField>

                            {/* Dirección*/}
                            <FormField
                                control={form.control}
                                name='address'
                                render={({ field }) => {
                                    return <FormItem>
                                        <div className='flex flex-col space-y-3 items-start'>
                                            <FormLabel className='text-md'>
                                                Dirección
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder='Dirección' type='text' {...field} disabled={isPending}></Input>
                                            </FormControl>
                                        </div>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                }}>
                            </FormField>

                            {/* codePostal */}
                            <FormField
                                control={form.control}
                                name='codePostal'
                                render={({ field }) => {
                                    return <FormItem>
                                        <div className='flex flex-col space-y-3 items-start'>
                                            <FormLabel className='text-md'>
                                                Código postal
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder='Código postal' type='text' {...field} disabled={isPending}></Input>
                                            </FormControl>
                                        </div>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                }}>
                            </FormField>

                            {/* country */}
                            <FormField
                                control={form.control}
                                name='country'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col'>
                                        <FormLabel className='text-md'>País</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className="w-full justify-between"
                                                        disabled={isPending}
                                                    >
                                                        {field.value ? countries.find((item) => item.label === field.value)?.label : "Seleccionar país"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex w-[250px] h-96 p-2">
                                                <Command>
                                                    <CommandInput placeholder="Buscar..." />
                                                    <CommandEmpty>Sin resultados.</CommandEmpty>
                                                    <CommandGroup className='flex overflow-auto'>
                                                        {countries.map((country) => (
                                                            <CommandItem
                                                                disabled={isPending}
                                                                className='cursor-pointer'
                                                                value={country.label}
                                                                key={country.value}
                                                                onSelect={() => {


                                                                    handleCountryChange(country.value);
                                                                    form.setValue("country", country.label);
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        country.label === field.value ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {country.label}
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


                            {/* state */}
                            <FormField
                                control={form.control}
                                name='state'
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
                                                        {field.value ? states.find((item) => item.label === field.value)?.label : "Seleccionar estado"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[250px] h-96 p-2">
                                                <Command>
                                                    <CommandInput placeholder="Buscar..." />
                                                    <CommandEmpty>Sin resultados.</CommandEmpty>
                                                    <CommandGroup className='flex overflow-auto'>
                                                        {states.map((state) => (
                                                            <CommandItem
                                                                disabled={isPending}
                                                                className='cursor-pointer'
                                                                value={state.label}
                                                                key={state.value}
                                                                onSelect={() => {

                                                                    handleStateChange(state.value);
                                                                    form.setValue("state", state.label);

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

                            {/* city */}
                            <FormField
                                control={form.control}
                                name='city'
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
                                                        {field.value ? cities.find((item) => item.value === field.value)?.value : "Seleccionar ciudad"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[250px] h-96 p-2">
                                                <Command>
                                                    <CommandInput placeholder="Buscar..." />
                                                    <CommandEmpty>Sin resultados.</CommandEmpty>
                                                    <CommandGroup className='flex overflow-auto'>
                                                        {cities.map((city) => (
                                                            <CommandItem
                                                                disabled={isPending}
                                                                className='cursor-pointer'
                                                                value={city.value}
                                                                key={city.value}
                                                                onSelect={() => {
                                                                 
                                                                    form.setValue("city", city.label);
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


                            {/* city */}
                            {/* <FormField
                                control={form.control}
                                name='city'
                                render={({ field }) => {
                                    return <FormItem>
                                        <div className='flex flex-col space-y-3 items-start'>
                                            <FormLabel className='text-md'>
                                                Ciudad
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder='Ciudad' type='text' {...field} disabled={isPending}></Input>
                                            </FormControl>
                                        </div>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                }}>
                            </FormField> */}

                            {/* state */}
                            {/* <FormField
                                control={form.control}
                                name='state'
                                render={({ field }) => {
                                    return <FormItem>
                                        <div className='flex flex-col space-y-3 items-start'>
                                            <FormLabel className='text-md'>
                                                Estado
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder='Estado' type='text' {...field} disabled={isPending}></Input>
                                            </FormControl>
                                        </div>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                }}>
                            </FormField> */}

                            {/* country */}
                            {/* <FormField
                                control={form.control}
                                name='country'
                                render={({ field }) => {
                                    return <FormItem>
                                        <div className='flex flex-col space-y-3 items-start'>
                                            <FormLabel className='text-md'>
                                                País
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder='País' type='text' {...field} disabled={isPending}></Input>
                                            </FormControl>
                                        </div>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                }}>
                            </FormField> */}

                        </AlertDialogDescription>

                        <AlertDialogFooter>
                            <AlertDialogCancel asChild>
                                <Button variant={'ghost'} onClick={() => clearMessage()}>
                                    Volver
                                </Button>
                            </AlertDialogCancel>
                            <Button type='submit' disabled={isPending}>

                                {isPending ?
                                    <p>Actualizando...</p>
                                    :
                                    <p>Confirmar</p>
                                }
                            </Button>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>

        </AlertDialog>
    )
}

export default CreateAddress