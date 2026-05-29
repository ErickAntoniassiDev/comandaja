import type { Restaurant } from "../types";

export const restaurant: Restaurant = {
  slug: "sabor-premium",
  name: "SaborPremium",
  tagline: "Culinaria artesanal com ingredientes selecionados para uma experiencia rapida, elegante e memoravel.",
  whatsapp: "5514998011782",
  status: "open",
  address: "Rua das Flores, 123 - Vila Mariana, Sao Paulo",
  logoUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAYOBLfvsRhQwN3yHHvvrUptL6GYUbP7gCkQVjoUkhbVIW2jTXCicI3SENutPiUAErSzHJTWqMR0U4qpR_MelChl31_Wnb289zZd83TNTaGF4KNIxRyWXbptNUgAYfUBdVYvJ7wqzaXB6mqemL-0AQvbkOXAXFq_pBNGB6ogCF0RgDwPPunJlf608ObUc9WqY1CY8UCuGH-mBbKVA5H4IEnFYWnFZ-9ftu6UHWpd6SS3OPG-wynbCjqgbSlPyK0f79WU4OkXN9yejbT",
  heroImage:
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1600&q=80",
  categories: [
    { id: "lanches", name: "Lanches" },
    { id: "bebidas", name: "Bebidas" },
    { id: "sobremesas", name: "Sobremesas" },
    { id: "combos", name: "Combos" },
  ],
  products: [
    {
      id: "smash-premium",
      categoryId: "lanches",
      name: "Smash Burger Premium",
      description:
        "Pao brioche artesanal, dois blends angus, cheddar ingles, picles da casa e maionese trufada.",
      price: 38.9,
      badge: "Mais pedido",
      meta: ["20-25 min", "Angus"],
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "chicken-crispy",
      categoryId: "lanches",
      name: "Chicken Crispy Deluxe",
      description:
        "File de frango empanado na panko, alface americana, queijo prato e molho honey mustard.",
      price: 34,
      meta: ["18-22 min"],
      image:
        "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "veggie-garden",
      categoryId: "lanches",
      name: "Veggie Garden",
      description:
        "Hamburguer de grao-de-bico com especiarias, tomate seco, rucula e pao integral selado.",
      price: 36.5,
      badge: "Vegano",
      meta: ["Vegano", "Leve"],
      image:
        "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "rustic-fries",
      categoryId: "combos",
      name: "Batata Rustica",
      description:
        "Batatas douradas com sal de ervas, alecrim fresco e maionese da casa.",
      price: 18,
      meta: ["Compartilha"],
      image:
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "pink-lemonade",
      categoryId: "bebidas",
      name: "Pink Lemonade",
      description:
        "Limonada siciliana batida com framboesas frescas, hortela e bastante gelo.",
      price: 18,
      image:
        "https://images.unsplash.com/photo-1523371683702-9148913f35f4?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "cold-brew",
      categoryId: "bebidas",
      name: "Cafe Cold Brew",
      description:
        "Graos 100% arabica extraidos a frio por 18 horas. Intenso, macio e refrescante.",
      price: 16.5,
      image:
        "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "chocolate-mousse",
      categoryId: "sobremesas",
      name: "Mousse Belga",
      description:
        "Chocolate belga meio amargo, creme aerado e flor de sal para finalizar.",
      price: 22,
      badge: "Novo",
      image:
        "https://images.unsplash.com/photo-1511715112108-9acc2e3f1c18?auto=format&fit=crop&w=900&q=80",
    },
  ],
};

export const restaurants = [restaurant];
