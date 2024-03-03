import { db } from "@/lib/db";


//Get all loads national
export const getAllLoads = async () => {
    try {
        const data = await db.load.findMany({
            where: {
                loadType: "National",
            },
        });
        return data;
    } catch {
        return null;
    }
};

//Get a load national
export const getNationalLoad = async (id: string) => {
    try {
        const data = await db.load.findUnique({
            where: {
                id
            },

        });
        return data;
    } catch {
        return null;
    }
};

//Get a load national by LoadID
export const getNationalLoadByLoadID = async (load: string) => {
    try {
        const data = await db.load.findUnique({ where: { load } });
        return data;
    } catch {
        return null;
    }
};


//Get all loads InterNational
export const getAllLoadsInternational = async () => {
    try {
        const data = await db.load.findMany({
            where: {
                loadType: "International",
            },
        });
        return data;
    } catch {
        return null;
    }
}