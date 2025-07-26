"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, MessageCircle, Phone, Mail, Search, Truck, CreditCard, RotateCcw } from "lucide-react"
import { useTranslation } from "@/hooks/useTranslation"

const faqData = [
  {
    question: "Sifarişimi necə izləyə bilərəm?",
    answer:
      "Sifarişinizi izləmək üçün 'Sifarişlərim' bölməsinə daxil olun və sifariş nömrənizi daxil edin. Həmçinin email vasitəsilə göndərilən izləmə linkindən istifadə edə bilərsiniz.",
  },
  {
    question: "Çatdırılma nə qədər vaxt aparır?",
    answer:
      "Standart çatdırılma 2-3 iş günü aparır. Ekspress çatdırılma 1 iş günü ərzində həyata keçirilir. Beynəlxalq çatdırılma 5-7 iş günü aparır.",
  },
  {
    question: "Məhsulu necə qaytara bilərəm?",
    answer:
      "Məhsulları alış tarixindən 30 gün ərzində qaytara bilərsiniz. Məhsul orijinal qablaşdırmada və istifadə edilməmiş vəziyyətdə olmalıdır.",
  },
  {
    question: "Hansı ödəniş üsulları qəbul edilir?",
    answer:
      "Visa, Mastercard, American Express kartları, PayPal və bank köçürməsi qəbul edilir. Bütün ödənişlər SSL şifrələməsi ilə qorunur.",
  },
  {
    question: "Zəmanət şərtləri necədir?",
    answer:
      "Bütün məhsullar üçün 2 il beynəlxalq zəmanət verilir. Zəmanət xidməti pulsuz təmir və ya dəyişdirməni əhatə edir.",
  },
  {
    question: "Hesabımı necə silə bilərəm?",
    answer:
      "Hesabınızı silmək üçün müştəri xidmətləri ilə əlaqə saxlayın. Hesab silinməzdən əvvəl bütün aktiv sifarişlərinizin tamamlanması lazımdır.",
  },
]

const contactMethods = [
  {
    icon: Phone,
    title: "Telefon Dəstəyi",
    description: "24/7 telefon dəstəyi",
    contact: "+994 12 123 45 67",
    color: "bg-blue-500",
  },
  {
    icon: Mail,
    title: "Email Dəstəyi",
    description: "24 saat ərzində cavab",
    contact: "support@techstore.az",
    color: "bg-green-500",
  },
  {
    icon: MessageCircle,
    title: "Canlı Söhbət",
    description: "Dərhal cavab alın",
    contact: "Söhbəti Başlat",
    color: "bg-purple-500",
  },
]

export default function HelpPage() {
  const { t } = useTranslation()

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
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Yardım Mərkəzi</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Suallarınızın cavabını tapın və ya bizimlə əlaqə saxlayın
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-2xl mx-auto mb-12"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Sualınızı yazın..." className="pl-10 py-3 text-lg" />
        </div>
      </motion.div>

      {/* Quick Help Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
          <CardContent className="p-6 text-center">
            <Truck className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Çatdırılma</h3>
            <p className="text-sm text-muted-foreground">Çatdırılma vaxtları və şərtləri</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
          <CardContent className="p-6 text-center">
            <CreditCard className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Ödəniş</h3>
            <p className="text-sm text-muted-foreground">Ödəniş üsulları və təhlükəsizlik</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
          <CardContent className="p-6 text-center">
            <RotateCcw className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Qaytarma</h3>
            <p className="text-sm text-muted-foreground">Qaytarma prosesi və şərtləri</p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="mr-2 h-5 w-5" />
                Tez-tez Verilən Suallar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="space-y-6"
        >
          {/* Contact Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Bizimlə Əlaqə</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactMethods.map((method, index) => {
                const Icon = method.icon
                return (
                  <div
                    key={index}
                    className="flex items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className={`p-3 rounded-full ${method.color} text-white mr-4`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{method.title}</h4>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      {method.contact}
                    </Button>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Mesaj Göndər</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Ad</Label>
                    <Input id="firstName" placeholder="Adınız" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Soyad</Label>
                    <Input id="lastName" placeholder="Soyadınız" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@example.com" />
                </div>
                <div>
                  <Label htmlFor="subject">Mövzu</Label>
                  <Input id="subject" placeholder="Mesajın mövzusu" />
                </div>
                <div>
                  <Label htmlFor="message">Mesaj</Label>
                  <Textarea id="message" placeholder="Mesajınızı yazın..." rows={4} />
                </div>
                <Button className="w-full">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Mesaj Göndər
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
