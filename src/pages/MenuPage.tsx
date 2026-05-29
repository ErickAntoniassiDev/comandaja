import { useEffect, useMemo, useRef, useState } from "react";
import { ProductModal } from "../components/ProductModal";
import { TopBar } from "../components/TopBar";
import { useCart } from "../hooks/useCart";
import { useRestaurantFromRoute } from "../hooks/useRestaurantFromRoute";
import type { Product } from "../types";
import { formatCurrency } from "../utils/format";

function getDefaultCategoryId(
  categories: { id: string }[],
  products: { categoryId: string }[],
): string {
  const withProducts = categories.find((category) =>
    products.some((product) => product.categoryId === category.id),
  );
  return withProducts?.id ?? categories[0]?.id ?? "";
}

export function MenuPage() {
  const restaurant = useRestaurantFromRoute();
  const cart = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState(() =>
    getDefaultCategoryId(restaurant.categories, restaurant.products),
  );
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeCategoryMeta = restaurant.categories.find((category) => category.id === activeCategory);

  const visibleProducts = useMemo(
    () => restaurant.products.filter((product) => product.categoryId === activeCategory),
    [restaurant.products, activeCategory],
  );

  useEffect(() => {
    tabRefs.current[activeCategory]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-background pb-8 text-ink">
      <TopBar restaurant={restaurant} cartCount={cart.count} />

      <section className="pt-16">
        <div className="relative h-48 overflow-hidden sm:h-56 md:h-72">
          <img src={restaurant.heroImage} alt={restaurant.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 mx-auto max-w-6xl md:bottom-5 md:left-8 md:right-8">
            <span className="rounded-full bg-success-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-success">
              Aberto agora
            </span>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:mt-3 sm:text-3xl md:text-5xl">
              {restaurant.name}
            </h1>
            <p className="mt-1 line-clamp-2 text-sm leading-5 text-white/90 sm:mt-2 sm:leading-6 md:text-base">
              {restaurant.tagline}
            </p>
          </div>
        </div>
      </section>

      <nav
        className="sticky top-16 z-40 border-b border-outline/20 bg-background/95 backdrop-blur-xl"
        aria-label="Categorias do cardapio"
      >
        <div
          className="hide-scrollbar mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 md:gap-3 md:px-8 md:py-4"
          role="tablist"
        >
          {restaurant.categories.map((category) => {
            const isActive = activeCategory === category.id;
            const hasProducts = restaurant.products.some((product) => product.categoryId === category.id);
            if (!hasProducts) return null;

            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                ref={(node) => {
                  tabRefs.current[category.id] = node;
                }}
                onClick={() => setActiveCategory(category.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-charcoal text-white shadow-soft"
                    : "bg-white text-muted shadow-soft hover:bg-surface-muted"
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8">
        <div key={activeCategory} className="category-fade-in">
          <h2 className="mb-4 text-xl font-bold tracking-tight text-ink">
            {activeCategoryMeta?.name ?? "Cardapio"}
          </h2>

          {visibleProducts.length === 0 ? (
            <p className="rounded-2xl border border-outline/20 bg-white p-6 text-center text-sm text-muted shadow-soft">
              Nenhum item disponivel nesta categoria.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
              {visibleProducts.map((product) => (
                <button
                  type="button"
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="group flex w-full min-w-0 items-start gap-3 rounded-2xl border border-outline/20 bg-white p-3.5 text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift sm:gap-4 sm:p-4"
                >
                  <div className="min-w-0 flex-1">
                    {product.badge ? (
                      <span className="mb-2 inline-flex rounded-md bg-success-soft px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-success">
                        {product.badge}
                      </span>
                    ) : null}
                    <h3 className="text-base font-bold text-ink">{product.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted sm:leading-6">{product.description}</p>
                    <p className="mt-2 text-lg font-bold text-success sm:mt-3">{formatCurrency(product.price)}</p>
                  </div>
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface-muted sm:h-24 sm:w-24 sm:rounded-2xl md:h-28 md:w-28">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAdd={cart.addItem}
      />
    </div>
  );
}
