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
    image: "https://www.noutbuklar.az/wp-content/uploads/2024/02/309.jpg",
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
    image: "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-geo-240909_inline.jpg.large.jpg",
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
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MQTQ3?wid=2754&hei=4115&fmt=jpeg&qlt=90&.v=1741643688229",
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
    image: "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25446398/iPadAirFront.jpg?quality=90&strip=all&crop=16.666666666667%2C0%2C66.666666666667%2C100&w=2400",
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
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MXM23ref_FV99_VW_34FR+watch-case-46-aluminum-jetblack-nc-s10_VW_34FR+watch-face-46-aluminum-jetblack-s10_VW_34FR?wid=752&hei=720&bgc=fafafa&trim=1&fmt=p-jpg&qlt=80&.v=TnVrdDZWRlZzTURKbHFqOGh0dGpVRW5TeWJ6QW43NUFnQ2V4cmRFc1VnYUdWejZ5THhpKzJwRmRDYlhxN2o5aXB2QjR6TEZ4ZThxM3VqYkZobmlXM3RGNnlaeXQ4NGFKQTAzc0NGeHR2aVk0VEhOZEFKYmY1ZHNpalQ3YVhOWk9WVlBjZVFuazArV21YaFcvTVJ5dzR2eDMxaWg4TFhITTVrUW41Z084dENpYmZuSTdFUnErS0g3SWYxazQrNDdyRzE3K0tORmZaUy9vOVdqTEp2dmJNL3gwYlE3R0w4Z1RCbG9qQTd1MjYyL1owaE5aVCt2Ri82aDRacTg0bXlaZA",
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
    image: "https://niceboy.eu/files/produkt/oryx-gamepad/oryx-gamepad-gallery-06.jpg",
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
