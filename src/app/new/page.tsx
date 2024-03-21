"use client"

import { useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"

export default function New() {
  const { status, data } = useSession()

  if (status === "unauthenticated") {
    console.log(status, data)
    redirect("/api/auth/signin")
  }

  const [fields, setFields] = useState({
    designer: "",
    designerSlug: "",
    line: "",
    lineSlug: "",
    fragrance: "",
    fragranceSlug: "",
    image: undefined,
  })

  const router = useRouter()

  const edit = (e: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target

    if (name === "image") {
      value = e.target.files![0] as any
    }

    setFields((prev) => ({ ...prev, [name]: value }))
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()

    const data = new FormData()
    Object.entries(fields).forEach(([key, value]) => data.append(key, value!))

    await fetch("/api/new", {
      method: "POST",
      body: data,
    })

    router.push(
      `${fields.designerSlug}/${fields.lineSlug}/${fields.fragranceSlug}`,
    )
  }

  return (
    <>
      <form onSubmit={submit}>
        <p>Designer</p>
        <input
          name="designer"
          value={fields.designer}
          onChange={edit}
          className="input"
        />

        <p>Designer Slug</p>
        <input
          name="designerSlug"
          value={fields.designerSlug}
          onChange={edit}
          className="input"
        />

        <p>Line</p>
        <input
          name="line"
          value={fields.line}
          onChange={edit}
          className="input"
        />

        <p>Line Slug</p>
        <input
          name="lineSlug"
          value={fields.lineSlug}
          onChange={edit}
          className="input"
        />

        <p>Fragrance</p>
        <input
          name="fragrance"
          value={fields.fragrance}
          onChange={edit}
          className="input"
        />

        <p>Fragrance Slug</p>
        <input
          name="fragranceSlug"
          value={fields.fragranceSlug}
          onChange={edit}
          className="input"
        />

        <label
          htmlFor="image"
          className="input block w-min hover:cursor-pointer"
        >
          Image
        </label>
        <input type="file" id="image" name="image" onChange={edit} hidden />

        <button className="rounded bg-slate-500 p-3 text-white">Submit</button>
      </form>
    </>
  )
}
