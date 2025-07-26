"use client"

import { motion } from "framer-motion"
import { Smartphone, Laptop, Headphones, Watch, Tablet, Camera, Gamepad2, Monitor } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedLink } from "@/components/animated-link"
import { useTranslation } from "@/hooks/useTranslation"

const categories = [
  {
    id: 1,
    name: "Smartfonlar",
    icon: Smartphone,
    count: 156,
    color: "bg-blue-500",
    href: "/categories/smartphones",
  },
  {
    id: 2,
    name: "Laptoplar",
    icon: Laptop,
    count: 89,
    color: "bg-green-500",
    href: "/categories/laptops",
  },
  {
    id: 3,
    name: "Audio",
    icon: Headphones,
    count: 234,
    color: "bg-purple-500",
    href: "/categories/audio",
  },
  {
    id: 4,
    name: "Ağıllı Saatlar",
    icon: Watch,
    count: 67,
    color: "bg-orange-500",
    href: "/categories/watches",
  },
  {
    id: 5,
    name: "Tabletlər",
    icon: Tablet,
    count: 45,
    color: "bg-red-500",
    href: "/categories/tablets",
  },
  {
    id: 6,
    name: "Kameralar",
    icon: Camera,
    count: 78,
    color: "bg-pink-500",
    href: "/categories/cameras",
  },
  {
    id: 7,
    name: "Oyun",
    icon: Gamepad2,
    count: 123,
    color: "bg-indigo-500",
    href: "/categories/gaming",
  },
  {
    id: 8,
    name: "Monitorlar",
    icon: Monitor,
    count: 92,
    color: "bg-teal-500",
    href: "/categories/monitors",
  },
]

export function CategoryGrid() {
  const { t } = useTranslation()

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Kateqoriyalar</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Geniş məhsul çeşidimizi kateqoriyalar üzrə araşdırın
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <AnimatedLink href={category.href}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${category.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <category.icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>

                    <Badge variant="secondary" className="text-xs">
                      {category.count} məhsul
                    </Badge>
                  </CardContent>
                </Card>
              </AnimatedLink>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
