export type TranslationKey =
  | "home"
  | "products"
  | "categories"
  | "about"
  | "contact"
  | "cart"
  | "wishlist"
  | "login"
  | "register"
  | "search"
  | "addToCart"
  | "addToWishlist"
  | "viewDetails"
  | "featuredProducts"
  | "newProducts"
  | "allProducts"
  | "price"
  | "inStock"
  | "outOfStock"
  | "brand"
  | "rating"
  | "reviews"
  | "description"
  | "specifications"
  | "features"
  | "relatedProducts"
  | "sortBy"
  | "filterBy"
  | "priceRange"
  | "clearFilters"
  | "noProductsFound"
  | "loading"
  | "error"
  | "tryAgain"
  | "backToHome"
  | "quantity"
  | "total"
  | "checkout"
  | "continueShopping"
  | "removeFromCart"
  | "updateQuantity"
  | "emptyCart"
  | "emptyWishlist"
  | "loginRequired"
  | "pleaseLogin"
  | "email"
  | "password"
  | "confirmPassword"
  | "firstName"
  | "lastName"
  | "phone"
  | "address"
  | "city"
  | "country"
  | "zipCode"
  | "save"
  | "cancel"
  | "edit"
  | "delete"
  | "confirm"
  | "success"
  | "welcome"
  | "thankYou"
  | "orderPlaced"
  | "orderHistory"
  | "profile"
  | "settings"
  | "logout"
  | "darkMode"
  | "lightMode"
  | "language"
  | "currency"
  | "shipping"
  | "freeShipping"
  | "fastDelivery"
  | "warranty"
  | "returnPolicy"
  | "customerSupport"
  | "newsletter"
  | "subscribe"
  | "unsubscribe"
  | "privacyPolicy"
  | "termsOfService"
  | "faq"
  | "help"
  | "contactUs"
  | "phoneNumber"
  | "emailAddress"
  | "workingHours"
  | "location"
  | "followUs"
  | "socialMedia"

