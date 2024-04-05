"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { CreateNewAddressClientSchema } from "@/schemas/index"

const createAddress = async (values: z.infer<typeof CreateNewAddressClientSchema>) => {
    const validatedFields = CreateNewAddressClientSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id, name, address, city, state, codePostal, country } = validatedFields.data;

    await db.address.create({

        data: {
            name,
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

    return { success: "¡Se ha agregado la dirección!" }
}

export default createAddress