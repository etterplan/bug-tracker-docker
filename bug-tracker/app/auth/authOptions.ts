import prisma from "@/prisma/client";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";


const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
          })
    ],
    callbacks: {
        session: async ({ session, token }) => {
            session.user && (session.user.id = token.sub!)
            return session
        },
      },
    session:{
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default authOptions;