"use client"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { useTranslation } from "@/hooks/useTranslation"

export function LoadingPage() {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-background"
    >
      <div className="text-center space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="mx-auto"
        >
          <Loader2 className="h-12 w-12 text-primary" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg"
        >
          {t("loading")}
        </motion.p>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="h-1 bg-primary rounded-full max-w-xs mx-auto"
        />
      </div>
    </motion.div>
  )
}
