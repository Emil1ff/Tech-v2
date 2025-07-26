"use client"

import { motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/store/store"
import { setSelectedCategory } from "@/store/slices/productsSlice"
import { addToCart } from "@/store/slices/cartSlice"
import { addToWishlist, removeFromWishlist } from "@/store/slices/wishlistSlice"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/hooks/useTranslation"
import { AnimatedLink } from "@/components/animated-link"

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

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { filteredProducts, selectedCategory } = useSelector((state: RootState) => state.products)
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist)
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const { toast } = useToast()
  const { t } = useTranslation()

  const categories = [
    { value: "all", label: t("categoriesTitle") },
    { value: "computers", label: t("computers") },
    { value: "accessories", label: t("accessories") },
  ]

  const handleAddToCart = (product: any) => {
    if (!isAuthenticated) {
      toast({
        title: t("loginRequired"),
        description: t("loginRequiredDesc"),
        variant: "destructive",
      })
      return
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      }),
    )
    toast({
      title: t("addedToCart"),
      description: `${product.name} ${t("addedToCart").toLowerCase()}.`,
    })
  }

  const handleWishlistToggle = (productId: number) => {
    if (!isAuthenticated) {
      toast({
        title: t("loginRequired"),
        description: t("loginRequiredDesc"),
        variant: "destructive",
      })
      return
    }

    if (wishlistItems.includes(productId)) {
      dispatch(removeFromWishlist(productId))
      toast({
        title: t("removedFromWishlist"),
        description: t("removedFromWishlist"),
      })
    } else {
      dispatch(addToWishlist(productId))
      toast({
        title: t("addedToWishlist"),
        description: t("addedToWishlist"),
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">{t("products")}</h1>
        <p className="text-muted-foreground text-lg mb-6">Ən son texnologiya məhsullarını kəşf edin</p>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.value}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Button
                variant={selectedCategory === category.value ? "default" : "outline"}
                onClick={() => dispatch(setSelectedCategory(category.value))}
                className="transition-all duration-300 hover:scale-105"
              >
                {category.label}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredProducts.map((product, index) => (
          <motion.div key={product.id} variants={itemVariants}>
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <AnimatedLink href={`/products/${product.id}`}>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg bg-muted/50 cursor-pointer transition-all duration-500 group-hover:scale-110"
                    />
                  </AnimatedLink>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                      onClick={() => handleWishlistToggle(product.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          wishlistItems.includes(product.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                  </motion.div>
                  {product.inStock && (
                    <Badge className="absolute top-2 left-2" variant="secondary">
                      {t("inStock")}
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                  <AnimatedLink href={`/products/${product.id}`}>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors cursor-pointer">
                      {product.name}
                    </h3>
                  </AnimatedLink>

                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">(4.5)</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">${product.price}</span>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                  <Button className="w-full" onClick={() => handleAddToCart(product)} disabled={!product.inStock}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {product.inStock ? t("addToCart") : t("outOfStock")}
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <p className="text-muted-foreground text-lg">Heç bir məhsul tapılmadı.</p>
        </motion.div>
      )}
    </motion.div>
  )
}
