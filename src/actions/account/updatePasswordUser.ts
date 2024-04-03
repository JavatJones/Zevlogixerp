"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { ResetPasswordUserSchema } from "@/schemas/index"
import { getUserByID } from "@/data/user";

const updatePasswordUser = async (values: z.infer<typeof ResetPasswordUserSchema>) => {
    const validatedFields = ResetPasswordUserSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id, old_password, password } = validatedFields.data;

    //Check if the user exists
    const existingUser = await getUserByID(id);

    if (!existingUser) {
        return { error: "¡No existe el usuario!" }
    }

    const comparePW = await bcrypt.compare(old_password, existingUser.password)

    if (!comparePW) {
        return { error: "¡La contraseña antigua no coincide!" }
    }


    //hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    //check if is an admin user
    // if (existingUser.email === 'dev@dev.com') {
    //     return { error: "¡Un usuario raíz no puede ser actualizado!" }
    // }


    // Update user
    try {
        await db.user.update({
            where: {
                id,
            },
            data: {
                password: hashedPassword,
            },
        });
    } catch (error) {
        return { error: "¡Algo ha salido mal!" }
    }

    return { success: `¡La contraseña se ha actualizado!` }
}

export default updatePasswordUser