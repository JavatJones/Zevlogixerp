"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import bcrypt from "bcrypt";
import { RegisterSchema } from "@/schemas/index"
import { getUserByEmail } from "@/data/user";

const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password, name, admin, loads, finances, billing } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "¡Ya existe un usuario con el mismo email!" }
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            admin,
            loads,
            finances,
            billing
        },
    });

    return { success: "¡El usuario ha sido creado!" }
}

export default register