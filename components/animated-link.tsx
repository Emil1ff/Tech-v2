"use client"

import type React from "react"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

interface AnimatedLinkProps {
  href: string
  children: ReactNode
  className?: string
}

export function AnimatedLink({ href, children, className }: AnimatedLinkProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    // Add page transition animation
    const pageTransition = document.createElement("div")
    pageTransition.className = "fixed inset-0 bg-background z-50 opacity-0"
    document.body.appendChild(pageTransition)

    // Animate in
    pageTransition.style.transition = "opacity 0.3s ease-in-out"
    pageTransition.style.opacity = "1"

    setTimeout(() => {
      router.push(href)

      // Animate out after navigation
      setTimeout(() => {
        pageTransition.style.opacity = "0"
        setTimeout(() => {
          document.body.removeChild(pageTransition)
        }, 300)
      }, 100)
    }, 300)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="relative"
    >
      <Link href={href} className={className} onClick={handleClick}>
        {children}
      </Link>
    </motion.div>
  )
}
