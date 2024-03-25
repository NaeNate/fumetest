"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"

export default function Buttons() {
  const { data, status } = useSession()

  return (
    <div className="ml-auto mr-4">
      {status === "authenticated" ? (
        <div className="flex">
          <button onClick={() => signOut()} className="button">
            Sign Out
          </button>
          <Link
            href={"/user/" + data.user?.name?.toLowerCase()}
            className="ml-4 block h-12 w-12 rounded-full bg-slate-600"
          />
        </div>
      ) : (
        <button onClick={() => signIn()} className="button">
          Sign In
        </button>
      )}
    </div>
  )
}
