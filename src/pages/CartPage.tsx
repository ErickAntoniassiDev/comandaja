import { Link } from "react-router-dom";
import { QuantityControl } from "../components/QuantityControl";
import { TopBar } from "../components/TopBar";
import { useCart } from "../hooks/useCart";
import { useRestaurantFromRoute } from "../hooks/useRestaurantFromRoute";
import { formatCurrency, getCartTotal } from "../utils/format";

export function CartPage() {
  const restaurant = useRestaurantFromRoute();
  const cart = useCart();
  const total = getCartTotal(cart.items, restaurant.products);

  return (
    <div className="min-h-screen bg-background pb-32 text-ink">
      <TopBar restaurant={restaurant} cartCount={cart.count} />
      <main className="mx-auto max-w-4xl px-4 pb-8 pt-24 md:px-8">
        <Link to={`/r/${restaurant.slug}`} className="text-sm font-semibold text-primary">
          Voltar ao cardapio
        </Link>
        <div className="mt-5">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink">Meu pedido</h1>
          <p className="mt-2 text-sm text-muted">Confira os itens antes de finalizar.</p>
        </div>

        {cart.items.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-outline/20 bg-white p-8 text-center shadow-soft">
            <p className="text-lg font-bold text-ink">Seu carrinho esta vazio.</p>
            <Link
              to={`/r/${restaurant.slug}`}
              className="mt-5 inline-flex rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white"
            >
              Escolher produtos
            </Link>
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-3xl border border-outline/20 bg-white shadow-soft">
            <div className="border-b border-outline/20 p-5">
              <p className="font-bold text-ink">Itens escolhidos</p>
            </div>
            <div className="divide-y divide-outline/20">
              {cart.items.map((item) => {
                const product = restaurant.products.find((entry) => entry.id === item.productId);
                if (!product) return null;
                return (
                  <div key={item.id} className="flex gap-4 p-4 md:p-5">
                    <img src={product.image} alt="" className="h-20 w-20 rounded-2xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="font-bold text-ink">{product.name}</h2>
                          {item.notes ? <p className="mt-1 text-xs italic text-muted">{item.notes}</p> : null}
                        </div>
                        <p className="whitespace-nowrap text-sm font-bold text-success">
                          {formatCurrency(product.price * item.quantity)}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <QuantityControl
                          compact
                          value={item.quantity}
                          onChange={(quantity) => cart.updateQuantity(item.id, quantity)}
                        />
                        <button
                          type="button"
                          onClick={() => cart.removeItem(item.id)}
                          className="text-sm font-semibold text-danger"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {cart.items.length > 0 ? (
        <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-outline/20 bg-white/90 px-4 py-4 shadow-lift backdrop-blur-xl">
          <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Subtotal</p>
              <p className="text-2xl font-extrabold text-ink">{formatCurrency(total)}</p>
            </div>
            <Link
              to={`/r/${restaurant.slug}/checkout`}
              className="rounded-2xl bg-primary px-6 py-4 text-sm font-bold text-white shadow-soft"
            >
              Finalizar
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
