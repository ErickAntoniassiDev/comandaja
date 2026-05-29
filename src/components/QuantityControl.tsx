type QuantityControlProps = {
  value: number;
  onChange: (value: number) => void;
  compact?: boolean;
};

export function QuantityControl({ value, onChange, compact = false }: QuantityControlProps) {
  const size = compact ? "h-9 w-9" : "h-11 w-11";

  return (
    <div className="inline-flex items-center rounded-full bg-surface-muted p-1">
      <button
        type="button"
        className={`${size} rounded-full bg-white/70 text-xl leading-none text-ink transition active:scale-95`}
        onClick={() => onChange(Math.max(1, value - 1))}
        aria-label="Diminuir quantidade"
      >
        -
      </button>
      <span className="min-w-10 text-center text-sm font-semibold text-ink">{value}</span>
      <button
        type="button"
        className={`${size} rounded-full bg-white text-xl leading-none text-ink shadow-sm transition active:scale-95`}
        onClick={() => onChange(value + 1)}
        aria-label="Aumentar quantidade"
      >
        +
      </button>
    </div>
  );
}
