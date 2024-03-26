import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"

interface Props {
  params: {
    name: string
  }
}

export default async function Name({ params }: Props) {
  const session = await getServerSession(authOptions)

  const user = await prisma.user.findFirst({
    where: {
      name: {
        equals: params.name,
        mode: "insensitive",
      },
    },
  })

  if (!user) throw Error("User not found")

  return (
    <>
      <h1>{user.name}</h1>
      <p>ID: {user.id}</p>

      <p>
        {session?.user?.name?.toLowerCase() === params.name ? "You" : "NOT YOU"}
      </p>
    </>
  )
}
