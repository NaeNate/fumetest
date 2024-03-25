import Buttons from "@/components/Buttons"
import Link from "next/link"

export default function Nav() {
  return (
    <nav className="mb-4 flex h-20 items-center bg-slate-400">
      <Link href={"/"} className="ml-4 text-3xl">
        Fumebank
      </Link>

      <Buttons />
    </nav>
  )
}
