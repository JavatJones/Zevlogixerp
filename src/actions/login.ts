"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas/index"

import { signIn, signOut } from "@/lib/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }
    const { email, password } = validatedFields.data;

    try {

        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,

        })

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "!Credenciales invalidas!" }
                default:
                    return { error: "!Algo salio mal!" }
            }
        }
        throw error;
    }
    return { success: "¡Bienvenido!" }
}

export default login