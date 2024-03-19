import Nav from "@/components/Nav"
import "@/styles/globals.css"
import { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  )
}
