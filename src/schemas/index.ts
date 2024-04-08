import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email("Email invalido"),
    password: z.string().min(1, { message: "La contraseña es requerida" }),
});

// La contraseña debe tener mínimo 10 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial Ej ! . @ # $ % & * ^
const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{10,}$/
);

export const RegisterSchema = z.object({
    name: z.string().min(1, { message: "El nombre del usuario es requerido" }),
    email: z.string().email("Email invalido"),
    password: z.string().min(1, { message: 'Ingresa una contraseña' }).regex(passwordValidation, { message: 'La contraseña debe tener mínimo 10 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial Ej ! @ # $ % & * ^' }),
    admin: z.boolean().default(false),
    loads: z.boolean().default(false),
    sales: z.boolean().default(false),
    finances: z.boolean().default(false),
    quotes: z.boolean().default(false),
    billing: z.boolean().default(false),
    contacts: z.boolean().default(false),
});

export const UpdateSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Porfavor ingresa un nombre"),
    email: z.string().email("Email invalido"),
    admin: z.boolean().default(false),
    loads: z.boolean().default(false),
    finances: z.boolean().default(false),
    billing: z.boolean().default(false),
    contacts: z.boolean().default(false),
    quotes: z.boolean().default(false),
    sales: z.boolean().default(false),
});

export const UpdateNameSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Porfavor ingresa un nombre"),
});

export const DeleteUserSchema = z.object({
    id: z.string(),
});

export const ResetPasswordSchema = z.object({
    id: z.string(),
    password: z.string().min(1, { message: 'Ingresa una contraseña' }).regex(passwordValidation, { message: 'La contraseña debe tener mínimo 10 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial Ej . ! @ # $ % & * ^' }),
    passwordConfirm: z.string(),
}).refine((data) => {
    return data.password === data.passwordConfirm
}, {
    message: "Las contraseñas no coinciden!",
    path: ["passwordConfirm"]
})

export const ResetPasswordUserSchema = z.object({
    id: z.string(),
    old_password: z.string(),
    password: z.string().min(1, { message: 'Ingresa una contraseña' }).regex(passwordValidation, { message: 'La contraseña debe tener mínimo 10 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial Ej . ! @ # $ % & * ^' }),
    passwordConfirm: z.string(),
}).refine((data) => {
    return data.password === data.passwordConfirm
}, {
    message: "Las contraseñas no coinciden!",
    path: ["passwordConfirm"]
})



//register update a client contact
export const CreateNewClientSchema = z.object({
    name: z.string().min(1, "Porfavor ingresa un nombre"),
    rfc: z.string().min(1, "Porfavor ingresa un RFC"),
    email: z.string().email("Email invalido"),

});

//update a client contact
export const UpdateClientSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Porfavor ingresa un nombre"),
    rfc: z.string().min(1, "Porfavor ingresa un RFC"),
    email: z.string().email("Email invalido"),

});

//register a provider contact
export const CreateNewProviderSchema = z.object({
    name: z.string().min(1, "Porfavor ingresa un nombre"),
    email: z.string().email("Email invalido"),
    rfc: z.string().min(1, "Porfavor ingresa un RFC"),

});


//REGISTER NEW ADDRESS TO CLIENT
export const CreateNewAddressClientSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Agrega un nombre a esta ubicación"),
    address: z.string().min(1, "Agrega la dirección del cliente"),
    codePostal: z.string().min(1, "Agrega el código postal"),
    city: z.string().min(1, "Selecciona la ciudad"),
    state: z.string().min(1, "Selecciona el estado"),
    country: z.string().min(1, "Selecciona el país"),
});

//DELETE ADDRESS TO A CLIENT
export const DeleteAddressSchema = z.object({
    id: z.string(),
});

//CREATE new load national
export const CreateLoadNationalSchema = z.object({
    load: z.string().min(1, "Asigna un identificador a este load"),

    orderDate: z.date(),
    collectionDate: z.date().optional(),

    nameClient: z.string().min(1, "Selecciona un cliente"),

    originCountry: z.string().min(1, "Selecciona un país"),
    originState: z.string().min(1, "Selecciona un estado"),
    originCity: z.string().min(1, "Selecciona una ciudad"),

    destinyCountry: z.string().min(1, "Selecciona un país"),
    destinyState: z.string().min(1, "Selecciona un estado"),
    destinyCity: z.string().min(1, "Selecciona un ciudad"),

    shippingDetails: z.string().optional(),
    recollection: z.string().optional(),
    proBol: z.string().optional(),
});

//EDIT  load national
export const EditLoadNationalSchema = z.object({
    id: z.string(),
    load: z.string().min(1, "Asigna un identificador a este load"),
    orderDate: z.date(),
    collectionDate: z.date().optional(),
    nameClient: z.string().min(1, "Selecciona un cliente"),

    originCountry: z.string().min(1, "Selecciona un país"),
    originState: z.string().min(1, "Selecciona un estado"),
    originCity: z.string().min(1, "Selecciona una ciudad"),

    destinyCountry: z.string().min(1, "Selecciona un país"),
    destinyState: z.string().min(1, "Selecciona un estado"),
    destinyCity: z.string().min(1, "Selecciona un ciudad"),

    shippingDetails: z.string().optional(),
    recollection: z.string().optional(),
    proBol: z.string().optional(),
});

//delete schema load
export const DeleteLoadSchema = z.object({
    id: z.string(),
});



//Module:Sale - National--------------------------------------------------------

//Edit Sale National Schema
export const EditSaleNationalSchema = z.object({
    id: z.string(),
    load: z.string(),

    invoice: z.string().optional(),
    shipmentInvoice: z.date().optional(),
    salePrice: z.coerce.number().nonnegative("No puede ser negativo").optional(),
    profit: z.coerce.number().optional(),
});

//Module:Providers fees--------------------------------------------------------
export const CreateFeeSchema = z.object({

    loadId: z.string(),
    provider: z.string().min(1, "Selecciona un cliente"),
    cost: z.coerce.number().nonnegative("No puede ser negativo").default(0)

});

//delete schema provider
export const DeleteProviderSchema = z.object({
    id: z.string(),
});
