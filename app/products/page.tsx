"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Grid3X3, List, Star, Heart, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { products, getFeaturedProducts, getNewProducts, type Product } from "@/data/products"
import { getCategoriesWithProductCounts } from "@/data/categories"
import { useTranslation } from "@/hooks/useTranslation"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "@/store/slices/cartSlice"
import { addToWishlist, removeFromWishlist } from "@/store/slices/wishlistSlice"
import type { RootState } from "@/store/store"
import Link from "next/link"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.3 },
  },
}

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { toast } = useToast()
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)

  const categoriesWithCounts = getCategoriesWithProductCounts()
  const brands = [...new Set(products.map((p) => p.brand))].sort()

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products

    // Tab filtering
    if (activeTab === "featured") {
      filtered = getFeaturedProducts()
    } else if (activeTab === "new") {
      filtered = getNewProducts()
    } else if (activeTab === "categories") {
      filtered = selectedCategory !== "all" ? filtered.filter((p) => p.category === selectedCategory) : filtered
    }

    // Search filtering
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.nameEn.toLowerCase().includes(query) ||
          product.nameRu.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Category filtering (for main filter, not tab)
    if (selectedCategory !== "all" && activeTab !== "categories") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Price filtering
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Brand filtering
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) => selectedBrands.includes(product.brand))
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default: // featured
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
    }

    return filtered
  }, [searchQuery, selectedCategory, priceRange, selectedBrands, sortBy, activeTab])

  const handleAddToCart = (product: Product) => {
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
      title: t("addedToCart"),
      description: `${product.name} ${t("addedToCartDesc")}`,
    })
  }

  const handleToggleWishlist = (product: Product) => {
    const isInWishlist = wishlistItems.some((item) => item.id === product.id)

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id))
      toast({
        title: t("removedFromWishlist"),
        description: `${product.name} ${t("removedFromWishlistDesc")}`,
      })
    } else {
      dispatch(
        addToWishlist({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          rating: product.rating,
        }),
      )
      toast({
        title: t("addedToWishlist"),
        description: `${product.name} ${t("addedToWishlistDesc")}`,
      })
    }
  }

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const ProductCard = ({ product }: { product: Product }) => {
    const isInWishlist = wishlistItems.some((item) => item.id === product.id)

    return (
      <motion.div variants={cardVariants} initial="hidden" animate="visible" exit="exit" layout>
        <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-background/50 backdrop-blur">
          <div className="relative overflow-hidden">
            <div className="aspect-square relative">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.isNew && <Badge className="bg-green-500 hover:bg-green-600">{t("new")}</Badge>}
                {product.discount && <Badge variant="destructive">-{product.discount}%</Badge>}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 bg-background/80 backdrop-blur"
                  onClick={() => handleToggleWishlist(product)}
                >
                  <Heart className={`h-4 w-4 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Link href={`/products/${product.slug}`}>
                  <Button size="icon" variant="secondary" className="h-8 w-8 bg-background/80 backdrop-blur">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Quick Add to Cart */}
              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button className="w-full" size="sm" onClick={() => handleAddToCart(product)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {t("addToCart")}
                </Button>
              </div>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
              </div>

              <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">{product.name}</h3>

              <p className="text-sm text-muted-foreground">{product.brand}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                  )}
                </div>
                {product.inStock ? (
                  <Badge variant="secondary" className="text-green-600">
                    {t("inStock")}
                  </Badge>
                ) : (
                  <Badge variant="destructive">{t("outOfStock")}</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t("products")}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("productsDescription")}</p>
          </motion.div>

          {/* Search and Controls */}
          <motion.div variants={itemVariants} className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={t("searchProducts")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Controls */}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
                <Filter className="h-4 w-4" />
                {t("filters")}
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">{t("featured")}</SelectItem>
                  <SelectItem value="newest">{t("newest")}</SelectItem>
                  <SelectItem value="price-low">{t("priceLowToHigh")}</SelectItem>
                  <SelectItem value="price-high">{t("priceHighToLow")}</SelectItem>
                  <SelectItem value="rating">{t("rating")}</SelectItem>
                  <SelectItem value="name">{t("name")}</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={itemVariants}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">{t("all")}</TabsTrigger>
                <TabsTrigger value="featured">{t("featured")}</TabsTrigger>
                <TabsTrigger value="new">{t("new")}</TabsTrigger>
                <TabsTrigger value="categories">{t("categories")}</TabsTrigger>
              </TabsList>

              <div className="mt-6">
                {/* Filters */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6"
                    >
                      <Card className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Category Filter */}
                          {activeTab === "categories" && (
                            <div className="space-y-3">
                              <h3 className="font-semibold">{t("category")}</h3>
                              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">{t("allCategories")}</SelectItem>
                                  {categoriesWithCounts.map((category) => (
                                    <SelectItem key={category.id} value={category.id}>
                                      {category.name} ({category.productCount})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}

                          {/* Price Range */}
                          <div className="space-y-3">
                            <h3 className="font-semibold">{t("priceRange")}</h3>
                            <div className="px-2">
                              <Slider
                                value={priceRange}
                                onValueChange={setPriceRange}
                                max={3000}
                                min={0}
                                step={50}
                                className="w-full"
                              />
                              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                                <span>${priceRange[0]}</span>
                                <span>${priceRange[1]}</span>
                              </div>
                            </div>
                          </div>

                          {/* Brand Filter */}
                          <div className="space-y-3">
                            <h3 className="font-semibold">{t("brands")}</h3>
                            <div className="space-y-2 max-h-32 overflow-y-auto">
                              {brands.map((brand) => (
                                <div key={brand} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={brand}
                                    checked={selectedBrands.includes(brand)}
                                    onCheckedChange={() => handleBrandToggle(brand)}
                                  />
                                  <label htmlFor={brand} className="text-sm cursor-pointer">
                                    {brand}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Results Count */}
                <motion.div variants={itemVariants} className="mb-4">
                  <p className="text-muted-foreground">
                    {filteredProducts.length} {t("productsFound")}
                  </p>
                </motion.div>

                {/* Products Grid */}
                <TabsContent value={activeTab} className="mt-0">
                  <AnimatePresence mode="wait">
                    {filteredProducts.length > 0 ? (
                      <motion.div
                        key={`${activeTab}-${searchQuery}-${selectedCategory}`}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className={
                          viewMode === "grid"
                            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                            : "space-y-4"
                        }
                      >
                        {filteredProducts.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold mb-2">{t("noProductsFound")}</h3>
                        <p className="text-muted-foreground">{t("tryDifferentFilters")}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
