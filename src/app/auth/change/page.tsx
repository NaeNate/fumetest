"use client"

import { useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function Change() {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")

  const router = useRouter()
  const { data, status } = useSession()

  if (status === "unauthenticated") {
    redirect("/")
  }

  const handleChange = async (e: FormEvent) => {
    e.preventDefault()

    const status = await fetch("/api/auth/check", {
      method: "POST",
      body: JSON.stringify({ username }),
    }).then((res) => res.status)

    if (status === 200) {
      await fetch("/api/auth/change", {
        method: "POST",
        body: JSON.stringify({ username, current: data!.user!.name }),
      })

      router.push("/")
    } else {
      setError("Username taken")
    }
  }

  return (
    <>
      <h1>Change Username</h1>

      <form onSubmit={handleChange}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          pattern="[a-zA-Z.]+"
          className="input"
        />

        <button>Change</button>
      </form>

      <p>{error}</p>
    </>
  )
}
