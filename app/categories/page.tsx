"use client"

import { motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/store/store"
import { setSelectedCategory } from "@/store/slices/productsSlice"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Laptop, Mouse, Smartphone, Headphones, Watch, Camera, Gamepad2, Monitor } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/hooks/useTranslation"

const categories = [
  {
    name: "Kompüterlər",
    value: "computers",
    icon: Laptop,
    description: "Laptop, desktop və iMac kompüterlər",
    color: "bg-blue-500/10 text-blue-600",
    count: 5,
    image: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/SPZ1B-Platinum-15-BB-00?qlt=90&wid=1253&hei=705&extendN=0.12,0.12,0.12,0.12&bgc=FFFFFFFF&fmt=jpg",
  },
  {
    name: "Aksesuarlar",
    value: "accessories",
    icon: Mouse,
    description: "Siçan, klaviatura, monitor və digər aksesuarlar",
    color: "bg-green-500/10 text-green-600",
    count: 3,
    image: "https://img5.lalafo.com/i/posters/api/c9/e7/d8/yeni-gaming-klaviatura-id-41595029-836567860.jpeg",
  },
  {
    name: "Smartfonlar",
    value: "smartphones",
    icon: Smartphone,
    description: "iPhone, Samsung, Xiaomi və digər smartfonlar",
    color: "bg-purple-500/10 text-purple-600",
    count: 8,
    image: "https://www.apple.com/ecc-shared/iphone/home/images/meta/iphone__kqge21l9n26q_og.png",
  },
  {
    name: "Audio",
    value: "audio",
    icon: Headphones,
    description: "Qulaqlıq, dinamik və audio aksesuarları",
    color: "bg-orange-500/10 text-orange-600",
    count: 6,
    image: "https://cdn.mos.cms.futurecdn.net/kbrdKHwjXBwSp9uiY8hejP.jpg",
  },
  {
    name: "Ağıllı Saatlar",
    value: "watches",
    icon: Watch,
    description: "Apple Watch, Samsung Galaxy Watch",
    color: "bg-red-500/10 text-red-600",
    count: 4,
    image: "https://www.apple.com/v/watch/br/images/overview/welcome/startframe__crid1brghxw2_xlarge.jpg",
  },
  {
    name: "Kameralar",
    value: "cameras",
    icon: Camera,
    description: "DSLR, mirrorless və action kameralar",
    color: "bg-pink-500/10 text-pink-600",
    count: 3,
    image: "https://cdn.mos.cms.futurecdn.net/4wpKrH93D37dDPTisdqGy4.jpg",
  },
  {
    name: "Oyun",
    value: "gaming",
    icon: Gamepad2,
    description: "Oyun konsolları, oyun aksesuarları",
    color: "bg-indigo-500/10 text-indigo-600",
    count: 7,
    image: "https://niceboy.eu/files/produkt/oryx-gamepad/oryx-gamepad-gallery-06.jpg",
  },
  {
    name: "Monitorlar",
    value: "monitors",
    icon: Monitor,
    description: "4K, gaming və professional monitorlar",
    color: "bg-teal-500/10 text-teal-600",
    count: 5,
    image: "https://www.hp.com/content/dam/sites/worldwide/personal-computers/consumer/monitors-accessories/computer-monitors-redesign/hero-banner-desktop@2x.jpg",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export default function CategoriesPage() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { products } = useSelector((state: RootState) => state.products)
  const { t } = useTranslation()

  const handleCategoryClick = (categoryValue: string) => {
    dispatch(setSelectedCategory(categoryValue))
    router.push("/products")
  }

  const getCategoryCount = (categoryValue: string) => {
    return products.filter((product) => product.category === categoryValue).length
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Kateqoriyalar
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Məhsul <span className="text-primary">Kateqoriyaları</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Geniş məhsul kateqoriyalarımızı kəşf edin və axtardığınız texnologiya məhsullarını tapın. Hər kateqoriyada
              ən yaxşı brendlərdən seçilmiş məhsullar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {categories.map((category, index) => {
              const Icon = category.icon
              const count = getCategoryCount(category.value) || category.count

              return (
                <motion.div key={category.value} variants={itemVariants}>
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div
                          className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${category.color} mb-2`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <Badge variant="secondary">{count} məhsul</Badge>
                      </div>
                      <p className="text-muted-foreground mb-4 text-sm">{category.description}</p>
                      <Button className="w-full" onClick={() => handleCategoryClick(category.value)}>
                        Kateqoriyaya Bax
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Popular Products by Category */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Populyar Məhsullar</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Hər kateqoriyadan ən çox satılan və populyar məhsullar
            </p>
          </motion.div>

          <div className="space-y-12">
            {categories.slice(0, 3).map((category, categoryIndex) => {
              const categoryProducts = products.filter((product) => product.category === category.value).slice(0, 3)

              if (categoryProducts.length === 0) return null

              return (
                <motion.div key={category.value} variants={itemVariants} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${category.color}`}>
                        <category.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-2xl font-bold">{category.name}</h3>
                    </div>
                    <Button variant="outline" onClick={() => handleCategoryClick(category.value)}>
                      Hamısını Gör
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryProducts.map((product) => (
                      <Link key={product.id} href={`/products/${product.id}`}>
                        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                          <CardContent className="p-4">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-48 object-cover rounded-lg bg-muted/50 mb-4 group-hover:scale-105 transition-transform"
                            />
                            <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                              {product.name}
                            </h4>
                            <div className="flex items-center justify-between">
                              <p className="text-2xl font-bold text-primary">${product.price}</p>
                              <Badge variant={product.inStock ? "default" : "secondary"}>
                                {product.inStock ? "Stokda" : "Stokda yox"}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
