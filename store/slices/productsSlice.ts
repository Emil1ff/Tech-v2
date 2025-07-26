import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
  description: string
  features: string[]
  inStock: boolean
}

interface ProductsState {
  products: Product[]
  filteredProducts: Product[]
  selectedCategory: string
  searchQuery: string
}

const productsData = {
  products: [
    {
      id: 1,
      name: 'MacBook Pro 16" M3 Max',
      category: "computers",
      price: 3499,
      image: "/placeholder.svg?height=400&width=400&text=MacBook%20Pro",
      description: "Peşəkarlar üçün ən güclü MacBook Pro. M3 Max çipi ilə inanılmaz performans.",
      features: [
        "M3 Max çip",
        "36GB Unified Memory",
        "1TB SSD",
        "16.2-düym Liquid Retina XDR ekran",
        "1080p FaceTime HD kamera",
      ],
      inStock: true,
    },
    {
      id: 2,
      name: 'iMac 24" M3',
      category: "computers",
      price: 1699,
      image: "/placeholder.svg?height=400&width=400&text=iMac%2024",
      description: "Rəngarəng və güclü iMac. M3 çipi ilə hər şey daha sürətli.",
      features: ["M3 çip", "8GB Unified Memory", "256GB SSD", "24-düym 4.5K Retina ekran", "1080p FaceTime HD kamera"],
      inStock: true,
    },
    {
      id: 3,
      name: "Gaming Desktop RTX 4080",
      category: "computers",
      price: 2299,
      image: "/placeholder.svg?height=400&width=400&text=Gaming%20Desktop",
      description: "Yüksək performanslı oyun kompüteri. Ən son oyunları maksimum ayarlarda oynayın.",
      features: ["NVIDIA RTX 4080", "32GB DDR5 RAM", "1TB NVMe SSD", "Intel Core i7-13700K", "850W PSU"],
      inStock: true,
    },
    {
      id: 4,
      name: "ASUS ROG Laptop",
      category: "computers",
      price: 1899,
      image: "/placeholder.svg?height=400&width=400&text=ASUS%20ROG",
      description: "Oyunçular üçün güclü laptop. RTX 4070 ilə hər yerdə oyun oynayın.",
      features: ["RTX 4070", "16GB DDR5", "1TB SSD", '15.6" 144Hz ekran', "RGB klaviatura"],
      inStock: true,
    },
    {
      id: 5,
      name: "Dell XPS 13",
      category: "computers",
      price: 1299,
      image: "/placeholder.svg?height=400&width=400&text=Dell%20XPS%2013",
      description: "Ultra-nazik və yüngül laptop. İş və səyahət üçün mükəmməl.",
      features: ["Intel Core i7", "16GB RAM", "512GB SSD", '13.4" InfinityEdge ekran', "Wi-Fi 6E"],
      inStock: true,
    },
    {
      id: 6,
      name: "Logitech MX Master 3S",
      category: "accessories",
      price: 99,
      image: "/placeholder.svg?height=400&width=400&text=Logitech%20Mouse",
      description: "Peşəkarlar üçün ən yaxşı simsiz siçan. Erqonomik dizayn və uzun batareya ömrü.",
      features: ["8000 DPI sensor", "70 günə qədər batareya", "USB-C şarj", "Bluetooth və USB alıcı", "Sessiz kliklər"],
      inStock: true,
    },
    {
      id: 7,
      name: "Keychron K8 Pro",
      category: "accessories",
      price: 179,
      image: "/placeholder.svg?height=400&width=400&text=Keychron%20Keyboard",
      description: "Premium mexanik klaviatura. Hot-swap switch-lər və RGB işıqlandırma.",
      features: [
        "Hot-swap Gateron switch-lər",
        "RGB işıqlandırma",
        "USB-C və Bluetooth",
        "Alüminium çərçivə",
        "Mac və PC uyğun",
      ],
      inStock: true,
    },
    {
      id: 8,
      name: 'LG 27" 4K Monitor',
      category: "accessories",
      price: 449,
      image: "/placeholder.svg?height=400&width=400&text=LG%20Monitor",
      description: "27-düym 4K UHD monitor. HDR10 dəstəyi və USB-C hub.",
      features: ["4K UHD (3840x2160)", "HDR10 dəstəyi", "USB-C hub", "IPS panel", "99% sRGB"],
      inStock: true,
    },
  ],
}

const initialState: ProductsState = {
  products: productsData.products,
  filteredProducts: productsData.products,
  selectedCategory: "all",
  searchQuery: "",
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
      state.filteredProducts = state.products
        .filter((product) => action.payload === "all" || product.category === action.payload)
        .filter((product) => product.name.toLowerCase().includes(state.searchQuery.toLowerCase()))
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.filteredProducts = state.products
        .filter((product) => product.name.toLowerCase().includes(action.payload.toLowerCase()))
        .filter((product) => state.selectedCategory === "all" || product.category === state.selectedCategory)
    },
  },
})

export const { setSelectedCategory, setSearchQuery } = productsSlice.actions
export default productsSlice.reducer
