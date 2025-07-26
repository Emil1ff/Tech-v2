"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/hooks/useTranslation"

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

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("contact")}</h1>
          <p className="text-muted-foreground text-lg">We'd love to hear from you. Get in touch with our team.</p>
        </motion.div>

        <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-6">
          <motion.div variants={itemVariants}>
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Mail className="h-8 w-8 mx-auto mb-2 text-primary" />
                </motion.div>
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">support@techstore.com</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Phone className="h-8 w-8 mx-auto mb-2 text-primary" />
                </motion.div>
                <CardTitle>Phone</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                </motion.div>
                <CardTitle>Address</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  123 Tech Street
                  <br />
                  San Francisco, CA 94105
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
