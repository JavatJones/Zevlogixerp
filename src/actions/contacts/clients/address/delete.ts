"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { DeleteUserSchema } from "@/schemas/index"

const deleteAddress = async (values: z.infer<typeof DeleteUserSchema>) => {
    const validatedFields = DeleteUserSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { id } = validatedFields.data;

    await db.address.delete({
        where: {
            id: id,
        }
    });


    return { success: "¡La dirección ha sido borrada!" }
}

export default deleteAddress