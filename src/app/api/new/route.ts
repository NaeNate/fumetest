import { s3 } from "@/lib/aws"
import { prisma } from "@/lib/prisma"
import { NewData } from "@/types"
import { Upload } from "@aws-sdk/lib-storage"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const data = Object.fromEntries(await req.formData()) as unknown as NewData

  if (
    !data.designerSlug ||
    !data.lineSlug ||
    !data.fragranceSlug ||
    !data.image
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    )
  }

  const path = `${data.designerSlug}/${data.lineSlug}/${data.fragranceSlug}`

  try {
    await prisma.$transaction(async (prisma) => {
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
        where: { slug: data.lineSlug },
      })

      if (!line) {
        line = await prisma.line.create({
          data: {
            name: data.line,
            slug: data.lineSlug,
            cover: path,
            designerId: designer.id,
          },
        })
      }

      await prisma.fragrance.create({
        data: {
          name: data.fragrance,
          slug: data.fragranceSlug,
          designerId: designer.id,
          lineId: line.id,
        },
      })
    })
  } catch (e) {
    console.log(e)

    return NextResponse.json(
      { error: "Internal server error (Postgres)" },
      { status: 500 },
    )
  }

  try {
    const upload = new Upload({
      client: s3,
      params: {
        Bucket: "fumetest",
        Key: path + ".webp",
        Body: data.image,
      },
    })

    upload.done()
  } catch (e) {
    console.log(e)

    return NextResponse.json(
      { error: "Internal server error (S3)" },
      { status: 500 },
    )
  }

  return NextResponse.json({ message: "Success" }, { status: 200 })
}
