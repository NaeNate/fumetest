"use client"

import { signIn, signOut, useSession } from "next-auth/react"

export default function Button() {
  const { status } = useSession()

  return (
    <div className="ml-auto mr-4">
      {status === "authenticated" ? (
        <button
          onClick={() => signOut()}
          className="rounded bg-slate-500 p-3 text-white"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={() => signIn()}
          className="rounded bg-slate-500 p-3 text-white"
        >
          Sign In
        </button>
      )}
    </div>
  )
}
