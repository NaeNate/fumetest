import { prisma } from "@/lib/prisma"
import Link from "next/link"

interface Props {
  params: {
    line: string
  }
}

const getLine = async (slug: string) => {
  const line = await prisma.line.findUnique({
    where: {
      slug,
    },
    include: {
      fragrances: true,
    },
  })

  if (!line) {
    throw Error("Line not found")
  }

  return line
}

export const generateMetadata = async ({ params }: Props) => {
  const line = await getLine(params.line)

  return {
    title: line.name + " | Fumebank",
  }
}

export default async function Line({ params }: Props) {
  const line = await getLine(params.line)

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
