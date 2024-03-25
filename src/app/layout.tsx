import Nav from "@/components/Nav"
import Provider from "@/components/Provider"
import "@/styles/globals.css"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <html lang="en">
        <body>
          <Nav />
          <main>{children}</main>
        </body>
      </html>
    </Provider>
  )
}
