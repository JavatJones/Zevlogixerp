import React from 'react'
type getIDUser = {
    id: string,

}
//ui
import { Separator } from "@/components/ui/separator"
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import CreateAddress from './CreateAddress';
import { columns } from './addressColumn/columns';
import { DataTable } from './addressColumn/data-table';
import { getAllAddressByID } from '@/data/contacts'

// This type is used to define the shape of our data.
type AddressSchema = {
    id: string
    name: string
    address: string
    codePostal: string
    city: string
    state: string
    country: string
    contactId: string
};




const AddressInfo: React.FC<getIDUser> = async (props) => {


    async function getData(): Promise<AddressSchema[]> {
        // Fetch data from your API here.
        const address = await getAllAddressByID(props.id);

        return address.map((ubi: any) => ({
            id: ubi.id,
            name: ubi.name,
            address: ubi.address,
            city: ubi.city,
            codePostal: ubi.codePostal,
            country: ubi.country,
            state: ubi.state,
            contactId: ubi.contactId,
        }));
    }

    const data = await getData();


    return (
        <Card className='container'>
            <CardHeader>
                <CardTitle>Detalles de direcciónes</CardTitle>
                <div className='flex flex-row justify-end items-center'>
                    <CreateAddress id={props.id}></CreateAddress>
                </div>
            </CardHeader>
            <CardContent className='flex flex-col'>

                <DataTable columns={columns} data={data} />

            </CardContent>

        </Card>
    )
}

export default AddressInfo