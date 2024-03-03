"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { EditSaleNationalSchema } from "@/schemas/index"
import { getNationalLoadByLoadID } from "@/data/loads";


const editSale = async (values: z.infer<typeof EditSaleNationalSchema>) => {
    const validatedFields = EditSaleNationalSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id, load, invoice, shipmentInvoice, salePrice, profit } = validatedFields.data;

    // const existingLoad = await getNationalLoadByLoadID(load)

    // if (existingLoad) {
    //     return { error: "El load ingresado ya existe!" }

    // }


    // Crear nuevo embarque
    await db.load.update({
        where:{
            id,
        },
        data: {
            invoice,
            shipmentInvoice,
            salePrice,
            profit,
        },
    });


    return { success: `¡Venta modificada!` }
}

export default editSale