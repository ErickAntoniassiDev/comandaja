import { FormEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { TopBar } from "../components/TopBar";
import { useCart } from "../hooks/useCart";
import { useRestaurantFromRoute } from "../hooks/useRestaurantFromRoute";
import type { CheckoutInfo, OrderType } from "../types";
import { formatCurrency, getCartTotal } from "../utils/format";

const orderTypeLabels: Record<OrderType, string> = {
  table: "Mesa",
  pickup: "Retirada",
  delivery: "Entrega",
};

export function CheckoutPage() {
  const restaurant = useRestaurantFromRoute();
  const cart = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState<CheckoutInfo>({
    name: "",
    whatsapp: "",
    orderType: "table",
    tableNumber: "",
    address: "",
    generalNotes: "",
  });

  if (cart.items.length === 0) {
    return <Navigate to={`/r/${restaurant.slug}`} replace />;
  }

  const total = getCartTotal(cart.items, restaurant.products);

  function updateField<K extends keyof CheckoutInfo>(key: K, value: CheckoutInfo[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const orderId = Math.floor(1000 + Math.random() * 9000).toString();
    const order = {
      id: orderId,
      restaurantSlug: restaurant.slug,
      createdAt: new Date().toISOString(),
      items: cart.items,
      checkout: form,
    };

    localStorage.setItem(`comandaja:order:${orderId}`, JSON.stringify(order));
    localStorage.setItem("comandaja:lastPendingOrderId", orderId);
    navigate(`/r/${restaurant.slug}/order-confirmation/${orderId}`);
  }

  return (
    <div className="min-h-screen bg-background pb-32 text-ink">
      <TopBar restaurant={restaurant} cartCount={cart.count} />
      <main className="mx-auto max-w-5xl px-4 pb-8 pt-24 md:px-8">
        <Link to={`/r/${restaurant.slug}/cart`} className="text-sm font-semibold text-primary">
          Voltar ao carrinho
        </Link>
        <div className="mt-5">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink">Finalizar pedido</h1>
          <p className="mt-2 text-sm text-muted">Informe seus dados para montar a comanda do WhatsApp.</p>
        </div>

        <form onSubmit={submitOrder} className="mt-8 grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            <section className="rounded-3xl border border-outline/20 bg-white p-5 shadow-soft">
              <h2 className="text-lg font-bold text-ink">Seus dados</h2>
              <div className="mt-4 grid gap-4">
                <label className="block">
                  <span className="text-sm font-semibold text-muted">Nome completo</span>
                  <input
                    required
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    placeholder="Como quer ser chamado?"
                    className="mt-2 w-full rounded-2xl border border-outline bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-muted">WhatsApp</span>
                  <input
                    required
                    value={form.whatsapp}
                    onChange={(event) => updateField("whatsapp", event.target.value)}
                    placeholder="(11) 99999-8888"
                    className="mt-2 w-full rounded-2xl border border-outline bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-3xl border border-outline/20 bg-white p-5 shadow-soft">
              <h2 className="text-lg font-bold text-ink">Como vai pedir?</h2>
              <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-surface-muted p-1">
                {(Object.keys(orderTypeLabels) as OrderType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => updateField("orderType", type)}
                    className={`rounded-xl px-2 py-3 text-sm font-bold transition ${
                      form.orderType === type ? "bg-white text-primary shadow-soft" : "text-muted"
                    }`}
                  >
                    {orderTypeLabels[type]}
                  </button>
                ))}
              </div>

              {form.orderType === "table" ? (
                <label className="mt-4 block">
                  <span className="text-sm font-semibold text-muted">Numero da mesa</span>
                  <input
                    required
                    value={form.tableNumber}
                    onChange={(event) => updateField("tableNumber", event.target.value)}
                    placeholder="Ex: 12"
                    className="mt-2 w-full rounded-2xl border border-outline bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                </label>
              ) : null}

              {form.orderType === "delivery" ? (
                <label className="mt-4 block">
                  <span className="text-sm font-semibold text-muted">Endereco de entrega</span>
                  <textarea
                    required
                    value={form.address}
                    onChange={(event) => updateField("address", event.target.value)}
                    placeholder="Rua, numero, complemento e bairro..."
                    className="mt-2 min-h-24 w-full resize-none rounded-2xl border border-outline bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                </label>
              ) : null}

              {form.orderType === "pickup" ? (
                <div className="mt-4 rounded-2xl border border-primary/20 bg-primary-soft/70 p-4">
                  <p className="text-sm font-bold text-primary">Retirada em 15 a 20 min</p>
                  <p className="mt-1 text-sm text-muted">Seu pedido sera separado no balcao.</p>
                </div>
              ) : null}
            </section>

            <section className="rounded-3xl border border-outline/20 bg-white p-5 shadow-soft">
              <label className="block">
                <span className="text-lg font-bold text-ink">Observacoes gerais</span>
                <textarea
                  value={form.generalNotes}
                  onChange={(event) => updateField("generalNotes", event.target.value)}
                  placeholder="Alguma restricao, troco ou pedido especial?"
                  className="mt-3 min-h-28 w-full resize-none rounded-2xl border border-outline bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>
            </section>
          </div>

          <aside className="h-fit rounded-3xl border border-outline/20 bg-white p-5 shadow-soft lg:sticky lg:top-24">
            <h2 className="text-lg font-bold text-ink">Resumo</h2>
            <div className="mt-4 space-y-3">
              {cart.items.map((item) => {
                const product = restaurant.products.find((entry) => entry.id === item.productId);
                if (!product) return null;
                return (
                  <div key={item.id} className="flex justify-between gap-4 text-sm">
                    <span className="text-muted">
                      {item.quantity}x {product.name}
                    </span>
                    <span className="font-semibold text-ink">{formatCurrency(product.price * item.quantity)}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 border-t border-outline/30 pt-5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-muted">Total</span>
                <span className="text-2xl font-extrabold text-ink">{formatCurrency(total)}</span>
              </div>
            </div>
            <button
              type="submit"
              className="mt-5 w-full rounded-2xl bg-primary px-5 py-4 text-sm font-bold text-white shadow-soft transition active:scale-[0.99]"
            >
              Confirmar pedido
            </button>
          </aside>
        </form>
      </main>
    </div>
  );
}
