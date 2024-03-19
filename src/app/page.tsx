"use client"

import { signIn } from "next-auth/react"

export default function Home() {
  return (
    <>
      <h1>Home</h1>

      <button onClick={() => signIn()}>Sign In</button>
    </>
  )
}
