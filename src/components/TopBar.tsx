import { Link } from "react-router-dom";
import type { Restaurant } from "../types";

type TopBarProps = {
  restaurant: Restaurant;
  cartCount?: number;
};

export function TopBar({ restaurant, cartCount = 0 }: TopBarProps) {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-outline/30 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:px-8">
        <Link to={`/r/${restaurant.slug}`} className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
          <img src={restaurant.logoUrl} alt="" className="h-8 w-8 shrink-0 rounded-lg object-cover" />
          <span className="truncate text-lg font-extrabold tracking-tight text-ink sm:text-xl">
            {restaurant.name}
          </span>
        </Link>
        <Link
          to={`/r/${restaurant.slug}/cart`}
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-soft"
          aria-label="Abrir carrinho"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
            <path d="M6 7h15l-2 8H8L6 7Z" />
            <path d="M6 7 5 3H2" />
            <path d="M9 20h.01" />
            <path d="M18 20h.01" />
          </svg>
          {cartCount > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-white">
              {cartCount}
            </span>
          ) : null}
        </Link>
      </div>
    </header>
  );
}
