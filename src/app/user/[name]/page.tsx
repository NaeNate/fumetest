import { prisma } from "@/lib/prisma"

interface Props {
  params: {
    name: string
  }
}

export default async function Name({ params }: Props) {
  const user = await prisma.user.findUnique({ where: { name: params.name } })

  if (!user) {
    throw Error("User not found")
  }

  return (
    <>
      <p>{user.id}</p>
    </>
  )
}
