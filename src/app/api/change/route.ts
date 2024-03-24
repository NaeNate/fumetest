import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { username, old } = await req.json()

  await prisma.user.update({
    where: { name: old },
    data: {
      name: username,
    },
  })

  return NextResponse.json("Done")
}
