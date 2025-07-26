"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/store/store"
import { setSelectedCategory } from "@/store/slices/productsSlice"
import { Card, CardContent } from "@/components/ui/card"
import { Laptop, Mouse } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const categories = [
  {
    name: "Kompüterlər",
    value: "computers",
    icon: Laptop,
    description: "Laptop, desktop və iMac kompüterlər",
    color: "bg-blue-500/10 text-blue-600",
    count: 5,
  },
  {
    name: "Aksesuarlar",
    value: "accessories",
    icon: Mouse,
    description: "Siçan, klaviatura, monitor və digər aksesuarlar",
    color: "bg-green-500/10 text-green-600",
    count: 3,
  },
]

export default function CategoriesPage() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { products } = useSelector((state: RootState) => state.products)

  const handleCategoryClick = (categoryValue: string) => {
    dispatch(setSelectedCategory(categoryValue))
    router.push("/products")
  }

  const getCategoryCount = (categoryValue: string) => {
    return products.filter((product) => product.category === categoryValue).length
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Kateqoriyalar</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Geniş məhsul kateqoriyalarımızı kəşf edin və axtardığınız texnologiya məhsullarını tapın
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {categories.map((category) => {
          const Icon = category.icon
          const count = getCategoryCount(category.value)

          return (
            <Card
              key={category.value}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => handleCategoryClick(category.value)}
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${category.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-10 w-10" />
                </div>
                <h3 className="font-bold text-xl mb-2">{category.name}</h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <div className="text-sm text-primary font-medium">{count} məhsul mövcuddur</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Popular Products by Category */}
      <div className="space-y-12">
        {categories.map((category) => {
          const categoryProducts = products.filter((product) => product.category === category.value).slice(0, 3)

          if (categoryProducts.length === 0) return null

          return (
            <div key={category.value}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{category.name}</h2>
                <Link
                  href="/products"
                  onClick={() => dispatch(setSelectedCategory(category.value))}
                  className="text-primary hover:underline"
                >
                  Hamısını gör
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProducts.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <Card className="group hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-lg bg-muted/50 mb-4 group-hover:scale-105 transition-transform"
                        />
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-2xl font-bold">${product.price}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
