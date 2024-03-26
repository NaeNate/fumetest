import { prisma } from "@/lib/prisma"
import { slug } from "@/utils/slug"
import { put } from "@vercel/blob"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const raw = Object.fromEntries(await req.formData()) as any

  const data = {
    ...raw,
    dSlug: slug(raw.designer),
    lSlug: slug(raw.line),
    fSlug: slug(raw.fragrance),
  }

  const path = `${data.dSlug}/${data.lSlug}/${data.fSlug}`

  await prisma.$transaction(async (prisma) => {
    let designer = await prisma.designer.findUnique({
      where: { slug: data.dSlug },
    })

    if (!designer) {
      designer = await prisma.designer.create({
        data: { name: data.designer, slug: data.dSlug },
      })
    }

    let line = await prisma.line.findUnique({
      where: { slug: data.lSlug },
    })

    if (!line) {
      line = await prisma.line.create({
        data: {
          name: data.line,
          slug: data.lSlug,
          cover: path,
          designerId: designer.id,
        },
      })
    }

    await prisma.fragrance.create({
      data: {
        name: data.fragrance,
        slug: data.fSlug,
        designerId: designer.id,
        lineId: line.id,
      },
    })
  })

  await put(path + ".webp", data.image, {
    access: "public",
    addRandomSuffix: false,
  })

  return NextResponse.json({ path: path }, { status: 200 })
}
