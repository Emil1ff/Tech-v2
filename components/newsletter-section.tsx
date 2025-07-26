"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/hooks/useTranslation"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { toast } = useToast()
  const { t } = useTranslation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Xəta",
        description: "E-mail ünvanını daxil edin",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubscribed(true)
      toast({
        title: "Uğurla abunə oldunuz!",
        description: "Ən son yeniliklər e-mail ünvanınıza göndəriləcək",
      })
      setEmail("")
    }, 1500)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="border-0 shadow-xl bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Content */}
                <div className="text-center lg:text-left">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6"
                  >
                    <Mail className="w-8 h-8 text-primary" />
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold mb-4"
                  >
                    Xəbər Bülletenimizə Abunə Olun
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-muted-foreground text-lg mb-6"
                  >
                    Ən son məhsullar, xüsusi endirimlər və texnologiya xəbərləri haqqında ilk siz xəbərdar olun.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-4 text-sm text-muted-foreground"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Həftəlik yeniliklər</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Xüsusi endirimlər</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Yeni məhsul xəbərləri</span>
                    </div>
                  </motion.div>
                </div>

                {/* Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {isSubscribed ? (
                    <div className="text-center p-8 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">Təşəkkürlər!</h3>
                      <p className="text-green-600 dark:text-green-300">
                        Uğurla abunə oldunuz. Tezliklə sizə yazacağıq!
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Input
                          type="email"
                          placeholder="E-mail ünvanınızı daxil edin"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-1 h-12 text-base"
                          disabled={isLoading}
                        />
                        <Button type="submit" size="lg" disabled={isLoading} className="h-12 px-8 whitespace-nowrap">
                          {isLoading ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                              Göndərilir...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Send className="w-4 h-4" />
                              Abunə Ol
                            </div>
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground text-center sm:text-left">
                        Abunə olmaqla{" "}
                        <a href="/privacy" className="underline hover:text-primary">
                          Məxfilik Siyasətimizi
                        </a>{" "}
                        qəbul etmiş olursunuz.
                      </p>
                    </form>
                  )}
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
