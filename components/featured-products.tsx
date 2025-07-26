"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, Loader2 } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/store/store"
import { addToCart } from "@/store/slices/cartSlice"
import { addToWishlist, removeFromWishlist } from "@/store/slices/wishlistSlice"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/hooks/useTranslation"
import { ProductSkeleton } from "@/components/loading-skeleton"
import { ImageWithFallback } from "@/components/image-with-fallback"
import { AnimatedLink } from "@/components/animated-link"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export function FeaturedProducts() {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingStates, setLoadingStates] = useState<{ [key: number]: boolean }>({})

  const dispatch = useDispatch<AppDispatch>()
  const { products } = useSelector((state: RootState) => state.products)
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist)
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const { toast } = useToast()
  const { t } = useTranslation()

  const featuredProducts = products.slice(0, 4)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      toast({
        title: t("loginRequired"),
        description: t("loginRequiredDesc"),
        variant: "destructive",
      })
      return
    }

    setLoadingStates((prev) => ({ ...prev, [product.id]: true }))

    setTimeout(() => {
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
      setLoadingStates((prev) => ({ ...prev, [product.id]: false }))
    }, 800)
  }

  const handleWishlistToggle = (productId: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

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
    <section className="py-16 animate-fade-in">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 animate-gradient-text">{t("featuredProducts")}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("featuredDescription")}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {isLoading
            ? [...Array(4)].map((_, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <ProductSkeleton />
                </motion.div>
              ))
            : featuredProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <Card className="group hover:shadow-lg transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                    <AnimatedLink href={`/products/${product.id}`} className="block">
                      <CardContent className="p-4">
                        <div className="relative mb-4 overflow-hidden rounded-lg">
                          <ImageWithFallback
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-48 object-cover bg-muted/50 transition-all duration-500 group-hover:scale-110"
                            fallbackText={product.name}
                          />
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute top-2 right-2 z-10"
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              className="bg-background/90 hover:bg-background transition-all duration-300 shadow-md"
                              onClick={(e) => handleWishlistToggle(product.id, e)}
                            >
                              <Heart
                                className={`h-4 w-4 transition-all duration-300 ${
                                  wishlistItems.includes(product.id)
                                    ? "fill-red-500 text-red-500 scale-110"
                                    : "text-muted-foreground hover:text-red-500"
                                }`}
                              />
                            </Button>
                          </motion.div>
                          {product.inStock && (
                            <Badge className="absolute top-2 left-2 animate-pulse" variant="secondary">
                              {t("inStock")}
                            </Badge>
                          )}
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-all duration-300">
                            {product.name}
                          </h3>

                          <div className="flex items-center space-x-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 transition-all duration-300 ${
                                    i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">(4.5)</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold animate-gradient-text">${product.price}</span>
                          </div>

                          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                        </div>
                      </CardContent>
                    </AnimatedLink>

                    <CardFooter className="p-4 pt-0">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                        <Button
                          className="w-full transition-all duration-300"
                          onClick={(e) => handleAddToCart(product, e)}
                          disabled={!product.inStock || loadingStates[product.id]}
                        >
                          {loadingStates[product.id] ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <ShoppingCart className="mr-2 h-4 w-4" />
                          )}
                          {product.inStock ? t("addToCart") : t("outOfStock")}
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <AnimatedLink href="/products">
            <Button variant="outline" size="lg" className="transition-all duration-300 bg-transparent">
              {t("viewAllProducts")}
            </Button>
          </AnimatedLink>
        </motion.div>
      </div>
    </section>
  )
}
