
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  features: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  images: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    category: "Electronics",
    description: "Experience premium sound quality with our flagship wireless headphones featuring active noise cancellation and 30-hour battery life.",
    features: ["Active Noise Cancellation", "30-hour battery", "Premium sound quality", "Wireless charging"],
    inStock: true,
    rating: 4.8,
    reviews: 124,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop"
    ]
  },
  {
    id: 2,
    name: "Smart Watch Series X",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    category: "Electronics",
    description: "The most advanced smartwatch with health monitoring, GPS tracking, and seamless connectivity.",
    features: ["Heart rate monitoring", "GPS tracking", "Water resistant", "7-day battery"],
    inStock: true,
    rating: 4.6,
    reviews: 89,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop"
    ]
  },
  {
    id: 3,
    name: "Designer Leather Bag",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    category: "Fashion",
    description: "Handcrafted leather bag made from premium materials, perfect for both casual and professional settings.",
    features: ["Genuine leather", "Handcrafted", "Multiple compartments", "Adjustable strap"],
    inStock: true,
    rating: 4.7,
    reviews: 156,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop"
    ]
  },
  {
    id: 4,
    name: "Professional Camera Lens",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
    category: "Photography",
    description: "Professional-grade camera lens with exceptional clarity and precision for professional photographers.",
    features: ["Professional grade", "Ultra-sharp clarity", "Weather sealed", "Fast autofocus"],
    inStock: true,
    rating: 4.9,
    reviews: 67,
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1555486332-f7a9ba92ae6c?w=400&h=300&fit=crop"
    ]
  },
  {
    id: 5,
    name: "Luxury Sunglasses",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
    category: "Fashion",
    description: "Premium sunglasses with UV protection and timeless design that complements any style.",
    features: ["UV protection", "Premium materials", "Timeless design", "Scratch resistant"],
    inStock: true,
    rating: 4.5,
    reviews: 98,
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop"
    ]
  },
  {
    id: 6,
    name: "Gaming Mechanical Keyboard",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
    category: "Electronics",
    description: "High-performance mechanical keyboard designed for gaming enthusiasts and professionals.",
    features: ["Mechanical switches", "RGB lighting", "Programmable keys", "Gaming optimized"],
    inStock: true,
    rating: 4.6,
    reviews: 203,
    images: [
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop"
    ]
  }
];

export const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Photography",
  "Home & Garden",
  "Sports",
  "Books"
];
