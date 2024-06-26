"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { CreateNewClientSchema } from "@/schemas/index"
import { NextResponse } from "next/server";

const createClient = async (values: z.infer<typeof CreateNewClientSchema>) => {
    const validatedFields = CreateNewClientSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { name, rfc, email } = validatedFields.data;

    await db.contact.create({
        data: {
            type: "Client",
            name,
            rfc,
            email,
        },
    });

    return { success: "¡El cliente ha sido creado!" }
}

export default createClient