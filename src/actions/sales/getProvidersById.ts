"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { CreateLoadNationalSchema } from "@/schemas/index"

//get users client
import { getProviderByID } from '@/data/contacts';


const getProviders = async (providerID: string) => {

    const provider = await getProviderByID(providerID)

    return { provider }
}

export default getProviders