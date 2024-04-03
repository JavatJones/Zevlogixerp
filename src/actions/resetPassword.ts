"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import bcrypt from "bcrypt";
import { ResetPasswordSchema } from "@/schemas/index"
import { getUserByID } from "@/data/user";

const resetPassword = async (values: z.infer<typeof ResetPasswordSchema>) => {
    const validatedFields = ResetPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id, password } = validatedFields.data;

    //Check if the user exists
    const existingUser = await getUserByID(id);

    if (!existingUser) {
        return { error: "¡No existe el usuario!" }
    }

    //hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    //check if is an admin user
    if (existingUser.email === 'dev@dev.com') {
        return { error: "¡Un usuario raíz no puede ser actualizado!" }
    }


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

    return { success: `La contraseña se ha actualizado!` }
}

export default resetPassword