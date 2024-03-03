"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { CreateFeeSchema } from "@/schemas/index"
import { getNationalLoadByLoadID } from "@/data/loads";


const createProvider = async (values: z.infer<typeof CreateFeeSchema>) => {
    
    const validatedFields = CreateFeeSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { loadId, provider, cost } = validatedFields.data;

    // const existingLoad = await getNationalLoadByLoadID(load)

    // if (existingLoad) {
    //     return { error: "El load ingresado ya existe!" }

    // }


    // Crear nuevo proveedor para el embarque
    await db.fees.create({
        data: {
            cost,

            Contact: {
                connect: { id: provider }
            },

            Load: {
                connect: { id: loadId }
            },

        },
    });


    return { success: `Proveedor agregado!`, }
}

export default createProvider