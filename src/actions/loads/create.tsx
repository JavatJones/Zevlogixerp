"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { CreateLoadNationalSchema } from "@/schemas/index"
import { getNationalLoadByLoadID } from "@/data/loads";


const createLoad = async (values: z.infer<typeof CreateLoadNationalSchema>) => {
    const validatedFields = CreateLoadNationalSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { load, orderDate, collectionDate, shippingDetails, recollection, nameClient, originCountry, originState, originCity, destinyCountry, destinyState, destinyCity } = validatedFields.data;

    const existingLoad = await getNationalLoadByLoadID(load)

    if (existingLoad) {
        return { error: "El load ingresado ya existe!" }

    }


    // Crear nuevo embarque
    await db.load.create({
        data: {
            load,
            loadType: "National",
            orderDate,
            collectionDate,

            shippingDetails,
            recollection,

            originCountry,
            originState,
            originCity,
            
            destinyCountry,
            destinyState,
            destinyCity,

            Contact: {
                connect: { id: nameClient }
            },



        },



    });


    return { success: `¡Embarque creado!` }
}

export default createLoad