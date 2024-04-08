import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { db } from "@/lib/db"
import authConfig from "@/lib/auth.config"
import { getUserByID } from "@/data/user"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      };

      if (token.admin && session.user) {
        session.user.admin = token.admin as boolean;
      };

      if (token.loads && session.user) {
        session.user.loads = token.loads as boolean;
      };

      if (token.finances && session.user) {
        session.user.finances = token.finances as boolean;
      };

      if (token.quotes && session.user) {
        session.user.quotes = token.quotes as boolean;
      };

      if (token.sales && session.user) {
        session.user.sales = token.sales as boolean;
      };

      if (token.billing && session.user) {
        session.user.billing = token.billing as boolean;
      };

      if (token.contacts && session.user) {
        session.user.contacts = token.contacts as boolean;
      };

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }
      const existingUser = await getUserByID(token.sub);

      if (!existingUser) {
        return token;
      }

      token.name = existingUser.name
      token.email = existingUser.email

      token.admin = existingUser.admin;
      token.loads = existingUser.loads
      token.finances = existingUser.finances;
      token.quotes = existingUser.quotes;
      token.sales = existingUser.sales;
      token.billing = existingUser.billing;
      token.contacts = existingUser.contacts;



      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})