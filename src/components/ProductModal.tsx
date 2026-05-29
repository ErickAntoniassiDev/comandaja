import { useEffect, useState } from "react";
import type { Product } from "../types";
import { formatCurrency } from "../utils/format";
import { QuantityControl } from "./QuantityControl";

type ProductModalProps = {
  product: Product | null;
  onClose: () => void;
  onAdd: (productId: string, quantity: number, notes: string) => void;
};

export function ProductModal({ product, onClose, onAdd }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setNotes("");
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-charcoal/45 p-0 backdrop-blur-sm md:items-center md:p-6">
      <div className="max-h-[92vh] w-full overflow-hidden rounded-t-3xl bg-white shadow-lift md:max-w-2xl md:rounded-3xl">
        <div className="relative h-64 bg-surface-muted md:h-80">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl font-semibold text-ink shadow-soft"
            aria-label="Fechar"
          >
            x
          </button>
          {product.badge ? (
            <span className="absolute left-4 top-4 rounded-full bg-success-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-success">
              {product.badge}
            </span>
          ) : null}
        </div>

        <div className="max-h-[calc(92vh-16rem)] overflow-y-auto p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-ink">{product.name}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{product.description}</p>
            </div>
            <p className="whitespace-nowrap text-xl font-bold text-success">
              {formatCurrency(product.price)}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {(product.meta ?? ["Artesanal", "Feito na hora"]).map((meta) => (
              <span key={meta} className="rounded-lg bg-surface-muted px-3 py-1 text-xs font-medium text-muted">
                {meta}
              </span>
            ))}
          </div>

          <label className="mt-6 block text-sm font-semibold text-ink" htmlFor="product-notes">
            Observacoes
          </label>
          <textarea
            id="product-notes"
            value={notes}
            maxLength={200}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Ex: sem cebola, ponto da carne bem passado..."
            className="mt-2 min-h-28 w-full resize-none rounded-2xl border border-outline bg-background p-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
          <p className="mt-1 text-right text-xs text-muted">{notes.length}/200</p>
        </div>

        <div className="border-t border-outline/40 bg-white/85 p-4 backdrop-blur-xl md:p-5">
          <div className="flex items-center justify-between gap-4">
            <QuantityControl value={quantity} onChange={setQuantity} />
            <button
              type="button"
              onClick={() => {
                onAdd(product.id, quantity, notes);
                onClose();
              }}
              className="flex min-h-14 flex-1 items-center justify-center rounded-2xl bg-primary px-5 text-sm font-bold text-white shadow-soft transition active:scale-[0.99]"
            >
              Adicionar - {formatCurrency(product.price * quantity)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
