"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { UpdateClientSchema } from "@/schemas/index"

const createClient = async (values: z.infer<typeof UpdateClientSchema>) => {
    const validatedFields = UpdateClientSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id, name, rfc, email } = validatedFields.data;

    await db.contact.update({
        where: {
            id
        },
        data: {
            name,
            rfc,
            email,
        },
    });

    console.log(id)
    return { success: "¡Se ha agregado la dirección!" }
}

export default createClient