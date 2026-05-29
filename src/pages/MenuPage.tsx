import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ProductModal } from "../components/ProductModal";
import { TopBar } from "../components/TopBar";
import { useCart } from "../hooks/useCart";
import { useRestaurantFromRoute } from "../hooks/useRestaurantFromRoute";
import type { Product } from "../types";
import { formatCurrency, getCartTotal } from "../utils/format";

export function MenuPage() {
  const restaurant = useRestaurantFromRoute();
  const cart = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const total = useMemo(() => getCartTotal(cart.items, restaurant.products), [cart.items, restaurant.products]);

  return (
    <div className="min-h-screen bg-background pb-32 text-ink">
      <TopBar restaurant={restaurant} cartCount={cart.count} />

      <section className="pt-16">
        <div className="relative h-56 overflow-hidden md:h-72">
          <img src={restaurant.heroImage} alt={restaurant.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-5 left-4 right-4 mx-auto max-w-6xl md:left-8 md:right-8">
            <span className="rounded-full bg-success-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-success">
              Aberto agora
            </span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              {restaurant.name}
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/90 md:text-base">{restaurant.tagline}</p>
          </div>
        </div>
      </section>

      <nav className="sticky top-16 z-30 border-b border-outline/20 bg-background/95 px-4 py-4 backdrop-blur-xl">
        <div className="hide-scrollbar mx-auto flex max-w-6xl gap-3 overflow-x-auto">
          {restaurant.categories.map((category, index) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
                index === 0 ? "bg-charcoal text-white" : "bg-white text-muted shadow-soft"
              }`}
            >
              {category.name}
            </a>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        {restaurant.categories.map((category) => {
          const products = restaurant.products.filter((product) => product.categoryId === category.id);
          if (products.length === 0) return null;

          return (
            <section key={category.id} id={category.id} className="mb-12 scroll-mt-36">
              <h2 className="mb-4 text-xl font-bold tracking-tight text-ink">{category.name}</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <button
                    type="button"
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="group flex min-h-36 items-start gap-4 rounded-2xl border border-outline/20 bg-white p-4 text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
                  >
                    <div className="min-w-0 flex-1">
                      {product.badge ? (
                        <span className="mb-2 inline-flex rounded-md bg-success-soft px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-success">
                          {product.badge}
                        </span>
                      ) : null}
                      <h3 className="text-base font-bold text-ink">{product.name}</h3>
                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted">{product.description}</p>
                      <p className="mt-3 text-lg font-bold text-success">{formatCurrency(product.price)}</p>
                    </div>
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-surface-muted md:h-28 md:w-28">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {cart.count > 0 ? (
        <div className="fixed bottom-4 left-4 right-4 z-30 mx-auto max-w-md rounded-2xl border border-white/60 bg-white/90 p-3 shadow-lift backdrop-blur-xl">
          <Link
            to={`/r/${restaurant.slug}/cart`}
            className="flex min-h-14 items-center justify-between rounded-xl bg-primary px-5 text-sm font-bold text-white"
          >
            <span>Ver carrinho - {cart.count} item{cart.count > 1 ? "s" : ""}</span>
            <span>{formatCurrency(total)}</span>
          </Link>
        </div>
      ) : null}

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAdd={cart.addItem}
      />
    </div>
  );
}
