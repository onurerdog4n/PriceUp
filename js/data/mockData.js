/**
 * Mock Data for Product Comparison
 * Contains sample data for the product comparison widget
 */
export const storeOrder = [
  "Aynet",
  "Trendyol",
  "Hepsiburada",
  "Amazon",
  "Mediamarkt"
];

export const storeLogos = {
  "Aynet": "https://www.aynet.com.tr/img/aynet_logo.png",
  "Trendyol": "https://cdn.dsmcdn.com/web/logo/ty-web.svg",
  "Hepsiburada": "https://www.hepsiburada.com/assets/images/hepsiburada-logo@2x.png",
  "Amazon": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
  "Mediamarkt": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/MediaMarkt_logo.svg/2560px-MediaMarkt_logo.svg.png"
};

export const productsData = [
  {
    id: 1,
    name: "MacBook Air 13.3 inc M1 8CPU 7GPU 8GB 256GB Altın MGN93TU/A",
    brand: "Apple",
    sku: "MGN93TU/A",
    price: "35,499.00₺",
    stock: 12,
    date: "06/01/2025 05:00",
    image: "https://i0.wp.com/www.pt.com.tr/wp-content/uploads/2024/08/MacBook_Air_UzayGrisi.webp?w=500&quality=80&ssl=1",
    skuLowest: {
      store: "Hepsiburada",
      price: "300,499.00₺",
      performance: "-5%",
      trend: "down",
      seller: "TicaretiVitrin",
      date: "06/01/2025 05:00"
    },
    stores: [
      {
        name: "Aynet",
        price: "33,239.00₺",
        date: "06/01/2025 05:00",
        seller: "",
        hasShipping: true,
        hasTag: true,
        storeCount: 2,
        hasUrl: true
      },
      {
        name: "Trendyol",
        price: "33,239.00₺",
        date: "06/01/2025 05:00",
        seller: "Online Net Sipariş",
        sellerIcon: "fa-solid fa-globe",
        hasShipping: true,
        hasTag: true,
        storeCount: 8,
        hasUrl: true
      },
      {
        name: "Hepsiburada",
        price: "32,499.00₺",
        date: "06/01/2025 05:00",
        seller: "Raysonel",
        sellerIcon: "fa-solid fa-store",
        hasShipping: true,
        hasTag: true,
        isLowestPrice: true,
        hasUrl: true
      },
      {
        name: "Amazon",
        price: "33,239.00₺",
        date: "06/01/2025 05:00",
        seller: "Amazon",
        sellerIcon: "fa-brands fa-amazon",
        hasShipping: true,
        hasTag: true,
        storeCount: 2,
        hasUrl: true
      },
      {
        name: "Mediamarkt",
        price: "33,239.00₺",
        date: "06/01/2025 05:00",
        seller: "",
        hasShipping: true,
        hasTag: true,
        storeCount: 2,
        hasUrl: true
      }
    ]
  },
  {
    id: 2,
    name: "MacBook Air 13.3 inc M1 8CPU 7GPU 8GB 256GB Altın MGN93TU/A",
    brand: "Apple",
    sku: "MGN93TU/A",
    price: "35,499.00₺",
    stock: 12,
    date: "06/01/2025 05:00",
    image: "https://i0.wp.com/www.pt.com.tr/wp-content/uploads/2024/08/MacBook_Air_UzayGrisi.webp?w=500&quality=80&ssl=1",
    skuLowest: {
      store: "Trendyol",
      price: "300,499.00₺",
      performance: "+100%",
      trend: "up",
      seller: "Raysonel",
      date: "06/01/2025 05:00"
    },
    stores: [
      {
        name: "Aynet",
        price: "NO DATA",
        date: "06/01/2025 05:00",
        noData: true,
        errorMessage: "Url yok",
        hasUrl: false
      },
      {
        name: "Trendyol",
        price: "33,239.00₺",
        date: "06/01/2025 05:00",
        seller: "Online Net Sipariş",
        sellerIcon: "fa-solid fa-globe",
        hasShipping: true,
        hasTag: true,
        storeCount: 2,
        hasUrl: true
      },
      {
        name: "Hepsiburada",
        price: "32,499.00₺",
        date: "06/01/2025 05:00",
        seller: "Raysonel",
        sellerIcon: "fa-solid fa-store",
        hasShipping: true,
        hasTag: true,
        isLowestPrice: true,
        hasUrl: true
      },
      {
        name: "Amazon",
        price: "33,239.00₺",
        date: "06/01/2025 05:00",
        seller: "Amazon",
        sellerIcon: "fa-brands fa-amazon",
        hasShipping: true,
        hasTag: true,
        storeCount: 5,
        hasUrl: true
      },
      {
        name: "Mediamarkt",
        price: "33,239.00₺",
        date: "06/01/2025 05:00",
        seller: "",
        hasShipping: true,
        hasTag: true,
        storeCount: 3,
        hasUrl: true
      }
    ]
  },
  {
    id: 3,
    name: "MacBook Air 13.3 inc M1 8CPU 7GPU 8GB 256GB Altın MGN93TU/A",
    brand: "Apple",
    sku: "MGN93TU/A",
    price: "35,499.00₺",
    stock: 12,
    date: "06/01/2025 05:00",
    image: "https://i0.wp.com/www.pt.com.tr/wp-content/uploads/2024/08/MacBook_Air_UzayGrisi.webp?w=500&quality=80&ssl=1",
    skuLowest: {
      store: "Trendyol",
      price: "300,499.00₺",
      performance: "+100%",
      trend: "up",
      seller: "Raysonel",
      date: "06/01/2025 05:00"
    },
    stores: [
      {
        name: "Aynet",
        price: "NO DATA",
        date: "06/01/2025 05:00",
        noData: true,
        errorMessage: "Url yok",
        hasUrl: false
      },
      {
        name: "Trendyol",
        price: "33,239.00₺",
        date: "06/01/2025 05:00",
        seller: "Online Net Sipariş",
        sellerIcon: "fa-solid fa-globe",
        hasShipping: true,
        hasTag: true,
        storeCount: 2,
        hasUrl: true
      },
      {
        name: "Hepsiburada",
        price: "32,499.00₺",
        date: "06/01/2025 05:00",
        seller: "Raysonel",
        sellerIcon: "fa-solid fa-store",
        hasShipping: true,
        hasTag: true,
        isLowestPrice: true,
        hasUrl: true
      },
      {
        name: "Amazon",
        price: "33,239.00₺",
        date: "06/01/2025 05:00",
        seller: "Amazon",
        sellerIcon: "fa-brands fa-amazon",
        hasShipping: true,
        hasTag: true,
        storeCount: 5,
        hasUrl: true
      },
      {
        name: "Mediamarkt",
        price: "33,239.00₺",
        date: "06/01/2025 05:00",
        seller: "",
        hasShipping: true,
        hasTag: true,
        storeCount: 3,
        hasUrl: true
      }
    ]
  }
];
