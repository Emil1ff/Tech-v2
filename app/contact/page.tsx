"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/hooks/useTranslation"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

const contactInfo = [
  {
    icon: Phone,
    title: "Telefon",
    details: ["+994 12 345 67 89", "+994 50 123 45 67"],
    color: "bg-blue-500",
  },
  {
    icon: Mail,
    title: "E-mail",
    details: ["info@techstore.az", "support@techstore.az"],
    color: "bg-green-500",
  },
  {
    icon: MapPin,
    title: "Ünvan",
    details: ["Nizami küçəsi 123", "Bakı, Azərbaycan"],
    color: "bg-red-500",
  },
  {
    icon: Clock,
    title: "İş Saatları",
    details: ["B.e - Cümə: 09:00 - 18:00", "Şənbə: 10:00 - 16:00"],
    color: "bg-purple-500",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export default function ContactPage() {
  const { t } = useTranslation()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Mesaj göndərildi!",
        description: "Tezliklə sizinlə əlaqə saxlayacağıq.",
      })
      setFormData({ name: "", email: "", subject: "", message: "" })
      setIsLoading(false)
    }, 1500)
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Əlaqə
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Bizimlə <span className="text-primary">Əlaqə</span> Saxlayın
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Suallarınız, təklifləriniz və ya yardıma ehtiyacınız varsa, bizimlə əlaqə saxlamaqdan çəkinməyin.
              Komandamız sizə kömək etməyə hazırdır.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div key={info.title} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${info.color} mb-4`}
                    >
                      <info.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{info.title}</h3>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-muted-foreground text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <MessageCircle className="mr-3 h-6 w-6 text-primary" />
                    Mesaj Göndərin
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Ad Soyad *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Adınızı daxil edin"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Mövzu *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Mesajın mövzusu"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Mesaj *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Mesajınızı buraya yazın..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Göndərilir...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Mesaj Göndər
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Map Placeholder */}
              <Card className="shadow-lg">
                <CardContent className="p-0">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-lg font-medium">Xəritə</p>
                      <p className="text-sm">Nizami küçəsi 123, Bakı</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Contact */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Tez Əlaqə</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Telefon Dəstəyi</p>
                      <p className="text-sm text-muted-foreground">24/7 mövcuddur</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">E-mail Dəstəyi</p>
                      <p className="text-sm text-muted-foreground">24 saat ərzində cavab</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Canlı Söhbət</p>
                      <p className="text-sm text-muted-foreground">İş saatlarında aktiv</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Tez-tez Verilən Suallar</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Ən çox soruşulan sualların cavabları</p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Çatdırılma nə qədər vaxt aparır?</h3>
                  <p className="text-muted-foreground text-sm">
                    Bakı daxilində 24 saat, digər şəhərlərə 2-3 iş günü ərzində çatdırılma həyata keçirilir.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Qaytarma şərtləri necədir?</h3>
                  <p className="text-muted-foreground text-sm">
                    Məhsulları alış tarixindən 14 gün ərzində orijinal qablaşdırmada qaytara bilərsiniz.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Zəmanət müddəti nə qədərdir?</h3>
                  <p className="text-muted-foreground text-sm">
                    Bütün məhsullar üçün minimum 1 il, əksər məhsullar üçün 2 il beynəlxalq zəmanət verilir.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Hansı ödəniş üsulları mövcuddur?</h3>
                  <p className="text-muted-foreground text-sm">
                    Nağd, bank kartı, bank köçürməsi və hissə-hissə ödəniş üsulları mövcuddur.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
