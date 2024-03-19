import { prisma } from "@/lib/prisma"

interface Props {
  params: {
    designer: string
    line: string
    fragrance: string
  }
}

export default async function Fragrance({ params }: Props) {
  const fragrance = await prisma.fragrance.findFirstOrThrow({
    where: {
      designer: {
        slug: params.designer,
      },
      line: {
        slug: params.line,
      },
      slug: params.fragrance,
    },
  })

  return (
    <>
      <h1>{fragrance.name}</h1>
    </>
  )
}
