"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/store/store"
import { addToCart } from "@/store/slices/cartSlice"
import { addToWishlist, removeFromWishlist } from "@/store/slices/wishlistSlice"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, ArrowLeft, Check, ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useTranslation } from "@/hooks/useTranslation"

export default function ProductDetailPage() {
  const params = useParams()
  const productId = Number.parseInt(params.id as string)
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const dispatch = useDispatch<AppDispatch>()
  const { products } = useSelector((state: RootState) => state.products)
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist)
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const { toast } = useToast()
  const { t } = useTranslation()

  const product = products.find((p) => p.id === productId)

  if (!product) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Məhsul tapılmadı</h1>
          <Link href="/products">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Məhsullara qayıt
            </Button>
          </Link>
        </div>
      </motion.div>
    )
  }

  const handleAddToCart = () => {
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

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      toast({
        title: t("loginRequired"),
        description: t("loginRequiredDesc"),
        variant: "destructive",
      })
      return
    }

    if (wishlistItems.includes(product.id)) {
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

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <Link href="/products" className="text-muted-foreground hover:text-primary">
          {t("products")}
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <span className="capitalize">{product.category}</span>
        <span className="mx-2 text-muted-foreground">/</span>
        <span>{product.name}</span>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="aspect-square rounded-lg overflow-hidden bg-muted/50 relative">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <ImageIcon className="h-12 w-12 text-muted-foreground" />
                </motion.div>
              </div>
            )}

            {imageError ? (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <div className="text-center">
                  <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Şəkil yüklənə bilmədi</p>
                </div>
              </div>
            ) : (
              <motion.img
                src={`/placeholder.svg?height=600&width=600&text=${encodeURIComponent(product.name)}`}
                alt={product.name}
                className="w-full h-full object-cover"
                onLoad={handleImageLoad}
                onError={handleImageError}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: imageLoading ? 0 : 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="capitalize">
                {product.category}
              </Badge>
              {product.inStock && (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <Check className="mr-1 h-3 w-3" />
                  {t("inStock")}
                </Badge>
              )}
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-3xl font-bold mb-4"
            >
              {product.name}
            </motion.h1>

            {/* Rating */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-center space-x-2 mb-4"
            >
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(4.5) • 124 rəy</span>
            </motion.div>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mb-6"
            >
              <span className="text-4xl font-bold">${product.price}</span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="text-muted-foreground text-lg mb-6"
            >
              {product.description}
            </motion.p>
          </div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex gap-4"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={!product.inStock}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.inStock ? t("addToCart") : t("outOfStock")}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="outline" size="lg" onClick={handleWishlistToggle}>
                <Heart className={`h-5 w-5 ${wishlistItems.includes(product.id) ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </motion.div>
          </motion.div>

          <Separator />

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <h3 className="text-xl font-semibold mb-4">Xüsusiyyətlər</h3>
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
                      className="flex items-center"
                    >
                      <Check className="mr-3 h-4 w-4 text-green-600" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="grid grid-cols-2 gap-4 text-sm"
          >
            <div>
              <span className="font-medium">Çatdırılma:</span>
              <p className="text-muted-foreground">2-3 iş günü</p>
            </div>
            <div>
              <span className="font-medium">Zəmanət:</span>
              <p className="text-muted-foreground">2 il</p>
            </div>
            <div>
              <span className="font-medium">Qaytarma:</span>
              <p className="text-muted-foreground">30 gün</p>
            </div>
            <div>
              <span className="font-medium">Dəstək:</span>
              <p className="text-muted-foreground">24/7</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
