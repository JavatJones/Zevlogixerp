"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { EditSaleNationalSchema } from "@/schemas/index"
import { getNationalLoad } from "@/data/loads"

const editSale = async (values: z.infer<typeof EditSaleNationalSchema>) => {
    const validatedFields = EditSaleNationalSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id, load, invoice, shipmentInvoice, salePrice, profit } = validatedFields.data;

    const existingLoad = await getNationalLoad(id)

    if (!existingLoad) {
        return { error: "¡El embarque no existe!" }

    }

    console.log(`${salePrice}`)

    // Actualizar embarque
    await db.load.update({
        where: {
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