"use client"

import { motion } from "framer-motion"
import { Shield, Truck, Headphones, Award, Users, Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/hooks/useTranslation"

const features = [
  {
    icon: Shield,
    title: "Keyfiyyət Zəmanəti",
    description: "Bütün məhsullar üçün 2 il beynəlxalq zəmanət və keyfiyyət təminatı",
  },
  {
    icon: Truck,
    title: "Sürətli Çatdırılma",
    description: "24 saat ərzində sifariş hazırlığı və 2-3 gün ərzində çatdırılma",
  },
  {
    icon: Headphones,
    title: "24/7 Dəstək",
    description: "Həftənin 7 günü, günün 24 saatı müştəri xidməti və texniki dəstək",
  },
  {
    icon: Award,
    title: "Mükafatlar",
    description: "2023-cü ildə 'Ən Yaxşı Texnologiya Mağazası' mükafatı",
  },
  {
    icon: Users,
    title: "50K+ Müştəri",
    description: "50,000-dən çox məmnun müştəri və 99% müştəri məmnuniyyəti",
  },
  {
    icon: Globe,
    title: "Beynəlxalq Çatdırılma",
    description: "Dünya üzrə 50+ ölkəyə çatdırılma xidməti",
  },
]

const stats = [
  { number: "2020", label: "Təsis ili" },
  { number: "1000+", label: "Məhsul çeşidi" },
  { number: "50K+", label: "Məmnun müştəri" },
  { number: "99%", label: "Məmnuniyyət dərəcəsi" },
]

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
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Haqqımızda
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Texnologiyanın <span className="text-primary">Gələcəyini</span> Formalaşdırırıq
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              2020-ci ildən bəri Azərbaycanda ən son texnologiya məhsullarını təqdim edirik. Missiyamız hər kəsi
              gələcəyin texnologiyası ilə tanış etməkdir.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div key={stat.label} variants={itemVariants} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Bizim Hekayəmiz</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  TechStore 2020-ci ildə texnologiya həvəskarları tərəfindən qurulmuşdur. Məqsədimiz Azərbaycanda ən son
                  və ən keyfiyyətli texnologiya məhsullarını əlverişli qiymətlərlə təqdim etmək idi.
                </p>
                <p>
                  Dörd il ərzində 50,000-dən çox müştəriyə xidmət göstərdik və ölkənin aparıcı texnologiya
                  mağazalarından birinə çevrilmişik. Hər gün yeniliklər və innovasiyalar üzərində işləyirik.
                </p>
                <p>
                  Komandamız texnologiya sahəsində təcrübəli mütəxəssislərdən ibarətdir və hər müştəriyə fərdi yanaşma
                  tətbiq edirik. Məqsədimiz sadəcə məhsul satmaq deyil, həm də müştərilərimizə ən yaxşı texnoloji
                  həlləri təqdim etməkdir.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <img
                src="/placeholder.svg?height=400&width=600&text=Our+Story"
                alt="Bizim Hekayəmiz"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary/20 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Niyə TechStore?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Bizi digərlərindən fərqləndirən xüsusiyyətlər və üstünlüklərimiz
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Missiyamız</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Texnologiyanı hər kəs üçün əlçatan etmək və gələcəyin innovasiyalarını bu günə gətirməkdir.
              Müştərilərimizin həyatını asanlaşdıran və işlərini daha səmərəli edən texnoloji həllər təqdim edirik.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">İnnovasiya</div>
                <p className="text-muted-foreground">Ən son texnologiyalar</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">Keyfiyyət</div>
                <p className="text-muted-foreground">Premium məhsullar</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">Xidmət</div>
                <p className="text-muted-foreground">Mükəmməl müştəri təcrübəsi</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
