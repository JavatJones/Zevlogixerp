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

    const { id, load, orderDate, collectionDate, shippingDetails, recollection, nameClient, originCountry, originState, originCity, destinyCountry, destinyState, destinyCity } = validatedFields.data;

    // const existingLoad = await getNationalLoadByLoadID(load)

    // if (existingLoad) {
    //     return { error: "El load ingresado ya existe!" }

    // }


    // Crear nuevo embarque
    // await db.load.create({
    //     data: {
    //         load,
    //         loadType: "National",
    //         orderDate,
    //         collectionDate,

    //         shippingDetails,
    //         recollection,

    //         Contact: {
    //             connect: { id: nameClient }
    //         },

    //         LoadLotacionts: {
    //             create: {

    //                 originCity,
    //                 originState,
    //                 originCountry,

    //                 destinyCountry,
    //                 destinyState,
    //                 destinyCity,
    //             },
    //         },
    //     },
    // });


    return { success: `¡Embarque modificado! ${destinyState}, ${destinyCity}` }
}

export default editLoad