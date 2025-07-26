export interface Category {
  id: string
  name: string
  nameEn: string
  nameRu: string
  slug: string
  image: string
  icon: string
  description: string
  descriptionEn: string
  descriptionRu: string
  productCount: number
  isPopular?: boolean
}

export const categories: Category[] = [
  {
    id: "gaming-laptops",
    name: "Oyun Noutbukları",
    nameEn: "Gaming Laptops",
    nameRu: "Игровые ноутбуки",
    slug: "gaming-laptops",
    image: "/placeholder.svg?height=200&width=300&text=Gaming+Laptops",
    icon: "laptop",
    description: "Yüksək performanslı oyun noutbukları",
    descriptionEn: "High-performance gaming laptops",
    descriptionRu: "Высокопроизводительные игровые ноутбуки",
    productCount: 3,
    isPopular: true,
  },
  {
    id: "smartphones",
    name: "Smartfonlar",
    nameEn: "Smartphones",
    nameRu: "Смартфоны",
    slug: "smartphones",
    image: "/placeholder.svg?height=200&width=300&text=Smartphones",
    icon: "smartphone",
    description: "Ən son smartfon modelləri",
    descriptionEn: "Latest smartphone models",
    descriptionRu: "Новейшие модели смартфонов",
    productCount: 3,
    isPopular: true,
  },
  {
    id: "headphones",
    name: "Qulaqlıqlar",
    nameEn: "Headphones",
    nameRu: "Наушники",
    slug: "headphones",
    image: "/placeholder.svg?height=200&width=300&text=Headphones",
    icon: "headphones",
    description: "Premium audio qulaqlıqlar",
    descriptionEn: "Premium audio headphones",
    descriptionRu: "Премиальные аудио наушники",
    productCount: 3,
    isPopular: true,
  },
  {
    id: "tablets",
    name: "Planşetlər",
    nameEn: "Tablets",
    nameRu: "Планшеты",
    slug: "tablets",
    image: "/placeholder.svg?height=200&width=300&text=Tablets",
    icon: "tablet",
    description: "Güclü və portativ planşetlər",
    descriptionEn: "Powerful and portable tablets",
    descriptionRu: "Мощные и портативные планшеты",
    productCount: 2,
    isPopular: false,
  },
  {
    id: "smartwatches",
    name: "Ağıllı Saatlar",
    nameEn: "Smartwatches",
    nameRu: "Умные часы",
    slug: "smartwatches",
    image: "/placeholder.svg?height=200&width=300&text=Smartwatches",
    icon: "watch",
    description: "Fitness və sağlamlıq izləmə",
    descriptionEn: "Fitness and health tracking",
    descriptionRu: "Фитнес и отслеживание здоровья",
    productCount: 2,
    isPopular: false,
  },
  {
    id: "gaming-accessories",
    name: "Oyun Aksesuarları",
    nameEn: "Gaming Accessories",
    nameRu: "Игровые аксессуары",
    slug: "gaming-accessories",
    image: "/placeholder.svg?height=200&width=300&text=Gaming+Accessories",
    icon: "gamepad",
    description: "Professional oyun aksesuarları",
    descriptionEn: "Professional gaming accessories",
    descriptionRu: "Профессиональные игровые аксессуары",
    productCount: 2,
    isPopular: false,
  },
]

// Helper functions
export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find((category) => category.slug === slug)
}

export const getPopularCategories = (): Category[] => {
  return categories.filter((category) => category.isPopular)
}

export const getAllCategories = (): Category[] => {
  return categories
}

// Update product counts dynamically
import { getProductsByCategory } from "./products"

export const getCategoriesWithProductCounts = (): Category[] => {
  return categories.map((category) => ({
    ...category,
    productCount: getProductsByCategory(category.id).length,
  }))
}
