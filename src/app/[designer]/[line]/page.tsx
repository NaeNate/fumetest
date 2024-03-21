import { prisma } from "@/lib/prisma"
import Image from "next/image"
import Link from "next/link"

interface Props {
  params: {
    line: string
  }
}

const getLine = async (slug: string) => {
  const line = await prisma.line.findUnique({
    where: { slug },
    include: { designer: true, fragrances: true },
  })

  if (!line) throw Error("Line not found")

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
      <h1 className="text-center text-3xl">{line.name}</h1>

      <div className="m-4 flex gap-4 text-center">
        {line.fragrances.map(({ name, slug }) => (
          <Link
            href={line.slug + "/" + slug}
            key={slug}
            className="rounded bg-slate-200"
          >
            <Image
              src={`https://fumetest.s3.us-east-2.amazonaws.com/${line.designer.slug}/${line.slug}/${slug}.webp`}
              alt="Fragrance Image"
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
