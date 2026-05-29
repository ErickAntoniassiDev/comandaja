import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { TopBar } from "../components/TopBar";
import { useCart } from "../hooks/useCart";
import { useRestaurantFromRoute } from "../hooks/useRestaurantFromRoute";
import type { Order } from "../types";
import { buildWhatsAppMessage, buildWhatsAppUrl, formatCurrency, getCartTotal } from "../utils/format";

function readOrder(id: string | undefined): Order | null {
  if (!id) return null;
  try {
    const stored = localStorage.getItem(`comandaja:order:${id}`);
    return stored ? (JSON.parse(stored) as Order) : null;
  } catch {
    return null;
  }
}

export function OrderConfirmationPage() {
  const restaurant = useRestaurantFromRoute();
  const { id } = useParams();
  const cart = useCart();
  const order = useMemo(() => readOrder(id), [id]);

  function sendToWhatsApp(whatsappUrl: string) {
    const openedWindow = window.open(whatsappUrl, "_blank");

    if (openedWindow) {
      cart.clearCart();
      return;
    }

    cart.clearCart();
    window.location.href = whatsappUrl;
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background text-ink">
        <TopBar restaurant={restaurant} cartCount={cart.count} />
        <main className="mx-auto max-w-lg px-4 pt-28 text-center">
          <h1 className="text-2xl font-extrabold">Pedido nao encontrado</h1>
          <Link to={`/r/${restaurant.slug}`} className="mt-5 inline-flex rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white">
            Voltar ao cardapio
          </Link>
        </main>
      </div>
    );
  }

  const total = getCartTotal(order.items, restaurant.products);
  const message = buildWhatsAppMessage({
    restaurant,
    items: order.items,
    checkout: order.checkout,
    orderId: order.id,
  });
  const whatsappUrl = buildWhatsAppUrl(restaurant, message);

  return (
    <div className="min-h-screen bg-background pb-32 text-ink">
      <TopBar restaurant={restaurant} cartCount={cart.count} />
      <main className="mx-auto max-w-lg px-4 pt-28">
        <section className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success-soft text-4xl font-bold text-success">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-10 w-10 fill-none stroke-current stroke-[2.5]">
              <path d="m5 13 4 4L19 7" />
            </svg>
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink">Pedido quase pronto</h1>
          <p className="mt-2 text-sm leading-6 text-muted">
            Agora envie a comanda para o restaurante pelo WhatsApp.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-outline/20 bg-white p-5 shadow-soft">
          <div className="flex items-center justify-between border-b border-outline/20 pb-4">
            <h2 className="font-bold text-ink">Pedido #{order.id}</h2>
            <span className="rounded-full bg-success-soft px-3 py-1 text-xs font-bold text-success">
              {formatCurrency(total)}
            </span>
          </div>
          <div className="mt-4 space-y-4">
            {order.items.map((item) => {
              const product = restaurant.products.find((entry) => entry.id === item.productId);
              if (!product) return null;
              return (
                <div key={item.id} className="flex gap-3">
                  <img src={product.image} alt="" className="h-14 w-14 rounded-2xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-semibold text-ink">
                        {item.quantity}x {product.name}
                      </p>
                      <p className="text-sm font-bold text-ink">{formatCurrency(product.price * item.quantity)}</p>
                    </div>
                    {item.notes ? <p className="mt-1 text-xs italic text-muted">{item.notes}</p> : null}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-3xl bg-primary p-5 text-white shadow-soft">
            <p className="text-xs font-bold uppercase tracking-wide text-white/70">Total</p>
            <p className="mt-3 text-2xl font-extrabold">{formatCurrency(total)}</p>
          </div>
          <div className="rounded-3xl border border-outline/20 bg-white p-5 shadow-soft">
            <p className="text-xs font-bold uppercase tracking-wide text-muted">Recebimento</p>
            <p className="mt-3 text-sm font-bold text-ink">
              {order.checkout.orderType === "table" && `Mesa ${order.checkout.tableNumber}`}
              {order.checkout.orderType === "pickup" && "Retirada"}
              {order.checkout.orderType === "delivery" && "Entrega"}
            </p>
          </div>
        </section>

        <section className="mt-4 rounded-3xl border border-outline/20 bg-white p-5 shadow-soft">
          <h2 className="font-bold text-ink">Dados do pedido</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Cliente</dt>
              <dd className="text-right font-semibold text-ink">{order.checkout.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">WhatsApp</dt>
              <dd className="text-right font-semibold text-ink">{order.checkout.whatsapp}</dd>
            </div>
            {order.checkout.orderType === "table" ? (
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Mesa</dt>
                <dd className="text-right font-semibold text-ink">{order.checkout.tableNumber}</dd>
              </div>
            ) : null}
            {order.checkout.orderType === "delivery" ? (
              <div>
                <dt className="text-muted">Endereco</dt>
                <dd className="mt-1 font-semibold leading-6 text-ink">{order.checkout.address}</dd>
              </div>
            ) : null}
            {order.checkout.generalNotes ? (
              <div>
                <dt className="text-muted">Observacoes gerais</dt>
                <dd className="mt-1 font-semibold leading-6 text-ink">{order.checkout.generalNotes}</dd>
              </div>
            ) : null}
          </dl>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-outline/20 bg-white/90 px-4 py-4 shadow-lift backdrop-blur-xl">
        <div className="mx-auto max-w-lg">
          <button
            type="button"
            onClick={() => sendToWhatsApp(whatsappUrl)}
            className="flex min-h-14 w-full items-center justify-center rounded-2xl bg-[#25D366] px-5 text-center text-sm font-extrabold uppercase tracking-wide text-white shadow-soft"
          >
            Enviar pedido no WhatsApp
          </button>
          <Link
            to={`/r/${restaurant.slug}`}
            className="mt-3 flex min-h-12 w-full items-center justify-center rounded-2xl bg-surface-muted px-5 text-center text-sm font-bold text-ink"
          >
            Voltar ao cardapio
          </Link>
          <p className="mt-2 text-center text-xs text-muted">O atendente recebera sua comanda completa.</p>
        </div>
      </div>
    </div>
  );
}
