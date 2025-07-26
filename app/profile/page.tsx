"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, MapPin, Edit, Save, X, Package, Heart, ShoppingCart } from "lucide-react"
import { useTranslation } from "@/hooks/useTranslation"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "Əli",
    surname: "Məmmədov",
    email: "ali.mammadov@example.com",
    phone: "+994 50 123 45 67",
    address: "Nizami küçəsi 123, Bakı",
    city: "Bakı",
    zipCode: "AZ1000",
  })

  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const { items: cartItems } = useSelector((state: RootState) => state.cart)
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist)
  const { t } = useTranslation()
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profil yeniləndi",
      description: "Məlumatlarınız uğurla yeniləndi.",
    })
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data
    setFormData({
      name: "Əli",
      surname: "Məmmədov",
      email: "ali.mammadov@example.com",
      phone: "+994 50 123 45 67",
      address: "Nizami küçəsi 123, Bakı",
      city: "Bakı",
      zipCode: "AZ1000",
    })
  }

  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="text-center">
          <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Profil səhifəsinə daxil olmaq üçün giriş edin</h1>
          <Button>Giriş Et</Button>
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Profil</h1>
        <p className="text-muted-foreground text-lg">Hesab məlumatlarınızı idarə edin</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Stats */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Statistika
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Package className="mr-2 h-4 w-4 text-blue-500" />
                  <span>Sifarişlər</span>
                </div>
                <Badge>12</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Heart className="mr-2 h-4 w-4 text-red-500" />
                  <span>İstək siyahısı</span>
                </div>
                <Badge>{wishlistItems.length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ShoppingCart className="mr-2 h-4 w-4 text-green-500" />
                  <span>Səbət</span>
                </div>
                <Badge>{cartItems.length}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Üzvlük Statusu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white mb-2">GOLD ÜZV</Badge>
                <p className="text-sm text-muted-foreground">Xüsusi endirimlər və pulsuz çatdırılma</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Şəxsi Məlumatlar
                </CardTitle>
                {!isEditing ? (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Redaktə Et
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button onClick={handleSave}>
                      <Save className="mr-2 h-4 w-4" />
                      Saxla
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="mr-2 h-4 w-4" />
                      Ləğv Et
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="font-semibold mb-4">Əsas Məlumatlar</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Ad</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="surname">Soyad</Label>
                    <Input
                      id="surname"
                      name="surname"
                      value={formData.surname}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Contact Info */}
              <div>
                <h3 className="font-semibold mb-4">Əlaqə Məlumatları</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefon</Label>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Address Info */}
              <div>
                <h3 className="font-semibold mb-4">Ünvan Məlumatları</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Ünvan</Label>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Şəhər</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">Poçt Kodu</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
