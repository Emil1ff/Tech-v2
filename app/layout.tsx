import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Provider } from "react-redux"
import { store } from "@/store/store"
import { AuthProvider } from "@/components/auth-provider"
import { PageTransition } from "@/components/page-transition"
import { RouteProgress } from "@/components/route-progress"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="az" suppressHydrationWarning>
      <body className={inter.className}>
        <Provider store={store}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <AuthProvider>
              <RouteProgress />
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                  <PageTransition>{children}</PageTransition>
                </main>
                <Footer />
              </div>
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
