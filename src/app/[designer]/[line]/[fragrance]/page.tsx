import { prisma } from "@/lib/prisma"
import Link from "next/link"

interface Props {
  params: {
    designer: string
    line: string
    fragrance: string
  }
}

export default async function Fragrance({ params }: Props) {
  const fragrance = await prisma.fragrance.findFirst({
    where: {
      designer: {
        slug: params.designer,
      },
      line: {
        slug: params.line,
      },
      slug: params.fragrance,
    },
    include: {
      designer: true,
      line: true,
    },
  })

  if (!fragrance) {
    throw Error("Fragrance not found")
  }

  return (
    <>
      <h1>{fragrance.name}</h1>

      <p>
        Designer:{" "}
        <Link href={"/" + fragrance.designer.slug} prefetch>
          {fragrance.designer.name}
        </Link>
      </p>

      <p>
        Line:{" "}
        <Link
          href={"/" + fragrance.designer.slug + "/" + fragrance.line.slug}
          prefetch
        >
          {fragrance.line.name}
        </Link>
      </p>
    </>
  )
}
