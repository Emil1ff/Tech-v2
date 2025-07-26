"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, Truck } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/hooks/useTranslation"
import { HeroSkeleton } from "@/components/loading-skeleton"

export function HeroSection() {
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <HeroSkeleton />
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 animate-fade-in">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-right">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight animate-fade-in">
                {t("heroTitle")}
                <span className="text-primary block animate-gradient-text">{t("heroSubtitle")}</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg animate-fade-in" style={{ animationDelay: "200ms" }}>
                {t("heroDescription")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "400ms" }}>
              <Button asChild size="lg" className="text-lg px-8 group transition-all duration-300 hover:scale-105">
                <Link href="/products">
                  {t("shopNow")} <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 bg-transparent transition-all duration-300 hover:scale-105"
              >
                <Link href="/categories">{t("viewCategories")}</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              {[
                { icon: Zap, text: t("fastDelivery") },
                { icon: Shield, text: t("warranty") },
                { icon: Truck, text: t("freeShipping") },
              ].map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className="text-center animate-fade-in group cursor-pointer"
                    style={{ animationDelay: `${600 + index * 100}ms` }}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                      <Icon className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                    </div>
                    <p className="text-sm font-medium transition-colors group-hover:text-primary">{feature.text}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relative animate-slide-left">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8 transition-all duration-500 hover:scale-105">
              <img
                src="https://spacetup.com/cdn/shop/articles/SEOon_How_to_Create_the_Best_Gaming_Setup_e78e19bf-25c2-42aa-b210-349a89080cb7.jpg?v=1740978868&width=2048"
                alt={t("heroTitle")}
                className="w-full h-full object-contain rounded-xl transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary rounded-full flex items-center justify-center animate-bounce-slow">
              <span className="text-primary-foreground font-bold text-sm">YENİ</span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
