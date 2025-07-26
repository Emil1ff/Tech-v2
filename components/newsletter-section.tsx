"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast({
        title: "Abunə olundu!",
        description: "Xəbər bülletenimizə abunə olduğunuz üçün təşəkkür edirik.",
      })
      setEmail("")
    }
  }

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/10 mb-6">
            <Mail className="h-8 w-8" />
          </div>

          <h2 className="text-3xl font-bold mb-4">Xəbərlərdən Xəbərdar Olun</h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            Xəbər bülletenimizə abunə olun və yeni məhsullar, eksklüziv endirimlər və texnologiya məlumatları haqqında
            ilk öyrənin.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Email ünvanınızı daxil edin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              required
            />
            <Button type="submit" variant="secondary" className="px-8">
              Abunə Ol
            </Button>
          </form>

          <p className="text-sm text-primary-foreground/60 mt-4">
            Spam yoxdur, istənilən vaxt abunəlikdən çıxa bilərsiniz.
          </p>
        </div>
      </div>
    </section>
  )
}
