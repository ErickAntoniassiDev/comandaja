import { useCallback, useEffect, useMemo, useState } from "react";
import type { CartItem } from "../types";

const storageKey = "comandaja:cart";

function readCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(storageKey);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => readCart());

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((productId: string, quantity: number, notes: string) => {
    setItems((current) => [
      ...current,
      {
        id: `${productId}-${Date.now()}`,
        productId,
        quantity,
        notes: notes.trim(),
      },
    ]);
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const count = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  return { items, count, addItem, updateQuantity, removeItem, clearCart };
}
