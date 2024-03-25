import { db } from "@/lib/db";

//Obtener usuario por Email
export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({ where: { email } })
        return user;
    } catch {
        return null;
    }
}


//Obtener usuario por ID
export const getUserByID = async (id: string) => {
    try {
        const user = await db.user.findUnique({ where: { id } })
        return user;
    } catch {
        return null;
    }
}

//Obtener todos los usuarios
export const getAllUsers = async () => {
    try {
        const users = await db.user.findMany();
        return users;
    } catch {
        return null;
    }
}


