import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"
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

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-xl">TechStore</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">{t("footerDescription")}</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">{t("company")}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("support")}</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("legal")}</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">© 2024 TechStore. {t("allRightsReserved")}</p>
          <p className="text-muted-foreground text-sm mt-4 md:mt-0">{t("madeWithLove")}</p>
        </div>
      </div>
    </footer>
  )
}
