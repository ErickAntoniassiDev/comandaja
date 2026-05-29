import type { CartItem, CheckoutInfo, Product, Restaurant } from "../types";

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export const getCartTotal = (items: CartItem[], products: Product[]) =>
  items.reduce((total, item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return total + (product?.price ?? 0) * item.quantity;
  }, 0);

export const normalizePhone = (phone: string) => phone.replace(/\D/g, "");

export function buildWhatsAppMessage(args: {
  restaurant: Restaurant;
  items: CartItem[];
  checkout: CheckoutInfo;
  orderId: string;
}) {
  const { restaurant, items, checkout, orderId } = args;
  const lines = [
    `*Novo pedido - ${restaurant.name}*`,
    `Pedido: #${orderId}`,
    "",
    "*Itens*",
    ...items.map((item) => {
      const product = restaurant.products.find((entry) => entry.id === item.productId);
      const itemTotal = (product?.price ?? 0) * item.quantity;
      const notes = item.notes ? `\n   Obs: ${item.notes}` : "";
      return `${item.quantity}x ${product?.name ?? "Item"} - ${formatCurrency(itemTotal)}${notes}`;
    }),
    "",
    `*Total:* ${formatCurrency(getCartTotal(items, restaurant.products))}`,
    "",
    "*Cliente*",
    `Nome: ${checkout.name}`,
    `WhatsApp: ${checkout.whatsapp}`,
    "",
    "*Forma de recebimento*",
    checkout.orderType === "table" ? `Mesa ${checkout.tableNumber || "nao informada"}` : "",
    checkout.orderType === "pickup" ? "Retirada no balcao" : "",
    checkout.orderType === "delivery" ? `Entrega: ${checkout.address || "endereco nao informado"}` : "",
    checkout.generalNotes ? `\nObservacoes gerais: ${checkout.generalNotes}` : "",
  ].filter(Boolean);

  return lines.join("\n");
}

export function buildWhatsAppUrl(restaurant: Restaurant, message: string) {
  return `https://wa.me/${normalizePhone(restaurant.whatsapp)}?text=${encodeURIComponent(message)}`;
}
