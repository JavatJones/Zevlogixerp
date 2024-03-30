"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { DeleteUserSchema } from "@/schemas/index"
import { getClientByID } from "@/data/contacts";
import { allLoadsByContactID } from "@/data/loads";



const DeleteFeeProvider = async (values: z.infer<typeof DeleteUserSchema>) => {
    const validatedFields = DeleteUserSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id } = validatedFields.data;

    //Checar si existe el fee que se quiere borrar
    const FeeExists = await db.fees.findUnique({
        where: {
            id
        }
    });

    if (!FeeExists) {
        return { error: "¡El Fee no existe!" }
    }

    try {

        //Borrar fee del provider
        await db.fees.delete({
            where: {
                id
            }
        });

    } catch (error) {
        return { error: "¡Algo ha salido mal!" }
    }

    return { success: "¡El Fee ha sido borrado!" }


}

export default DeleteFeeProvider