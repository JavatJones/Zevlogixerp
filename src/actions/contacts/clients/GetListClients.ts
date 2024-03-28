"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { CreateLoadNationalSchema } from "@/schemas/index"

//get users client
import { getContactClient } from '@/data/contacts';


const getListClients = async () => {

    const clients = await getContactClient()

    return { clients }
}

export default getListClients