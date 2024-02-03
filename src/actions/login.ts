"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas/index"
const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }
    return { success: "Entrando al Dashboard!" }
}

export default login