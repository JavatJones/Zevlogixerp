"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { EditLoadNationalSchema } from "@/schemas/index"
import { getNationalLoadByLoadID } from "@/data/loads";


const editLoad = async (values: z.infer<typeof EditLoadNationalSchema>) => {
    const validatedFields = EditLoadNationalSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id, orderDate, collectionDate, shippingDetails, recollection, nameClient, originCountry, originState, originCity, destinyCountry, destinyState, destinyCity } = validatedFields.data;

    // const existingLoad = await getNationalLoadByLoadID(load)

    // if (existingLoad) {
    //     return { error: "El load ingresado ya existe!" }

    // }


    // editar nuevo embarque
    await db.load.update({
        where: {
            id
        },
        data: {

            Contact: {
                connect: { id: nameClient }
            },

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

        },
    });


    return { success: `¡Embarque modificado!` }
}

export default editLoad