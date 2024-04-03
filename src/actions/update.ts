"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { UpdateSchema } from "@/schemas/index"
import { getUserByEmail, getUserByID } from "@/data/user";


const updateUser = async (values: z.infer<typeof UpdateSchema>) => {
    const validatedFields = UpdateSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id, name, email: newEmail, admin, loads, finances, billing, contacts } = validatedFields.data;


    //Check if the user exists
    const existingUser = await getUserByID(id);

    if (!existingUser) {
        return { error: "¡No existe el usuario!" }
    }

    // Verificar si el correo electrónico se ha modificado
    if (existingUser.email !== newEmail) {
        // Verificar si el nuevo correo electrónico ya está en uso por otro usuario
        const existingEmail = await getUserByEmail(newEmail);

        if (existingEmail) {
            return { error: "¡Ya existe ese correo electrónico!" };
        }
    }


    //Update User
    try {
        await db.user.update({
            where: {
                id,
            },
            data: {
                name,
                admin,
                email: newEmail,
                loads,
                finances,
                billing,
                contacts
            },
        });
    } catch (error) {
        return { error: "¡Algo ha salido mal al actualizar el usuario!" }
    }

    return { success: "¡Usuario actualizado exitosamente!" }
}

export default updateUser