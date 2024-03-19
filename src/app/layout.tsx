import AuthProvider from "@/components/AuthProvider"
import Nav from "@/components/Nav"
import "@/styles/globals.css"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Nav />
          <main>{children}</main>
        </body>
      </html>
    </AuthProvider>
  )
}
