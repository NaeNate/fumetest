import { prisma } from "@/lib/prisma"
import { pathToUrl } from "@/utils/pathToUrl"
import Image from "next/image"
import Link from "next/link"

interface Props {
  params: {
    line: string
  }
}

export default async function Line({ params }: Props) {
  const line = await prisma.line.findUnique({
    where: { slug: params.line },
    include: { designer: true, fragrances: true },
  })

  if (!line) throw Error("Line not found")

  return (
    <>
      <h1>{line.name}</h1>

      <div>
        {line.fragrances.map(({ name, slug }) => (
          <Link href={line.slug + "/" + slug} key={slug}>
            <Image
              src={pathToUrl(`${line.designer.slug}/${line.slug}/${slug}`)}
              alt="Fragrance Image"
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
