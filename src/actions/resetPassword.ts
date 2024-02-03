"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import bcrypt from "bcrypt";
import { ResetPasswordSchema } from "@/schemas/index"

const resetPassword = async (values: z.infer<typeof ResetPasswordSchema>) => {
    const validatedFields = ResetPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: {
            id,
        },
        data: {
            password: hashedPassword,
        },
    });

    return { success: `La contraseña se ha cambiado correctamente!` }
}

export default resetPassword