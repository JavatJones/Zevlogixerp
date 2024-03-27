import { db } from "@/lib/db";

//obtener contacto donde sea cliente
export const getContactClient = async () => {
    try {
        const contactClient = await db.contact.findMany({
            where: {
                type: "Client",
            },
        }
        );
        return contactClient;
    } catch (error) {
        console.error('Error al obtener clientes de contacto:', error);
        throw error; // Lanzar el error para que sea manejado por el código que llame a esta función

    }
}

//obtener contacto por id
export const getClientByID = async (id: string) => {
    try {
        const contactClient = await db.contact.findUnique({ where: { id } })
        return contactClient;
    } catch (error) {
        console.error('Error al obtener clientes de contacto:', error);
        throw error; // Lanzar el error para que sea manejado por el código que llame a esta función

    }
}

//obtener proveedor por id
export const getProviderByID = async (id: string) => {
    try {
        const provider = await db.contact.findUnique({ where: { id } })
        return provider;
    } catch (error) {
        console.error('Error al obtener clientes de contacto:', error);
        throw error; // Lanzar el error para que sea manejado por el código que llame a esta función

    }
}



//obtener contacto donde sea provedor
export const getContactProvider = async () => {
    try {
        const contactClient = await db.contact.findMany({
            where: {
                type: "Provider",
            },
        }
        );
        return contactClient;
    } catch (error) {
        console.error('Error al obtener clientes de contacto:', error);
        throw error; // Lanzar el error para que sea manejado por el código que llame a esta función

    }
}

//--Ubicaciones--

//obtener todas las ubicaciones guardadas de un usuario
export const getAllAddressByID = async (id: string) => {
    try {
        const contactClient = await db.address.findMany({
            where: {
                contactId: id
            }
        })
        return contactClient;
    } catch (error) {
        console.error('Error al obtener clientes de contacto:', error);
        throw error; // Lanzar el error para que sea manejado por el código que llame a esta función

    }
}


//Obtener una ubicacion por ID

export const getAddressByID = async (id: string) => {
    try {
        const result = await db.address.findUnique({
            where: {
                id: id
            }
        })
        return result;
    } catch (error) {
        console.error('Error al obtener clientes de contacto:', error);
        throw error; // Lanzar el error para que sea manejado por el código que llame a esta función

    }
}

//--- Loads
