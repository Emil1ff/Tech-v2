import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "@/components/providers"
import { AuthProvider } from "@/components/auth-provider"
import { PageTransition } from "@/components/page-transition"
import { RouteProgress } from "@/components/route-progress"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TechStore - Ən Son Texnologiya Məhsulları",
  description:
    "Top brendlərdən ən son texnologiya məhsullarını kəşf edin. Keyfiyyət zəmanəti, sürətli çatdırılma və mükəmməl müştəri xidməti.",
  keywords: "texnologiya, elektronika, kompüter, telefon, laptop, aksesuar",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="az" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
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
        </Providers>
      </body>
    </html>
  )
}
