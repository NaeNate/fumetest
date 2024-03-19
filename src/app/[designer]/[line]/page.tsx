import { prisma } from "@/lib/prisma"
import Link from "next/link"

interface Props {
  params: {
    line: string
  }
}

export default async function Line({ params }: Props) {
  const line = await prisma.line.findUnique({
    where: {
      slug: params.line,
    },
    include: {
      fragrances: true,
    },
  })

  if (!line) {
    throw Error("Line not found")
  }

  return (
    <>
      <h1>{line.name}</h1>

      <div>
        {line.fragrances.map(({ name, slug }) => (
          <Link href={line.slug + "/" + slug} key={slug}>
            <p>{name}</p>
          </Link>
        ))}
      </div>
    </>
  )
}
