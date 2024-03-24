import { prisma } from "@/lib/prisma"
import { NewData } from "@/types"
import { slug } from "@/utils/slug"
import { put } from "@vercel/blob"
import { redirect } from "next/navigation"

export default function New() {
  async function submit(formData: FormData) {
    "use server"

    const raw = Object.fromEntries(formData) as unknown as NewData

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

    redirect(path)
  }

  return (
    <>
      <form action={submit}>
        <p>Designer</p>
        <input name="designer" className="input" />

        <p>Line</p>
        <input name="line" className="input" />

        <p>Fragrance</p>
        <input name="fragrance" className="input" />

        <p>Image</p>
        <input type="file" name="image" className="input" />

        <button className="button block">Submit</button>
      </form>
    </>
  )
}
