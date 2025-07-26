"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useParams } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/store/store"
import { addToCart } from "@/store/slices/cartSlice"
import { addToWishlist, removeFromWishlist } from "@/store/slices/wishlistSlice"
import { getCategoryBySlug } from "@/data/categories"
import { getProductsByCategory } from "@/data/products"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Grid3X3, List, ArrowLeft, Search, SlidersHorizontal, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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

const filterVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
}

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { toast } = useToast()
  const { scrollY } = useScroll()

  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist)
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  const category = getCategoryBySlug(params.slug as string)
  const allProducts = getProductsByCategory(params.slug as string)

  // Parallax effect for hero section
  const heroY = useTransform(scrollY, [0, 300], [0, -50])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Kateqoriya tapılmadı</h1>
          <Link href="/categories">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kateqoriyalara qayıt
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Filter products
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)

    return matchesSearch && matchesPrice && matchesBrand
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      case "rating":
        return b.rating - a.rating
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return b.isFeatured ? 1 : -1
    }
  })

  const handleAddToCart = (product: any) => {
    if (!isAuthenticated) {
      router.push(`/auth/login?redirect=/categories/${params.slug}`)
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
      title: "Səbətə əlavə edildi",
      description: `${product.name} səbətə əlavə edildi.`,
    })
  }

  const handleWishlistToggle = (productId: number) => {
    if (!isAuthenticated) {
      router.push(`/auth/login?redirect=/categories/${params.slug}`)
      return
    }

    if (wishlistItems.includes(productId)) {
      dispatch(removeFromWishlist(productId))
      toast({
        title: "İstək siyahısından silindi",
        description: "Məhsul istək siyahısından silindi.",
      })
    } else {
      dispatch(addToWishlist(productId))
      toast({
        title: "İstək siyahısına əlavə edildi",
        description: "Məhsul istək siyahısına əlavə edildi.",
      })
    }
  }

  const brands = [...new Set(allProducts.map((p) => p.brand))]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Kateqoriya yüklənir...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Parallax */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative py-16 lg:py-24 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${category.bgColor} mb-6`}
            >
              <div className="text-white text-2xl">{/* Icon would be rendered here based on category.icon */}📱</div>
            </motion.div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-4">{category.name}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">{category.description}</p>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {allProducts.length} məhsul
            </Badge>
          </motion.div>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.aside
            variants={filterVariants}
            initial="hidden"
            animate="visible"
            className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Filterlər</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("")
                      setPriceRange([0, 5000])
                      setSelectedBrands([])
                    }}
                  >
                    Təmizlə
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Axtarış</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Məhsul axtarın..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-4 block">
                      Qiymət aralığı: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <Slider value={priceRange} onValueChange={setPriceRange} max={5000} step={50} className="w-full" />
                  </div>

                  <Separator />

                  {/* Brands */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Brendlər</label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {brands.map((brand) => (
                        <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedBrands([...selectedBrands, brand])
                              } else {
                                setSelectedBrands(selectedBrands.filter((b) => b !== brand))
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-sm">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.aside>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
            >
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filterlər
                </Button>

                <p className="text-muted-foreground">{sortedProducts.length} məhsul tapıldı</p>
              </div>

              <div className="flex items-center gap-4">
                {/* View Mode */}
                <div className="flex items-center border rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Seçilmiş</SelectItem>
                    <SelectItem value="newest">Ən yeni</SelectItem>
                    <SelectItem value="price-low">Qiymət: Aşağıdan yuxarı</SelectItem>
                    <SelectItem value="price-high">Qiymət: Yuxarıdan aşağı</SelectItem>
                    <SelectItem value="name">Ad: A-Z</SelectItem>
                    <SelectItem value="rating">Reytinq</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* Products Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
            >
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <Link href={`/products/${product.slug}`}>
                          <motion.img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-64 object-cover cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          />
                        </Link>

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product.isNew && <Badge className="bg-green-500 hover:bg-green-600">Yeni</Badge>}
                          {product.discount && <Badge variant="destructive">-{product.discount}%</Badge>}
                        </div>

                        {/* Wishlist Button */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          className="absolute top-3 right-3"
                        >
                          <Button
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                            onClick={() => handleWishlistToggle(product.id)}
                          >
                            <Heart
                              className={`h-4 w-4 ${
                                wishlistItems.includes(product.id)
                                  ? "fill-red-500 text-red-500"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </Button>
                        </motion.div>

                        {/* Quick Add to Cart */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="absolute bottom-3 left-3 right-3"
                        >
                          <Button
                            className="w-full"
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.inStock}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {product.inStock ? "Səbətə əlavə et" : "Stokda yoxdur"}
                          </Button>
                        </motion.div>
                      </div>

                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs">
                            {product.brand}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-muted-foreground">
                              {product.rating} ({product.reviewCount})
                            </span>
                          </div>
                        </div>

                        <Link href={`/products/${product.slug}`}>
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">
                            {product.name}
                          </h3>
                        </Link>

                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.shortDescription}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-primary">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                          <Badge variant={product.inStock ? "default" : "secondary"}>
                            {product.inStock ? "Stokda" : "Stokda yox"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* No Products Found */}
            {sortedProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">Məhsul tapılmadı</h3>
                <p className="text-muted-foreground mb-4">Axtarış kriteriyalarınızı dəyişdirməyi cəhd edin</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setPriceRange([0, 5000])
                    setSelectedBrands([])
                  }}
                >
                  Filterləri təmizlə
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
