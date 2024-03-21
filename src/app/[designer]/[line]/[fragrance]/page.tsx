import { prisma } from "@/lib/prisma"
import { pathToUrl } from "@/utils/pathToUrl"
import Image from "next/image"
import Link from "next/link"

interface Props {
  params: {
    line: string
    fragrance: string
  }
}

export default async function Fragrance({ params }: Props) {
  const fragrance = await prisma.fragrance.findFirst({
    where: {
      line: { slug: params.line },
      slug: params.fragrance,
    },
    include: { designer: true, line: true },
  })

  if (!fragrance) throw Error("Fragrance not found")

  return (
    <>
      <h1 className="mb-4 text-center text-3xl">{fragrance.name}</h1>

      <div className="mx-4 flex gap-4">
        <div className="flex w-full items-center justify-center rounded bg-slate-200">
          <Image
            src={pathToUrl(
              `${fragrance.designer.slug}/${fragrance.line.slug}/${fragrance.slug}`,
            )}
            alt="Image"
            width={400}
            height={400}
          />
        </div>

        <div className="w-full rounded bg-slate-200 p-3 text-center text-lg">
          <p>
            Designer:{" "}
            <Link href={"/" + fragrance.designer.slug} className="underline">
              {fragrance.designer.name}
            </Link>
          </p>

          <p>
            Line:{" "}
            <Link
              href={"/" + fragrance.designer.slug + "/" + fragrance.line.slug}
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
