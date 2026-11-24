@AGENTS.md

# Pml Coffee — website

Site for **Pml Coffee**, a café that introduces itself and sells coffee online: drinks (pickup or local
delivery) and packaged beans/ground coffee (nationwide). Guest checkout, payment on delivery / at the
counter (COD). Name lives in `site.name`. All visible copy is Vietnamese (`<html lang="vi">`).
Keep pages about the café, its products and ordering. No wholesale, careers, events, loyalty or newsletter.

- Stack: Next.js 16 (App Router, `cacheComponents` on), React 19, TypeScript, Tailwind CSS v4,
  **shadcn/ui** (Radix, `radix-nova` style), zustand (cart), react-hook-form + zod (forms), Embla (carousel), Sonner (toasts), lucide-react (icons).
- Commands: `npm run dev`, `npm run build`, `npm run lint`, `npx tsc --noEmit`, `npx next typegen` (route types after adding routes).
- Tailwind v4 has **no `tailwind.config.ts`**. Tokens live in `app/globals.css`.
- **Roadmap:** UI is complete with stand-in data. Next: Sanity CMS replaces `lib/catalog.ts`, `lib/content.ts`
  and `lib/site.ts` (keep the async getters' signatures); later a Neon backend for orders (the forms have `TODO(phase 2)`).

## Prefer libraries over hand-written components

The user wants third-party components rather than custom code. Reach for shadcn/ui first
(`npx shadcn@latest add <name>`, files land in `components/ui/`), then another established library.
`components/ui/` is vendor code (ignored by ESLint): restyle via tokens in `globals.css` or `className`
at the call site; only edit the file for design-system defaults (button variants, input height, Vietnamese sr-only labels).

## Files

| Path | Role |
|---|---|
| `app/layout.tsx` | Root: fonts (Be Vietnam Pro + Newsreader, `vietnamese` subset), metadata title template |
| `app/(site)/layout.tsx` | Wraps every page in `SiteShell` (announcement bar, footer, cart sheet, toaster) |
| `app/(site)/**/page.tsx` | One file per page (see **Pages**) |
| `app/not-found.tsx` | Unmatched URLs (outside the group, so it wraps `SiteShell` itself) |
| `components/site/` | Site components: `site-nav`, `mobile-nav`, `cart-*`, `product-card` (`ProductGrid`), `page-intro` (+ breadcrumb), `visit-section`, `faq-list`, `space-carousel`, `testimonials`, `add-to-cart`, `contact-form`, `checkout-form`, `order-confirmation`, `reveal`, `fit-text` |
| `components/ui/` | shadcn/ui (generated) |
| `lib/site.ts` | Business facts + `navLinks`. Every `[bracketed]` value is a placeholder |
| `lib/catalog.ts` | Categories, products (drink / food / bean), option groups, async getters, price helpers. Prices are placeholders |
| `lib/content.ts` | Shared editorial copy: space photos, testimonials, promises, FAQs |
| `lib/cart.ts` | zustand cart store persisted to localStorage (`skipHydration`, rehydrated in `CartSheet`; use `useCartHydrated()` before reading it) |
| `lib/styles.ts` | Style primitives: `gutter`, `serifDisplay`, `sectionTitle`, `pageTitle`, `eyebrow`, `focusRing`, `linkUnderline`, `imageZoom` |
| `lib/format.ts`, `lib/validation.ts` | `formatPrice` (VND), `phoneSchema` (VN phone) |
| `app/globals.css` | Café tokens (`@theme`), shadcn semantic tokens mapped to them, `.reveal`, `.font-serif em` |
| `public/images/` | Photos from Pexels (free licence), imported statically for `placeholder="blur"` |

## Pages

| Route | Content |
|---|---|
| `/` | Hero (photo, overlaid nav) · featured drinks (`bg-paper`) · About band (`bg-coffee`) · Beans teaser 50/50 + 3 beans (`bg-cream`) · Space carousel (`bg-espresso`) · Testimonials (`bg-cream`) · Order FAQ (`bg-paper`) · Visit (`bg-latte`) |
| `/thuc-don` | Drinks + food with category Tabs (`Tất cả / Cà phê / Trà / Bánh`), CTA strip to beans |
| `/ca-phe-hat` | Beans grid · promises strip · brew guide 50/50 · shipping FAQ |
| `/san-pham/[slug]` | Sticky photo 50/50, option ToggleGroups, live price, quantity, add to cart (toast), facts table, related |
| `/ve-quan` | Photo hero · story · facts strip · values 50/50 · team 50/50 · space carousel · CTA |
| `/lien-he` | Channels list + contact form · Visit section · visit FAQ |
| `/thanh-toan` | Checkout form (name, phone, pickup/delivery, address, time, note, COD) + order summary |
| `/dat-hang-thanh-cong` | Confirmation of the order just placed (from the cart store) |
| `/chinh-sach` | Shipping, payment, returns, storage |

Every page renders `<SiteNav active="…">` itself (`variant="overlay"` only on the home hero). The nav takes
`active` as a prop instead of `usePathname`, which would suspend on dynamic routes under `cacheComponents`.

## Design system

Editorial, photo-led look (inspired by specialty roaster sites) in a **warm charcoal, rust, sand and
bone-white** palette (tone taken from Assembly Coffee; colours only, not their layout, fonts or brand).
No blue anywhere. Do not drift back to generic "SaaS landing" patterns (pill buttons, big rounded
cards, pastel tiles, heavy bold headings, centered 1200px boxes).

### Colors (`@theme`)

| Token | Hex | Use |
|---|---|---|
| `espresso` | `#1e1d1a` | Warm charcoal: footer, hero base & scrims, body text, dark buttons |
| `coffee` | `#78392b` | Rust: About band, announcement dot, dark-button hover |
| `latte` | `#dfdbca` | Sand: announcement bar, Visit panel, image backdrops |
| `cream` | `#f5f6f1` | Bone white: page background, text on dark, light buttons |
| `paper` | `#ffffff` | Pure white: Menu section |
| `muted-foreground` | `#5f5d4c` | Olive grey: secondary text on light backgrounds, `text-muted-foreground` (darkened from Assembly's `#686653` to pass 4.5:1 on `latte`) |

Text on dark is `text-cream` (or `cream/60–70` for secondary); never pure white text.
Scrims over photos use espresso: `rgb(30 29 26 / …)` or `from-espresso/…`.

### Typography

- **Display: `font-serif` (Newsreader), weight 300, upright**, `leading-[1.08] tracking-[-0.015em]`
  (the `serifDisplay` primitive). Wrap 1–2 accent words in `<em>` to italicize them.
  Sizes: hero 40/64px, section titles 32–34/44–46px, About statement 28/42px (mobile/desktop).
- **UI: `font-sans` (Be Vietnam Pro)**. Labels, nav, buttons: `text-sm font-semibold`.
  Footer column headers: `text-[13px] font-semibold uppercase tracking-[0.06em]`.
- Product names: serif italic. Prices: sans semibold.
- Body 15–16px, `leading-relaxed`.

### Layout & spacing

- Edge-to-edge. Page gutter is **20px** (`px-5`), capped at `max-w-page` (1920px). Use the `gutter` primitive.
- Hero copy sits at a **7% side margin** on desktop (`md:inset-x-[7%]`), 72px from the bottom (`md:bottom-18`).
- Section padding: Menu `pt-14 pb-20` / `md:pt-20 md:pb-28`; About `py-24` / `md:py-32`;
  Visit panel `py-16` / `md:py-20 md:px-[12%]`; footer `pt-20` / `md:pt-28`.
- Product grid: 4 columns desktop, 2 mobile, **4px gap** (`gap-x-1`), images `aspect-[4/5]`.
- Hairlines: 1px rules (`cream/25–35` on dark, `espresso/15` on light) and 1px vertical dividers
  (`h-[0.9em] w-px`) between inline facts.

### Shape & controls

- Corners are square: `--radius` is 2px and every `rounded-*` step resolves to it.
- shadcn semantic tokens (`--primary`, `--muted`, `--border`…) in `:root` map onto the palette above.
  Light only: no `.dark` theme (shadcn's dark block contained blue).
- Buttons: shadcn `<Button>` with café variants: `default` (espresso → coffee hover, on light), `light`
  (on dark/photo), `outline` (secondary on light), `outline-light` (secondary on dark), `ghost`, `link`.
  All `h-10 px-3.5 text-sm font-semibold` (`lg` = h-11). For links use `<Button asChild><Link/></Button>`.
  No pills, no shadows, no lift-on-hover; hover = colour change. Inputs are h-10 on `bg-paper`.
- Selected option chips (ToggleGroup) and the active tab use solid espresso.
- Image hover: slow zoom (`group-hover:scale-[1.04]`, 1200ms).

## Conventions

- Put business facts in `lib/site.ts`, products in `lib/catalog.ts`, shared copy in `lib/content.ts`; never
  hard-code them in JSX. Keep `[brackets]` on unknown facts. Prices are numbers (VND) and still placeholders.
- Pages read data only through the async getters in `lib/catalog.ts`, so the Sanity swap does not touch the UI.
- Images: static import from `public/images/` + `<Image fill sizes=… placeholder="blur">`.
  The hero uses `loading="eager" fetchPriority="high"` (Next 16 deprecates `priority`).
  Text over photos always needs an espresso scrim.
- Hero photo is zoomed and shifted right on desktop (`md:scale-[1.45] md:translate-x-[22%]`) so the
  drinks clear the copy. When swapping the photo, re-tune this; translate must stay ≤ (scale − 1) / 2.
- Motion: wrap headings/blocks in `<Reveal>`; everything must still work with `prefers-reduced-motion`
  (handled in CSS) and with JS off (`<noscript>` rule in layout).
- Fonts must include the `vietnamese` subset. Check diacritics when changing `line-height` on large
  type: `FitText` uses `overflow-x-clip` so accents above tight line boxes are not cut.
- Mobile menu and cart are shadcn `Sheet`s. Client components stay small (`cart-button`, `mobile-nav`, forms);
  pages and sections remain server components.
- Next 16 keeps the previous page mounted in a hidden `<Activity>`: in Playwright use `h1:visible`, not `h1`.
- Verify visual changes with screenshots at 1440×900 and 390×844, not just a passing build
  (see **UI verification** below).

## UI verification (required after every UI task)

After finishing any change to UI code (`app/**/*.tsx`, `app/globals.css`, images, fonts), run the
`playwright-cli` skill to check the page in a real browser before reporting the task as done.
A passing `npm run build` / `tsc` / `lint` is not enough.

1. Open `http://localhost:3000` (start `npm run dev` if nothing is running).
2. At **1440×900** and **390×844**: scroll the whole page first (so `<Reveal>` blocks fade in), then
   take a full-page screenshot and **look at it**.
3. Check and report:
   - `playwright-cli console`: no errors or warnings (hydration, 404s, image warnings).
   - No horizontal overflow: `document.documentElement.scrollWidth === clientWidth`.
   - Every section has its background colour (`bg-espresso`, `bg-coffee`, `bg-paper`, `bg-latte`),
     button labels are readable, all images load, Vietnamese diacritics are not clipped.
   - Mobile: the `Menu` sheet opens and its links are visible; add-to-cart → cart sheet → checkout still works.
   - The change matches the design system above (no blue, no pills, square corners, etc.).
4. Fix anything wrong and re-check; then tell the user what was verified.

**Stale dev CSS:** Turbopack's dev server sometimes keeps serving an old `globals.css` (symptoms:
section backgrounds missing, cream/text colours that are not in `@theme`, blank buttons). Check by
reading `getComputedStyle` of a `.bg-espresso` element. If it is transparent, the code is not at fault:
verify with `npm run build && npx next start -p 3100` instead, and tell the user to restart
`npm run dev` (deleting `.next/dev` if a restart is not enough).

## Image credits (Pexels photo IDs)

hero `32791406` · p-den-da `2775860` · p-bac-xiu `17869853` · p-americano `17576001` ·
p-sua-da `8605859` · ghe-quan `38622185` · p-latte `39537967` · p-croissant `15023803` ·
p-tra-chanh `39501101` · p-tra-chanh-2 `11009224` · phin `6932521` · phin-2 `31722934` · b-tui-hat `8101207` ·
b-dong-goi `37539910` · b-hat-rang `5109705` · b-hat-rang-2 `12165304` · b-xay `30243616` ·
khong-gian `34839408` · khong-gian-2 `18617718` · quay-bar `29833130`
(full-size source `https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg`).
Treat them as stand-ins until the café's own photos exist.
