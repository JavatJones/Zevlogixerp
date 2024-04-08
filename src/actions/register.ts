"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas/index"
import { getUserByEmail } from "@/data/user";

const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password, name, admin, loads, quotes, finances, sales, billing, contacts } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "¡Ya existe un usuario con el mismo email!" }
    }

    try {
        await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                admin,
                loads,
                billing,
                quotes,
                sales,
                finances,
                contacts,
            },
        });
    } catch (error) {
        return { error: "¡Algo ha salido mal!" }
    }

    return { success: "¡El usuario ha sido creado!" }
}

export default register