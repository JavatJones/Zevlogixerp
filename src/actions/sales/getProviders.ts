"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { CreateLoadNationalSchema } from "@/schemas/index"

//get
import { getContactProvider } from '@/data/contacts';


const getProviders = async () => {

    const provider = await getContactProvider()

    return { provider }
}

export default getProviders