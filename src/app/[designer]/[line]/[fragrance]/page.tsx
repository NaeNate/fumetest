import { prisma } from "@/lib/prisma"
import Image from "next/image"
import Link from "next/link"

interface Props {
  params: {
    designer: string
    line: string
    fragrance: string
  }
}

const getFragrance = async (params: Props["params"]) => {
  const fragrance = await prisma.fragrance.findFirst({
    where: {
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

  return fragrance
}

export const generateMetadata = async ({ params }: Props) => {
  const fragrance = await getFragrance(params)

  return {
    title: fragrance.name + " | Fumebank",
  }
}

export default async function Fragrance({ params }: Props) {
  const fragrance = await getFragrance(params)

  return (
    <>
      <h1 className="mb-4 text-center text-3xl">{fragrance.name}</h1>

      <div className="mx-4 flex gap-4">
        <div className="flex w-full items-center justify-center rounded bg-slate-200">
          <Image
            src={`https://fumetest.s3.us-east-2.amazonaws.com/${fragrance.designer.slug}/${fragrance.line.slug}/${fragrance.slug}.webp`}
            alt="Image"
            width={400}
            height={400}
          />
        </div>

        <div className="w-full rounded bg-slate-200 p-3 text-center text-lg">
          <p>
            Designer:{" "}
            <Link
              href={"/" + fragrance.designer.slug}
              prefetch
              className="underline"
            >
              {fragrance.designer.name}
            </Link>
          </p>

          <p>
            Line:{" "}
            <Link
              href={"/" + fragrance.designer.slug + "/" + fragrance.line.slug}
              prefetch
              className="underline"
            >
              {fragrance.line.name}
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
