import NextAuth, { DefaultSession } from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
    admin: boolean;
    loads: boolean;
    finances: boolean;
    quotes: boolean;
    sales: boolean;
    billing: boolean;
    contacts: boolean;
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}
