"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { UpdateSchema } from "@/schemas/index"

// error: "Invalid fields!"
//success: "¡El usuario ha sido actualizado!" 
const updateUser = async (values: z.infer<typeof UpdateSchema>) => {
    const validatedFields = UpdateSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id, email, name, admin, loads, finances, billing } = validatedFields.data;


    // cambiar esto a un update
    await db.user.update({
        where: {
            id,
        },
        data: {
            name,
            admin,
            loads,
            finances,
            billing
        },
    });

    return { success: "Usuario actualizado!" }
}

export default updateUser