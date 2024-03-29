import React from 'react'
//***props***
type FeesData = {
    id: string;

}
import { Schema, columns } from '../../../(components)/providers/table/columns'
import { getAllFeesByID } from '@/data/sales'
import { DataTable } from "../../../(components)/providers/table/data-table"

//ui
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import CreateProvider from "../../../(components)/providers/CreateProvider"

const FeesProviders: React.FC<FeesData> = async (props) => {

    async function getData(): Promise<Schema[]> {
        // Fetch data
        const loads = await getAllFeesByID(props.id);

        return loads.map((dt: any) => ({
            id: dt.id,
            provider: dt.contactId,
            cost: dt.cost,
        }));
    }

    const data = await getData();

    return (
        <div className='flex flex-col space-y-5'>
            <div className='flex flex-row justify-end'>
                <CreateProvider id={props.id}></CreateProvider>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className='flex flex-row justify-between items-center'>
                        Proveedores


                    </CardTitle>
                    <CardDescription>
                        Asignar proveedores a este embarque
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable data={data} columns={columns}></DataTable>
                </CardContent>
            </Card>
        </div>
    )
}

export default FeesProviders