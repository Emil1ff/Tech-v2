"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import type { ReactNode } from "react"

interface AnimatedLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function AnimatedLink({ href, children, className, onClick }: AnimatedLinkProps) {
  return (
    <Link href={href} onClick={onClick}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={className}
      >
        {children}
      </motion.div>
    </Link>
  )
}
