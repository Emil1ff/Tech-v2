"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Smartphone, Laptop, Headphones, Watch, Camera, Gamepad2 } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/hooks/useTranslation"
import { CategorySkeleton } from "@/components/loading-skeleton"

export function CategoryGrid() {
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const categories = [
    {
      name: t("smartphones"),
      icon: Smartphone,
      href: "/products?category=smartphones",
      color: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20",
    },
    {
      name: t("laptops"),
      icon: Laptop,
      href: "/products?category=computers",
      color: "bg-green-500/10 text-green-600 hover:bg-green-500/20",
    },
    {
      name: t("audio"),
      icon: Headphones,
      href: "/products?category=accessories",
      color: "bg-purple-500/10 text-purple-600 hover:bg-purple-500/20",
    },
    {
      name: t("wearables"),
      icon: Watch,
      href: "/products?category=accessories",
      color: "bg-orange-500/10 text-orange-600 hover:bg-orange-500/20",
    },
    {
      name: t("cameras"),
      icon: Camera,
      href: "/products?category=accessories",
      color: "bg-red-500/10 text-red-600 hover:bg-red-500/20",
    },
    {
      name: t("gaming"),
      icon: Gamepad2,
      href: "/products?category=accessories",
      color: "bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20",
    },
  ]

  return (
    <section className="py-16 bg-muted/30 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl font-bold mb-4 animate-gradient-text">{t("categoriesTitle")}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("categoriesDescription")}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {isLoading
            ? [...Array(6)].map((_, index) => <CategorySkeleton key={index} />)
            : categories.map((category, index) => {
                const Icon = category.icon
                return (
                  <Link key={category.name} href={category.href}>
                    <Card
                      className="group hover:shadow-lg transition-all duration-500 hover:-translate-y-2 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-6 text-center">
                        <div
                          className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 ${category.color}`}
                        >
                          <Icon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <h3 className="font-semibold text-sm transition-all duration-300 group-hover:text-primary group-hover:scale-105">
                          {category.name}
                        </h3>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
        </div>
      </div>
    </section>
  )
}
