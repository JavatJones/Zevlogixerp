"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { DeleteUserSchema } from "@/schemas/index"
import { getClientByID } from "@/data/contacts";
import { allLoadsByContactID } from "@/data/loads";



const deleteClient = async (values: z.infer<typeof DeleteUserSchema>) => {
    const validatedFields = DeleteUserSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id } = validatedFields.data;


    //Check if the client exists
    const ClientExists = await getClientByID(id);

    if (!ClientExists) {
        return { error: "¡El cliente no existe!" }
    }

    //Check if the client has related loads
    const ClientLoadRelated = await allLoadsByContactID(id);

    if (ClientLoadRelated?.length! > 0) {
        return { error: "¡No se puede borrar el cliente porque esta relacionado a un load!" }
    }


    //delete contact
    await db.contact.delete({
        where: {
            id
        }
    });

    return { success: "¡El cliente ha sido borrado!" }
}

export default deleteClient