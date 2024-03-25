"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { UpdateClientSchema } from "@/schemas/index"
import { getClientByID } from "@/data/contacts";


const createClient = async (values: z.infer<typeof UpdateClientSchema>) => {
    const validatedFields = UpdateClientSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id, name, rfc, email } = validatedFields.data;

    //Check if the user exists
    const ClientExists = await getClientByID(id);

    if (!ClientExists) {
        return { error: "¡No existe el cliente!" }
    }

    //Update client
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

    return { success: "¡Se han actualizado los datos!" }
}

export default createClient