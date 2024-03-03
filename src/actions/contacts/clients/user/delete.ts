"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { DeleteUserSchema } from "@/schemas/index"

const deleteClient = async (values: z.infer<typeof DeleteUserSchema>) => {
    const validatedFields = DeleteUserSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id } = validatedFields.data;

    await db.contact.delete({
        where: {
            id
        }
    });

    return { success: "¡El cliente ha sido borrado!" }
}

export default deleteClient