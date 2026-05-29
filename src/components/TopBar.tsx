import { Link } from "react-router-dom";
import { CartIcon } from "./CartIcon";
import type { Restaurant } from "../types";

type TopBarProps = {
  restaurant: Restaurant;
  cartCount?: number;
};

export function TopBar({ restaurant, cartCount = 0 }: TopBarProps) {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-outline/30 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:px-8">
        <Link to={`/r/${restaurant.slug}`} className="flex min-w-0 flex-1 items-center">
          <img
            src={restaurant.logoUrl}
            alt="ComandaJá"
            className="h-8 w-auto max-w-[9.5rem] object-contain object-left sm:h-9 sm:max-w-[11rem]"
          />
        </Link>
        <Link
          to={`/r/${restaurant.slug}/cart`}
          className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-outline/15 bg-white text-ink shadow-soft transition ${
            cartCount > 0 ? "ring-2 ring-primary/15" : ""
          }`}
          aria-label={cartCount > 0 ? `Abrir carrinho, ${cartCount} itens` : "Abrir carrinho"}
        >
          <CartIcon />
          {cartCount > 0 ? (
            <span className="absolute -right-0.5 -top-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-white ring-2 ring-background">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          ) : null}
        </Link>
      </div>
    </header>
  );
}
