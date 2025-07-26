"use client"

import type React from "react"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { Star, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedLink } from "@/components/animated-link"
import { ImageWithFallback } from "@/components/image-with-fallback"
import { useTranslation } from "@/hooks/useTranslation"
import { useToast } from "@/hooks/use-toast"
import type { RootState, AppDispatch } from "@/store/store"
import { addToCart } from "@/store/slices/cartSlice"
import { addToWishlist, removeFromWishlist } from "@/store/slices/wishlistSlice"

export function FeaturedProducts() {
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useTranslation()
  const { toast } = useToast()

  const { products } = useSelector((state: RootState) => state.products)
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist)
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  const featuredProducts = products.slice(0, 8)

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

  const handleToggleWishlist = (product: any, e: React.MouseEvent) => {
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

    const isInWishlist = wishlistItems.includes(product.id)

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id))
      toast({
        title: t("removedFromWishlist"),
        description: t("removedFromWishlist"),
      })
    } else {
      dispatch(addToWishlist(product.id))
      toast({
        title: t("addedToWishlist"),
        description: t("addedToWishlist"),
      })
    }
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("featuredProducts")}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("featuredDescription")}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product, index) => {
            const isInWishlist = wishlistItems.includes(product.id)

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden">
                      <AnimatedLink href={`/products/${product.id}`}>
                        <ImageWithFallback
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          fallbackText={product.name}
                        />
                      </AnimatedLink>

                      {product.discount && (
                        <Badge className="absolute top-2 left-2 bg-destructive">-{product.discount}%</Badge>
                      )}

                      <Button
                        variant="ghost"
                        size="icon"
                        className={`absolute top-2 right-2 h-8 w-8 rounded-full transition-all duration-200 ${
                          isInWishlist
                            ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            : "bg-background/80 hover:bg-background"
                        }`}
                        onClick={(e) => handleToggleWishlist(product, e)}
                      >
                        <Heart className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`} />
                      </Button>
                    </div>

                    <div className="p-4">
                      <AnimatedLink href={`/products/${product.id}`}>
                        <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </AnimatedLink>

                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating || 4) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground ml-2">({product.reviews || 0})</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-lg">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                          )}
                        </div>

                        <Button
                          size="sm"
                          onClick={(e) => handleAddToCart(product, e)}
                          className="h-8 w-8 p-0"
                          disabled={!product.inStock}
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <AnimatedLink href="/products">
            <Button size="lg" variant="outline">
              {t("viewAllProducts")}
            </Button>
          </AnimatedLink>
        </motion.div>
      </div>
    </section>
  )
}
