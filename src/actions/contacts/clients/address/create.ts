"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { CreateNewAddressClientSchema } from "@/schemas/index"

const createAddress = async (values: z.infer<typeof CreateNewAddressClientSchema>) => {
    const validatedFields = CreateNewAddressClientSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id, address, city, state, codePostal, country } = validatedFields.data;

    await db.address.create({

        data: {
            address,
            city,
            state,
            codePostal,
            country,

            Contact: {
                connect: { id: id }
            }
        },
    });

    console.log(id, address, city, state, codePostal, country)
    return { success: "¡Se ha agregado la dirección!" }
}

export default createAddress