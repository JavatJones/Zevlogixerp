import { db } from "@/lib/db";

//providers----------------------------------------

//obtener todas las ubicaciones guardadas de un usuario
export const getAllFeesByID = async (id: string) => {
    try {
        const contactClient = await db.fees.findMany({
            where: {
                loadId: id,
            }
        })
        return contactClient;
    } catch (error) {
        console.error('Error al obtener clientes de contacto:', error);
        throw error; // Lanzar el error para que sea manejado por el código que llame a esta función

    }
}