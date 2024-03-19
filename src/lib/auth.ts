import { prisma } from "@/lib/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { AuthOptions } from "next-auth"
import Email from "next-auth/providers/email"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Email({
      server: process.env.SERVER,
      from: process.env.FROM,
    }),
  ],
}
