"use client"

import { useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function Change() {
  const { data, status } = useSession()

  if (status === "unauthenticated") {
    redirect("/")
  }

  const [username, setUsername] = useState("")
  const [error, setError] = useState("")

  const router = useRouter()

  const tryUpdate = async (e: FormEvent) => {
    e.preventDefault()

    const status = await fetch("/api/check", {
      method: "POST",
      body: JSON.stringify({ username }),
    }).then((res) => res.json())

    if (status === "free") {
      await fetch("/api/change", {
        method: "POST",
        body: JSON.stringify({ username, old: data?.user?.name }),
      })

      router.push("/")
    } else {
      setError("Username taken")
    }
  }

  return (
    <>
      <h1>Change Username</h1>

      <form onSubmit={tryUpdate}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />

        <button className="button">Try</button>
      </form>

      <p>{error}</p>
    </>
  )
}
