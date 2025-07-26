"use client"

import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { AnimatedLink } from "@/components/animated-link"
import { useTranslation } from "@/hooks/useTranslation"

export function Footer() {
  const { t } = useTranslation()

  const footerLinks = {
    company: [
      { name: t("footer.company.about"), href: "/about" },
      { name: t("footer.company.careers"), href: "/careers" },
      { name: t("footer.company.press"), href: "/press" },
      { name: t("footer.company.news"), href: "/news" },
    ],
    support: [
      { name: t("footer.support.help"), href: "/help" },
      { name: t("footer.support.contact"), href: "/contact" },
      { name: t("footer.support.shipping"), href: "/shipping" },
      { name: t("footer.support.returns"), href: "/returns" },
    ],
    legal: [
      { name: t("footer.legal.privacy"), href: "/privacy" },
      { name: t("footer.legal.terms"), href: "/terms" },
      { name: t("footer.legal.cookies"), href: "/cookies" },
      { name: t("footer.legal.accessibility"), href: "/accessibility" },
    ],
  }

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "YouTube", icon: Youtube, href: "#" },
  ]

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-xl">TechStore</span>
            </div>

            <p className="text-muted-foreground text-sm">{t("footer.description")}</p>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@techstore.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Tech Street, Digital City</span>
              </div>
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold mb-4">{t("footer.company.title")}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <AnimatedLink
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </AnimatedLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold mb-4">{t("footer.support.title")}</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <AnimatedLink
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </AnimatedLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="font-semibold">{t("footer.newsletter.title")}</h3>
            <p className="text-sm text-muted-foreground">{t("footer.newsletter.description")}</p>

            <div className="flex space-x-2">
              <Input type="email" placeholder={t("footer.newsletter.placeholder")} className="flex-1" />
              <Button size="sm">{t("footer.newsletter.subscribe")}</Button>
            </div>

            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <Button key={social.name} variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="h-4 w-4" />
                    <span className="sr-only">{social.name}</span>
                  </a>
                </Button>
              ))}
            </div>
          </motion.div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="text-sm text-muted-foreground">© 2024 TechStore. {t("footer.rights")}</div>

          <div className="flex space-x-6">
            {footerLinks.legal.map((link) => (
              <AnimatedLink
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </AnimatedLink>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
