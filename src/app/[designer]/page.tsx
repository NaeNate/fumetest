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
      <h1>{designer.name}</h1>

      <div>
        {designer.lines.map(({ name, slug, cover }) => (
          <Link href={designer.slug + "/" + slug} key={slug}>
            <Image
              src={pathToUrl(cover)}
              alt="Line Image"
              width={200}
              height={200}
            />

            <p>{name}</p>
          </Link>
        ))}
      </div>
    </>
  )
}
