import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email("Email invalido"),
    password: z.string().min(1, { message: "La contraseña es requerida" }),
});

// La contraseña debe tener mínimo 10 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial Ej ! @ # $ % & * ^
const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/
);

export const RegisterSchema = z.object({
    name: z.string().min(1, { message: "El nombre del usuario es requerido" }),
    email: z.string().email("Email invalido"),
    password: z.string().min(1, { message: 'Ingresa una contraseña' }).regex(passwordValidation, { message: 'La contraseña debe tener mínimo 10 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial Ej ! @ # $ % & * ^' }),
    admin: z.boolean().default(false),
    loads: z.boolean().default(false),
    finances: z.boolean().default(false),
    billing: z.boolean().default(false),
});

export const UpdateSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Porfavor ingresa un nombre"),
    email: z.string().email("Email invalido"),
    admin: z.boolean().default(false),
    loads: z.boolean().default(false),
    finances: z.boolean().default(false),
    billing: z.boolean().default(false),
});

export const DeleteUserSchema = z.object({
    id: z.string(),
});

export const ResetPasswordSchema = z.object({
    id: z.string(),
    password: z.string().min(1, { message: 'Ingresa una contraseña' }).regex(passwordValidation, { message: 'La contraseña debe tener mínimo 10 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial Ej ! @ # $ % & * ^' }),
    passwordConfirm: z.string(),
}).refine((data) => {
    return data.password === data.passwordConfirm
}, {
    message:"Las contraseñas no coinciden!",
    path:["passwordConfirm"]
})