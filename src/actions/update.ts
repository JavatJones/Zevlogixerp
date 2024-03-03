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

    const { id, name, admin, loads, finances, billing, contacts } = validatedFields.data;


    const existingUser = await db.user.findUnique({
        where: {
            id,
        },
    });

    if (!existingUser) {
        return { error: "Usuario no encontrado!" }

    }


    await db.user.update({
        where: {
            id,
        },
        data: {
            name,
            admin,
            loads,
            finances,
            billing,
            contacts
        },
    });

    // // cambiar esto a un update
    // await db.user.update({
    //     where: {
    //         id,
    //     },
    //     data: {
    //         name,
    //         admin,
    //         modules: {
    //             update: {
    //                 admin,
    //                 loads,
    //                 billing,
    //                 finances,
    //             }
    //         }
    //     },
    // });

    return { success: "Usuario actualizado!" }
}

export default updateUser