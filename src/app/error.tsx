"use client"

import Link from "next/link"

export default function Error({ error }: { error: Error }) {
  return (
    <div className="text-center">
      <h1 className="text-4xl">Error</h1>
      <h2 className="mb-4 text-3xl">{error.message}</h2>

      <Link href={"/"} className="text-xl underline">
        Back Home
      </Link>
    </div>
  )
}
