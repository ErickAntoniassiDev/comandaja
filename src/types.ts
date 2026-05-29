export type Product = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
  meta?: string[];
};

export type Category = {
  id: string;
  name: string;
};

export type Restaurant = {
  slug: string;
  name: string;
  tagline: string;
  whatsapp: string;
  status: "open" | "closed";
  heroImage: string;
  logoUrl: string;
  address: string;
  categories: Category[];
  products: Product[];
};

export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  notes: string;
};

export type OrderType = "table" | "pickup" | "delivery";

export type CheckoutInfo = {
  name: string;
  whatsapp: string;
  orderType: OrderType;
  tableNumber?: string;
  address?: string;
  generalNotes?: string;
};

export type Order = {
  id: string;
  restaurantSlug: string;
  createdAt: string;
  items: CartItem[];
  checkout: CheckoutInfo;
};
