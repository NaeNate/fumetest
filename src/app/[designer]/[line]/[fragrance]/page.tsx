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
      <h1>{fragrance.name}</h1>

      <div>
        <div>
          <Image
            src={pathToUrl(
              `${fragrance.designer.slug}/${fragrance.line.slug}/${fragrance.slug}`,
            )}
            alt="Image"
            width={400}
            height={400}
          />
        </div>

        <div>
          <p>
            Designer:{" "}
            <Link href={"/" + fragrance.designer.slug}>
              {fragrance.designer.name}
            </Link>
          </p>

          <p>
            Line:{" "}
            <Link
              href={"/" + fragrance.designer.slug + "/" + fragrance.line.slug}
            >
              {fragrance.line.name}
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
