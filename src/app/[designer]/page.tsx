import { prisma } from "@/lib/prisma"
import Link from "next/link"

interface Props {
  params: {
    designer: string
  }
}

export default async function Designer({ params }: Props) {
  const designer = await prisma.designer.findUnique({
    where: {
      slug: params.designer,
    },
    include: {
      lines: true,
    },
  })

  if (!designer) {
    throw Error("Designer not found")
  }

  return (
    <>
      <h1>{designer.name}</h1>

      <div>
        {designer.lines.map(({ name, slug }) => (
          <Link href={designer.slug + "/" + slug} key={slug}>
            <p>{name}</p>
          </Link>
        ))}
      </div>
    </>
  )
}
