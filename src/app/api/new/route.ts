import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const data = await req.json()

  const result = await prisma.$transaction(async (prisma) => {
    let designer = await prisma.designer.findUnique({
      where: { slug: data.designerSlug },
    })

    if (!designer) {
      designer = await prisma.designer.create({
        data: {
          name: data.designer,
          slug: data.designerSlug,
        },
      })
    }

    let line = await prisma.line.findUnique({
      where: {
        slug: data.lineSlug,
      },
    })

    if (!line) {
      line = await prisma.line.create({
        data: {
          name: data.line,
          slug: data.lineSlug,
          designerId: designer.id,
        },
      })
    }

    const fragrance = await prisma.fragrance.create({
      data: {
        name: data.fragrance,
        slug: data.fragranceSlug,
        designerId: designer.id,
        lineId: line.id,
      },
    })

    return { designer, line, fragrance }
  })

  return NextResponse.json(result)
}