export const translations: Record<"az" | "en" | "ru", Record<TranslationKey, string>> = {
  az: {
    home: "Ana səhifə",
    products: "Məhsullar",
    categories: "Kateqoriyalar",
    about: "Haqqımızda",
    contact: "Əlaqə",
    cart: "Səbət",
    wishlist: "İstək siyahısı",
    login: "Daxil ol",
    register: "Qeydiyyat",
    search: "Axtarış",
    addToCart: "Səbətə əlavə et",
    addToWishlist: "İstək siyahısına əlavə et",
    viewDetails: "Təfərrüatları gör",
    featuredProducts: "Seçilmiş məhsullar",
    newProducts: "Yeni məhsullar",
    allProducts: "Bütün məhsullar",
    price: "Qiymət",
    inStock: "Stokda",
    outOfStock: "Stokda yox",
    brand: "Brend",
    rating: "Reytinq",
    reviews: "Rəylər",
    description: "Təsvir",
    specifications: "Xüsusiyyətlər",
    features: "Özəlliklər",
    relatedProducts: "Oxşar məhsullar",
    sortBy: "Sırala",
    filterBy: "Filtrə et",
    priceRange: "Qiymət aralığı",
    clearFilters: "Filterləri təmizlə",
    noProductsFound: "Məhsul tapılmadı",
    loading: "Yüklənir...",
    error: "Xəta",
    tryAgain: "Yenidən cəhd et",
    backToHome: "Ana səhifəyə qayıt",
    quantity: "Miqdar",
    total: "Cəmi",
    checkout: "Ödəniş",
    continueShopping: "Alış-verişə davam et",
    removeFromCart: "Səbətdən sil",
    updateQuantity: "Miqdarı yenilə",
    emptyCart: "Səbət boşdur",
    emptyWishlist: "İstək siyahısı boşdur",
    loginRequired: "Giriş tələb olunur",
    pleaseLogin: "Zəhmət olmasa daxil olun",
    email: "E-poçt",
    password: "Şifrə",
    confirmPassword: "Şifrəni təsdiq et",
    firstName: "Ad",
    lastName: "Soyad",
    phone: "Telefon",
    address: "Ünvan",
    city: "Şəhər",
    country: "Ölkə",
    zipCode: "Poçt kodu",
    save: "Saxla",
    cancel: "Ləğv et",
    edit: "Redaktə et",
    delete: "Sil",
    confirm: "Təsdiq et",
    success: "Uğurlu",
    welcome: "Xoş gəlmisiniz",
    thankYou: "Təşəkkür edirik",
    orderPlaced: "Sifariş verildi",
    orderHistory: "Sifariş tarixçəsi",
    profile: "Profil",
    settings: "Tənzimləmələr",
    logout: "Çıxış",
    darkMode: "Qaranlıq rejim",
    lightMode: "İşıqlı rejim",
    language: "Dil",
    currency: "Valyuta",
    shipping: "Çatdırılma",
    freeShipping: "Pulsuz çatdırılma",
    fastDelivery: "Sürətli çatdırılma",
    warranty: "Zəmanət",
    returnPolicy: "Qaytarma siyasəti",
    customerSupport: "Müştəri dəstəyi",
    newsletter: "Xəbər bülleteni",
    subscribe: "Abunə ol",
    unsubscribe: "Abunəlikdən çıx",
    privacyPolicy: "Məxfilik siyasəti",
    termsOfService: "İstifadə şərtləri",
    faq: "Tez-tez verilən suallar",
    help: "Kömək",
    contactUs: "Bizimlə əlaqə",
    phoneNumber: "Telefon nömrəsi",
    emailAddress: "E-poçt ünvanı",
    workingHours: "İş saatları",
    location: "Ünvan",
    followUs: "Bizi izləyin",
    socialMedia: "Sosial media",
  },
  en: {
    home: "Home",
    products: "Products",
    categories: "Categories",
    about: "About",
    contact: "Contact",
    cart: "Cart",
    wishlist: "Wishlist",
    login: "Login",
    register: "Register",
    search: "Search",
    addToCart: "Add to Cart",
    addToWishlist: "Add to Wishlist",
    viewDetails: "View Details",
    featuredProducts: "Featured Products",
    newProducts: "New Products",
    allProducts: "All Products",
    price: "Price",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    brand: "Brand",
    rating: "Rating",
    reviews: "Reviews",
    description: "Description",
    specifications: "Specifications",
    features: "Features",
    relatedProducts: "Related Products",
    sortBy: "Sort By",
    filterBy: "Filter By",
    priceRange: "Price Range",
    clearFilters: "Clear Filters",
    noProductsFound: "No Products Found",
    loading: "Loading...",
    error: "Error",
    tryAgain: "Try Again",
    backToHome: "Back to Home",
    quantity: "Quantity",
    total: "Total",
    checkout: "Checkout",
    continueShopping: "Continue Shopping",
    removeFromCart: "Remove from Cart",
    updateQuantity: "Update Quantity",
    emptyCart: "Cart is Empty",
    emptyWishlist: "Wishlist is Empty",
    loginRequired: "Login Required",
    pleaseLogin: "Please Login",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    firstName: "First Name",
    lastName: "Last Name",
    phone: "Phone",
    address: "Address",
    city: "City",
    country: "Country",
    zipCode: "Zip Code",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    confirm: "Confirm",
    success: "Success",
    welcome: "Welcome",
    thankYou: "Thank You",
    orderPlaced: "Order Placed",
    orderHistory: "Order History",
    profile: "Profile",
    settings: "Settings",
    logout: "Logout",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    language: "Language",
    currency: "Currency",
    shipping: "Shipping",
    freeShipping: "Free Shipping",
    fastDelivery: "Fast Delivery",
    warranty: "Warranty",
    returnPolicy: "Return Policy",
    customerSupport: "Customer Support",
    newsletter: "Newsletter",
    subscribe: "Subscribe",
    unsubscribe: "Unsubscribe",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    faq: "FAQ",
    help: "Help",
    contactUs: "Contact Us",
    phoneNumber: "Phone Number",
    emailAddress: "Email Address",
    workingHours: "Working Hours",
    location: "Location",
    followUs: "Follow Us",
    socialMedia: "Social Media",
  },
  ru: {
    home: "Главная",
    products: "Товары",
    categories: "Категории",
    about: "О нас",
    contact: "Контакты",
    cart: "Корзина",
    wishlist: "Избранное",
    login: "Войти",
    register: "Регистрация",
    search: "Поиск",
    addToCart: "В корзину",
    addToWishlist: "В избранное",
    viewDetails: "Подробнее",
    featuredProducts: "Рекомендуемые товары",
    newProducts: "Новые товары",
    allProducts: "Все товары",
    price: "Цена",
    inStock: "В наличии",
    outOfStock: "Нет в наличии",
    brand: "Бренд",
    rating: "Рейтинг",
    reviews: "Отзывы",
    description: "Описание",
    specifications: "Характеристики",
    features: "Особенности",
    relatedProducts: "Похожие товары",
    sortBy: "Сортировать",
    filterBy: "Фильтровать",
    priceRange: "Диапазон цен",
    clearFilters: "Очистить фильтры",
    noProductsFound: "Товары не найдены",
    loading: "Загрузка...",
    error: "Ошибка",
    tryAgain: "Попробовать снова",
    backToHome: "На главную",
    quantity: "Количество",
    total: "Итого",
    checkout: "Оформить заказ",
    continueShopping: "Продолжить покупки",
    removeFromCart: "Удалить из корзины",
    updateQuantity: "Изменить количество",
    emptyCart: "Корзина пуста",
    emptyWishlist: "Избранное пусто",
    loginRequired: "Требуется вход",
    pleaseLogin: "Пожалуйста, войдите",
    email: "Email",
    password: "Пароль",
    confirmPassword: "Подтвердить пароль",
    firstName: "Имя",
    lastName: "Фамилия",
    phone: "Телефон",
    address: "Адрес",
    city: "Город",
    country: "Страна",
    zipCode: "Почтовый индекс",
    save: "Сохранить",
    cancel: "Отмена",
    edit: "Редактировать",
    delete: "Удалить",
    confirm: "Подтвердить",
    success: "Успешно",
    welcome: "Добро пожаловать",
    thankYou: "Спасибо",
    orderPlaced: "Заказ размещен",
    orderHistory: "История заказов",
    profile: "Профиль",
    settings: "Настройки",
    logout: "Выйти",
    darkMode: "Темная тема",
    lightMode: "Светлая тема",
    language: "Язык",
    currency: "Валюта",
    shipping: "Доставка",
    freeShipping: "Бесплатная доставка",
    fastDelivery: "Быстрая доставка",
    warranty: "Гарантия",
    returnPolicy: "Политика возврата",
    customerSupport: "Поддержка клиентов",
    newsletter: "Рассылка",
    subscribe: "Подписаться",
    unsubscribe: "Отписаться",
    privacyPolicy: "Политика конфиденциальности",
    termsOfService: "Условия использования",
    faq: "Часто задаваемые вопросы",
    help: "Помощь",
    contactUs: "Связаться с нами",
    phoneNumber: "Номер телефона",
    emailAddress: "Email адрес",
    workingHours: "Рабочие часы",
    location: "Местоположение",
    followUs: "Следите за нами",
    socialMedia: "Социальные сети",
  },
}
