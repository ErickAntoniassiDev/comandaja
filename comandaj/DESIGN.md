---
name: ComandaJá
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#44474a'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#75777a'
  outline-variant: '#c5c6ca'
  surface-tint: '#5d5e61'
  primary: '#000101'
  on-primary: '#ffffff'
  primary-container: '#1a1c1e'
  on-primary-container: '#838486'
  inverse-primary: '#c6c6c9'
  secondary: '#0453cd'
  on-secondary: '#ffffff'
  secondary-container: '#356ee7'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002114'
  on-tertiary-container: '#069669'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e5'
  primary-fixed-dim: '#c6c6c9'
  on-primary-fixed: '#1a1c1e'
  on-primary-fixed-variant: '#454749'
  secondary-fixed: '#dae2ff'
  secondary-fixed-dim: '#b2c5ff'
  on-secondary-fixed: '#001848'
  on-secondary-fixed-variant: '#0040a2'
  tertiary-fixed: '#85f8c4'
  tertiary-fixed-dim: '#68dba9'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style

The design system is engineered to elevate the digital presence of Brazilian snack bars and small restaurants from "utilitarian" to "premium." It targets tech-forward business owners and discerning customers who value speed, clarity, and aesthetic refinement. 

The visual language follows a **Minimalist Premium** approach, blending the high-density utility of professional SaaS (Stripe/Notion) with the rhythmic white space and tactile softness of premium hardware interfaces (Apple). The emotional response should be one of immediate trust, effortless efficiency, and culinary sophistication. By eschewing the aggressive red/yellow palettes typical of the delivery industry, this design system positions the brand as a sophisticated partner in the hospitality experience.

## Colors

The palette is anchored in a high-contrast, "Ink and Paper" foundation. 

- **Primary (#1A1C1E):** A deep, near-black charcoal used for primary text and structural elements. It provides a more sophisticated look than pure black.
- **Secondary (#0052CC):** A vibrant, deep indigo used for primary actions, links, and brand highlights. This replaces the standard "delivery red" to evoke a modern SaaS reliability.
- **Tertiary (#059669):** A forest green reserved for success states, "Order Ready" indicators, and price highlights, suggesting freshness and growth.
- **Neutral (#F9FAFB):** A clinical, cool-tinted gray base used for background surfaces to keep the interface feeling light and airy.

The default mode is `light` to ensure maximum readability in various restaurant lighting conditions, from bright morning cafes to dimly lit evening bistros.

## Typography

This design system utilizes **Inter** exclusively to achieve a clean, systematic, and highly legible interface. The type scale is optimized for fast scanning in a menu context.

- **Headlines:** Use tight letter-spacing and heavier weights to create a strong visual hierarchy for dish names and section titles.
- **Body:** Generous line heights ensure readability for long ingredient lists and descriptions.
- **Labels:** Used for categories (e.g., "BEBIDAS," "ENTRADAS") and metadata like calorie counts or prep time.
- **Mobile Scaling:** Large display titles are aggressively reduced on mobile to prevent awkward line breaks while maintaining their bold presence.

## Layout & Spacing

The layout philosophy is **Mobile-First for Customers** and **Sidebar-Centric for Admin**.

1. **Customer View:** A single-column fluid layout that prioritizes thumb-reach zones. Navigation is handled via a sticky bottom "Cart" bar and a horizontal scrollable category header.
2. **Admin View:** A 12-column grid with a fixed 280px left sidebar. The content area uses a fluid grid with a maximum width of 1440px to ensure the dashboard remains usable on large monitors.
3. **Spacing Rhythm:** Based on an 8px grid. Use `md` (24px) for most container padding to maintain the "premium" airy feel. 

**Breakpoints:**
- Mobile: 0 - 599px (16px margins)
- Tablet: 600 - 1023px (24px margins, 2-column menu items)
- Desktop: 1024px+ (32px margins, 3-4 column menu items)

## Elevation & Depth

To achieve the modern SaaS aesthetic, this design system uses **Tonal Layers** combined with **Ambient Shadows**.

- **Level 0 (Base):** The background color (#F9FAFB).
- **Level 1 (Cards/Surface):** Pure white (#FFFFFF) with a very soft, diffused shadow (0px 4px 20px rgba(0, 0, 0, 0.04)). This is the primary surface for menu items.
- **Level 2 (Modals/Popovers):** Pure white with a more defined shadow (0px 10px 32px rgba(0, 0, 0, 0.08)) to indicate interaction focus.
- **Level 3 (Sticky Elements):** Bottom bars and top navigators use a background blur (Glassmorphism) of 12px with a semi-transparent white fill (rgba(255, 255, 255, 0.8)) and a subtle 1px bottom border (#E5E7EB) instead of a shadow.

## Shapes

The shape language is defined by "Soft Precision." Elements are rounded enough to feel approachable and modern, but not so much that they feel "toy-like."

- **Standard Elements (Buttons, Inputs):** 0.5rem (8px) radius.
- **Primary Containers (Cards):** `rounded-lg` at 1rem (16px) radius. This applies to menu item cards and dashboard widgets.
- **Featured Elements:** `rounded-xl` at 1.5rem (24px) radius for large promotional banners or the "Add to Cart" sheet.

## Components

- **Buttons:** Primary buttons use the Secondary Color (#0052CC) with white text. They should have a subtle 1px inner highlight on the top edge to create a "tactile" feel. Secondary buttons use a light gray tint with Primary text.
- **Cards (Menu Items):** These are the heart of the system. Horizontal layout on mobile with a 80x80px image (12px radius) on the right. Vertically stacked on desktop. Title in `headline-sm`, price in `tertiary` green.
- **Chips (Badges):** Small, low-contrast pills for "Vegano," "Pimenta," or "Mais Pedido." Use a light version of the semantic color with darkened text (e.g., Light Green bg with Dark Green text).
- **Input Fields:** Minimalist design with a 1px border (#E5E7EB). On focus, the border transitions to the Secondary Color with a 3px soft outer glow.
- **Lists:** Clean, border-less lists with 16px vertical padding and a 1px divider that does not span the full width (inset by 16px).
- **Admin Sidebar:** Dark themed (#1A1C1E) with subtle active states using a semi-transparent white highlight and a 4px vertical pill indicator on the left edge.
- **Quantity Selector:** A custom component with "-" and "+" icons. Use a soft gray background for the entire unit to make it feel like a single physical control.