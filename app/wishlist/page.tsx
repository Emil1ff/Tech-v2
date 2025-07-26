"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/store/store"
import { removeFromWishlist, clearWishlist } from "@/store/slices/wishlistSlice"
import { addToCart } from "@/store/slices/cartSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function WishlistPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist)
  const { products } = useSelector((state: RootState) => state.products)
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const { toast } = useToast()

  const wishlistProducts = products.filter((product) => wishlistItems.includes(product.id))

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">İstək siyahısına baxmaq üçün giriş edin</h1>
          <p className="text-muted-foreground mb-6">
            İstək siyahınızdakı məhsulları görmək üçün hesaba giriş etməlisiniz.
          </p>
          <Link href="/products">
            <Button>Məhsullara bax</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleRemoveFromWishlist = (productId: number) => {
    dispatch(removeFromWishlist(productId))
    toast({
      title: "İstək siyahısından silindi",
      description: "Məhsul istək siyahısından silindi.",
    })
  }

  const handleAddToCart = (product: any) => {
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

  const handleClearWishlist = () => {
    dispatch(clearWishlist())
    toast({
      title: "İstək siyahısı təmizləndi",
      description: "Bütün məhsullar istək siyahısından silindi.",
    })
  }

  if (wishlistProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">İstək siyahınız boşdur</h1>
          <p className="text-muted-foreground mb-6">Bəyəndiyiniz məhsulları istək siyahınıza əlavə edin.</p>
          <Link href="/products">
            <Button>Məhsullara bax</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">İstək siyahısı ({wishlistProducts.length} məhsul)</h1>
        <Button variant="outline" onClick={handleClearWishlist}>
          <Trash2 className="mr-2 h-4 w-4" />
          Siyahını təmizlə
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="relative mb-4">
                <Link href={`/products/${product.id}`}>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg bg-muted/50 cursor-pointer hover:scale-105 transition-transform"
                  />
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                  onClick={() => handleRemoveFromWishlist(product.id)}
                >
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                </Button>
                {product.inStock && (
                  <Badge className="absolute top-2 left-2" variant="secondary">
                    Stokda
                  </Badge>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors cursor-pointer">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold">${product.price}</span>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 space-y-2">
              <Button className="w-full" onClick={() => handleAddToCart(product)} disabled={!product.inStock}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                {product.inStock ? "Səbətə əlavə et" : "Stokda yoxdur"}
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => handleRemoveFromWishlist(product.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Siyahıdan sil
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
