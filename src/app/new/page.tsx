"use client"

import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"

export default function New() {
  const [fields, setFields] = useState({
    designer: "",
    designerSlug: "",
    line: "",
    lineSlug: "",
    fragrance: "",
    fragranceSlug: "",
  })

  const router = useRouter()

  const edit = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()

    await fetch("/api/new", {
      method: "POST",
      body: JSON.stringify(fields),
    })

    router.push(
      fields.designerSlug + "/" + fields.lineSlug + "/" + fields.fragranceSlug,
    )
  }

  return (
    <>
      <h1>New</h1>

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

        <button>Submit</button>
      </form>
    </>
  )
}
