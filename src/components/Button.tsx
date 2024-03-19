"use client"

import { signIn, signOut, useSession } from "next-auth/react"

export default function Button() {
  const { status } = useSession()

  return (
    <div className="ml-auto mr-2">
      {status === "authenticated" ? (
        <button onClick={() => signOut()} className="input">
          Sign Out
        </button>
      ) : (
        <button onClick={() => signIn()} className="input">
          Sign In
        </button>
      )}
    </div>
  )
}
