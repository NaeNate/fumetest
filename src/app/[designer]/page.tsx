import { prisma } from "@/lib/prisma"
import { pathToUrl } from "@/utils/pathToUrl"
import Image from "next/image"
import Link from "next/link"

interface Props {
  params: {
    designer: string
  }
}
export default async function Designer({ params }: Props) {
  const designer = await prisma.designer.findUnique({
    where: { slug: params.designer },
    include: { lines: true },
  })

  if (!designer) throw Error("Designer not found")

  return (
    <>
      <h1 className="text-center text-3xl">{designer.name}</h1>

      <div className="m-4 flex text-center">
        {designer.lines.map(({ name, slug, cover }) => (
          <Link
            href={designer.slug + "/" + slug}
            key={slug}
            className="rounded bg-slate-200"
          >
            <Image
              src={pathToUrl(cover)}
              alt="Line Image"
              width={200}
              height={200}
            />

            <p className="m-2 text-lg">{name}</p>
          </Link>
        ))}
      </div>
    </>
  )
}
