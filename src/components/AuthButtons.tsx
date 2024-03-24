"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"

export default function AuthButtons() {
  const { status, data } = useSession()

  return (
    <div className="ml-auto mr-4">
      {status === "authenticated" ? (
        <>
          <button onClick={() => signOut()} className="button">
            Sign Out
          </button>

          <Link
            href={"/user/" + data.user?.name?.toLowerCase()}
            className="button"
          >
            User Dashboard
          </Link>
        </>
      ) : (
        <button onClick={() => signIn()} className="button">
          Sign In
        </button>
      )}
    </div>
  )
}
