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
    href: "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-geo-240909_inline.jpg.large.jpg",
  },
  {
    id: 2,
    name: "Laptoplar",
    icon: Laptop,
    count: 89,
    color: "bg-green-500",
    href: "https://www.noutbuklar.az/wp-content/uploads/2024/02/309.jpg",
  },
  {
    id: 3,
    name: "Audio",
    icon: Headphones,
    count: 234,
    color: "bg-purple-500",
    href: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MQTQ3?wid=2754&hei=4115&fmt=jpeg&qlt=90&.v=1741643688229",
  },
  {
    id: 4,
    name: "Ağıllı Saatlar",
    icon: Watch,
    count: 67,
    color: "bg-orange-500",
    href: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MXM23ref_FV99_VW_34FR+watch-case-46-aluminum-jetblack-nc-s10_VW_34FR+watch-face-46-aluminum-jetblack-s10_VW_34FR?wid=752&hei=720&bgc=fafafa&trim=1&fmt=p-jpg&qlt=80&.v=TnVrdDZWRlZzTURKbHFqOGh0dGpVRW5TeWJ6QW43NUFnQ2V4cmRFc1VnYUdWejZ5THhpKzJwRmRDYlhxN2o5aXB2QjR6TEZ4ZThxM3VqYkZobmlXM3RGNnlaeXQ4NGFKQTAzc0NGeHR2aVk0VEhOZEFKYmY1ZHNpalQ3YVhOWk9WVlBjZVFuazArV21YaFcvTVJ5dzR2eDMxaWg4TFhITTVrUW41Z084dENpYmZuSTdFUnErS0g3SWYxazQrNDdyRzE3K0tORmZaUy9vOVdqTEp2dmJNL3gwYlE3R0w4Z1RCbG9qQTd1MjYyL1owaE5aVCt2Ri82aDRacTg0bXlaZA",
  },
  {
    id: 5,
    name: "Tabletlər",
    icon: Tablet,
    count: 45,
    color: "bg-red-500",
    href: "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25446398/iPadAirFront.jpg?quality=90&strip=all&crop=16.666666666667%2C0%2C66.666666666667%2C100&w=2400",
  },
  {
    id: 6,
    name: "Kameralar",
    icon: Camera,
    count: 78,
    color: "bg-pink-500",
    href: "https://cdn.mos.cms.futurecdn.net/4wpKrH93D37dDPTisdqGy4.jpg",
  },
  {
    id: 7,
    name: "Oyun",
    icon: Gamepad2,
    count: 123,
    color: "bg-indigo-500",
    href: "https://niceboy.eu/files/produkt/oryx-gamepad/oryx-gamepad-gallery-06.jpg",
  },
  {
    id: 8,
    name: "Monitorlar",
    icon: Monitor,
    count: 92,
    color: "bg-teal-500",
    href: "https://www.hp.com/content/dam/sites/worldwide/personal-computers/consumer/monitors-accessories/computer-monitors-redesign/hero-banner-desktop@2x.jpg",
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
