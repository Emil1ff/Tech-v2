"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, Star, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/store/store"
import { addToCart } from "@/store/slices/cartSlice"
import { addToWishlist, removeFromWishlist } from "@/store/slices/wishlistSlice"
import { useToast } from "@/hooks/use-toast"
import { AnimatedLink } from "@/components/animated-link"
import { ProductSkeleton } from "@/components/loading-skeleton"
import { ImageWithFallback } from "@/components/image-with-fallback"
import { useTranslation } from "@/hooks/useTranslation"

const featuredProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 1999,
    originalPrice: 2199,
    image: "https://www.w-t.az/storage/products/2023/09/s1MZksDn2S8ekn5ztsyhQYYvDGZWn6QwYt0PBp53-full.jpg",
    rating: 4.8,
    reviews: 124,
    category: "Telefon",
    isNew: true,
    discount: 9,
  },
  {
    id: 2,
    name: "MacBook Pro M3",
    price: 3499,
    originalPrice: 3799,
    image: "https://www.notebookcheck-tr.com/fileadmin/Notebooks/Apple/MacBook_Pro_14_2023_M3_Max/IMG_1008.JPG",
    rating: 4.9,
    reviews: 89,
    category: "Laptop",
    isNew: true,
    discount: 8,
  },
  {
    id: 3,
    name: "AirPods Pro 2",
    price: 449,
    originalPrice: 499,
    image: "https://www.apple.com/v/airpods-pro/m/images/meta/og__eui2mpgzwyaa_overview.png",
    rating: 4.7,
    reviews: 256,
    category: "Audio",
    isNew: false,
    discount: 10,
  },
  {
    id: 4,
    name: "iPad Air M2",
    price: 899,
    originalPrice: 999,
    image: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/ipad-air-11-inch-m2.png",
    rating: 4.6,
    reviews: 178,
    category: "Tablet",
    isNew: false,
    discount: 10,
  },
  {
    id: 5,
    name: "Apple Watch Series 9",
    price: 649,
    originalPrice: 699,
    image: "https://storage.irshad.az/products/88420/41mm-midnight.jpg",
    rating: 4.8,
    reviews: 203,
    category: "Saat",
    isNew: true,
    discount: 7,
  },
  {
    id: 6,
    name: "Samsung Galaxy S24",
    price: 1299,
    originalPrice: 1399,
    image: "https://m.media-amazon.com/images/I/61gyimiqfGL._UF1000,1000_QL80_.jpg",
    rating: 4.5,
    reviews: 145,
    category: "Telefon",
    isNew: false,
    discount: 7,
  },
]

export function FeaturedProducts() {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch<AppDispatch>()
  const { toast } = useToast()
  const { t } = useTranslation()

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleAddToCart = (product: (typeof featuredProducts)[0]) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      }),
    )

    toast({
      title: "Səbətə əlavə edildi",
      description: `${product.name} səbətə əlavə edildi`,
    })
  }

  const handleWishlistToggle = (product: (typeof featuredProducts)[0]) => {
    if (!isAuthenticated) {
      toast({
        title: "Giriş tələb olunur",
        description: "Bəyənilənlərə əlavə etmək üçün daxil olun",
        variant: "destructive",
      })
      return
    }

    const isInWishlist = wishlistItems.some((item) => item.id === product.id)

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id))
      toast({
        title: "Bəyənilənlərdən silindi",
        description: `${product.name} bəyənilənlərdən silindi`,
      })
    } else {
      dispatch(
        addToWishlist({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        }),
      )
      toast({
        title: "Bəyənilənlərə əlavə edildi",
        description: `${product.name} bəyənilənlərə əlavə edildi`,
      })
    }
  }

  if (isLoading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-muted animate-pulse rounded w-64 mx-auto mb-4" />
            <div className="h-4 bg-muted animate-pulse rounded w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Seçilmiş Məhsullar</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ən populyar və yüksək keyfiyyətli texnologiya məhsullarımızı kəşf edin
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => {
            const isInWishlist = wishlistItems.some((item) => item.id === product.id)

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.isNew && (
                          <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                            Yeni
                          </Badge>
                        )}
                        {product.discount > 0 && <Badge variant="destructive">-{product.discount}%</Badge>}
                      </div>

                      {/* Actions */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleWishlistToggle(product)
                          }}
                        >
                          <Heart
                            className={`h-4 w-4 transition-colors ${
                              isInWishlist ? "fill-red-500 text-red-500" : "text-muted-foreground"
                            }`}
                          />
                        </Button>

                        <AnimatedLink href={`/products/${product.id}`}>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </AnimatedLink>
                      </div>

                      {/* Quick Add to Cart */}
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          className="w-full"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleAddToCart(product)
                          }}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Səbətə əlavə et
                        </Button>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-muted-foreground">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                      </div>

                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-primary">{product.price} ₼</span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-muted-foreground line-through">
                              {product.originalPrice} ₼
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <AnimatedLink href="/products">
            <Button size="lg" variant="outline">
              Bütün Məhsulları Gör
            </Button>
          </AnimatedLink>
        </motion.div>
      </div>
    </section>
  )
}
