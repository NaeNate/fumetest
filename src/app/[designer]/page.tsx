import { prisma } from "@/lib/prisma"
import Link from "next/link"

interface Props {
  params: {
    designer: string
  }
}

const getDesigner = async (slug: string) => {
  const designer = await prisma.designer.findUnique({
    where: {
      slug,
    },
    include: {
      lines: true,
    },
  })

  if (!designer) {
    throw Error("Designer not found")
  }

  return designer
}

export const generateMetadata = async ({ params }: Props) => {
  const designer = await getDesigner(params.designer)

  return {
    title: designer.name + " | Fumebank",
  }
}

export default async function Designer({ params }: Props) {
  const designer = await getDesigner(params.designer)

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
