import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { username } = await req.json()

  const exist = await prisma.user.findFirst({
    where: {
      name: {
        equals: username,
        mode: "insensitive",
      },
    },
  })

  if (!exist) {
    return NextResponse.json("free")
  }

  return NextResponse.json("taken")
}
