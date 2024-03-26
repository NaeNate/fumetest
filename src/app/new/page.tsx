import { redirect } from "next/navigation"

export default function New() {
  const handleNew = async (formData: FormData) => {
    "use server"

    const { path } = await fetch("http://localhost:3000/api/new", {
      method: "POST",
      body: formData,
    }).then((res) => res.json())

    redirect(path)
  }

  return (
    <>
      <form action={handleNew}>
        <p>Designer</p>
        <input name="designer" className="input" />

        <p>Line</p>
        <input name="line" className="input" />

        <p>Fragrance</p>
        <input name="fragrance" className="input" />

        <p>Image</p>
        <input type="file" name="image" className="input" />

        <button className="button">Submit</button>
      </form>
    </>
  )
}
