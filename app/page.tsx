"use client"

import { motion } from "framer-motion"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CategoryGrid } from "@/components/category-grid"
import { NewsletterSection } from "@/components/newsletter-section"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export default function HomePage() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="min-h-screen">
      <motion.div variants={itemVariants}>
        <HeroSection />
      </motion.div>
      <motion.div variants={itemVariants}>
        <CategoryGrid />
      </motion.div>
      <motion.div variants={itemVariants}>
        <FeaturedProducts />
      </motion.div>
      <motion.div variants={itemVariants}>
        <NewsletterSection />
      </motion.div>
    </motion.div>
  )
}
