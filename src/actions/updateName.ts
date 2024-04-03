"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { UpdateNameSchema } from "@/schemas/index"
import { getUserByID } from "@/data/user";


const updateUser = async (values: z.infer<typeof UpdateNameSchema>) => {
    const validatedFields = UpdateNameSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id, name } = validatedFields.data;


    //Check if the user exists
    const existingUser = await getUserByID(id);

    if (!existingUser) {
        return { error: "¡No existe el usuario!" }
    }

    //Update User
    try {
        await db.user.update({
            where: {
                id,
            },
            data: {
                name,
            },
        });
    } catch (error) {
        return { error: "¡Algo ha salido mal!" }
    }

    return { success: "¡Usuario actualizado!" }
}

export default updateUser