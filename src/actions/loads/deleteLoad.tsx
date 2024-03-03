"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { DeleteLoadSchema } from "@/schemas/index"
const deleteUser = async (values: z.infer<typeof DeleteLoadSchema>) => {
    const validatedFields = DeleteLoadSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id } = validatedFields.data;


    const existingLoad = await db.load.findUnique({
        where: {
            id,
        },
    });

    if (!existingLoad) {
        return { error: "Embarque no encontrado!" }

    }

    // delete load
    await db.load.delete({
        where: {
            id,
        }

    });


    return { success: "Embarque borrado!" }
}

export default deleteUser