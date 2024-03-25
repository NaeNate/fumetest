import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { username, current } = await req.json()

  await prisma.user.update({
    where: { name: current },
    data: { name: username },
  })

  return NextResponse.json({}, { status: 200 })
}
