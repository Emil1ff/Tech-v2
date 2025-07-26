"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type React from "react"

interface AnimatedLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function AnimatedLink({ href, children, className = "", onClick }: AnimatedLinkProps) {
  return (
    <Link href={href} className={className} onClick={onClick}>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
        {children}
      </motion.div>
    </Link>
  )
}
