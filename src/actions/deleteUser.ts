"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { DeleteUserSchema } from "@/schemas/index"
import { getUserByID } from "@/data/user";


const deleteUser = async (values: z.infer<typeof DeleteUserSchema>) => {
    const validatedFields = DeleteUserSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id } = validatedFields.data;

    //Check if the user exists
    const existingUser = await getUserByID(id);

    if (!existingUser) {
        return { error: "¡No existe el usuario!" }
    }


    //check if is an admin user
    if (existingUser.email === 'dev@dev.com' || existingUser.email === 'marino.olalde@aldevaram.com') {
        return { error: "¡Un usuario raíz no puede ser eliminado!" }
    }



    // Delete user
    try {
        await db.user.delete({
            where: {
                id,
            }

        });
    } catch (error) {
        return { error: "¡Algo ha salido mal!" }
    }

    return { success: "¡Usuario borrado!" }
}

export default deleteUser