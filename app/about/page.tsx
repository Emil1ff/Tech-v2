"use client"

import { motion } from "framer-motion"
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <motion.h1 variants={itemVariants} className="text-4xl font-bold mb-6">
          About TechStore
        </motion.h1>
        <motion.div variants={itemVariants} className="prose prose-lg dark:prose-invert">
          <motion.p variants={itemVariants}>
            Welcome to TechStore, your premier destination for cutting-edge technology products. Since our founding in
            2020, we've been committed to bringing you the latest innovations from the world's leading tech brands.
          </motion.p>
          <motion.p variants={itemVariants}>
            Our mission is simple: to make advanced technology accessible to everyone. Whether you're a tech enthusiast,
            a professional, or someone just starting their digital journey, we have the perfect products to meet your
            needs.
          </motion.p>
          <motion.h2 variants={itemVariants}>Why Choose TechStore?</motion.h2>
          <motion.ul variants={itemVariants}>
            <motion.li variants={itemVariants}>Curated selection of premium tech products</motion.li>
            <motion.li variants={itemVariants}>Competitive pricing and exclusive deals</motion.li>
            <motion.li variants={itemVariants}>Fast, reliable shipping worldwide</motion.li>
            <motion.li variants={itemVariants}>Expert customer support</motion.li>
            <motion.li variants={itemVariants}>2-year warranty on all products</motion.li>
          </motion.ul>
        </motion.div>
      </div>
    </motion.div>
  )
}
