"use client"

import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import type { RootState, AppDispatch } from "@/store/store"
import { removeFromCart, updateQuantity, clearCart } from "@/store/slices/cartSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, total } = useSelector((state: RootState) => state.cart)
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const { toast } = useToast()

  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">Səbətə baxmaq üçün giriş edin</h1>
          <p className="text-muted-foreground mb-6">Səbətinizdəki məhsulları görmək üçün hesaba giriş etməlisiniz.</p>
          <Link href="/products">
            <Button>Məhsullara bax</Button>
          </Link>
        </div>
      </motion.div>
    )
  }

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id))
    toast({
      title: "Məhsul silindi",
      description: "Məhsul səbətdən silindi.",
    })
  }

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
    toast({
      title: "Səbət təmizləndi",
      description: "Bütün məhsullar səbətdən silindi.",
    })
  }

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">Səbətiniz boşdur</h1>
          <p className="text-muted-foreground mb-6">Səbətinizə məhsul əlavə etmək üçün alış-verişə başlayın.</p>
          <Link href="/products">
            <Button>Məhsullara bax</Button>
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Səbət ({items.length} məhsul)</h1>
        <Button variant="outline" onClick={handleClearCart}>
          <Trash2 className="mr-2 h-4 w-4" />
          Səbəti təmizlə
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-2xl font-bold">${item.price}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>

                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                        className="w-16 text-center"
                        min="1"
                      />

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Sifariş xülasəsi</h2>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Məhsullar ({items.length})</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Çatdırılma</span>
                    <span>Pulsuz</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vergi</span>
                    <span>${(total * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-semibold mb-6">
                  <span>Cəmi</span>
                  <span>${(total * 1.1).toFixed(2)}</span>
                </div>

                <Link href="/checkout">
                  <Button className="w-full" size="lg">
                    Sifarişi tamamla
                  </Button>
                </Link>

                <p className="text-sm text-muted-foreground text-center mt-4">
                  Təhlükəsiz ödəniş SSL şifrələməsi ilə qorunur
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
