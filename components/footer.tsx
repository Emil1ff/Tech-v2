"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useTranslation } from "@/hooks/useTranslation"

export function Footer() {
  const { t } = useTranslation()

  const footerLinks = {
    company: [
      { name: t("about"), href: "/about" },
      { name: "Karyera", href: "/careers" },
      { name: "Mətbuat", href: "/press" },
      { name: "Bloq", href: "/blog" },
    ],
    support: [
      { name: t("help"), href: "/help" },
      { name: t("contact"), href: "/contact" },
      { name: "Çatdırılma Məlumatı", href: "/shipping" },
      { name: "Qaytarma", href: "/returns" },
    ],
    legal: [
      { name: "Məxfilik Siyasəti", href: "/privacy" },
      { name: "Xidmət Şərtləri", href: "/terms" },
      { name: "Kukilər Siyasəti", href: "/cookies" },
      { name: "Zəmanət", href: "/warranty" },
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
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-xl">TechStore</span>
            </Link>

            <p className="text-muted-foreground text-sm">{t("footerDescription")}</p>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@techstore.az</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+994 12 345 67 89</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Bakı, Azərbaycan</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">{t("company")}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4">{t("support")}</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold">Xəbər Bülleteni</h3>
            <p className="text-sm text-muted-foreground">Ən son yeniliklər və təkliflərdən xəbərdar olun</p>

            <div className="flex space-x-2">
              <Input type="email" placeholder="E-mail ünvanınız" className="flex-1" />
              <Button size="sm">Abunə ol</Button>
            </div>

            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <Button key={social.name} variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <Link href={social.href}>
                    <social.icon className="h-4 w-4" />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">© 2024 TechStore. {t("allRightsReserved")}</div>

          <div className="flex space-x-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
