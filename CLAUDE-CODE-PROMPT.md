# Claude Code Prompt: Build Vitali8 Shopify Store

Copy everything below the line into Claude Code.

---

## PROMPT START

You are building a single-product Shopify store for VITALI8, a UK sports nutrition brand selling Creatine Monohydrate Powder 600g. This site needs to feel like a premium DTC brand experience, not a generic supplement store. Think Liquid Death meets Gymshark meets Apple product pages. The goal: anyone who lands on this page says "wow" within 3 seconds.

Read `BUILD-BRIEF.md` first. It contains brand colours, typography, product specs, copy, section structure, SEO keywords, and the full asset inventory. Read `content/website-copy.md` for all section copy. Read `content/seo-keywords.md` for keyword targets.

---

## DESIGN PHILOSOPHY

This is NOT a standard Shopify template. This is a high-end, interactive product experience. Every section should have movement, depth, or interactivity. Dead static sections are not acceptable. The user should FEEL something when they scroll.

### Core principles:
- Every section has at least one interactive or animated element
- Scroll-driven storytelling (content reveals as you scroll, parallax layers, pinned sections)
- 3D product viewer as the centrepiece
- Micro-interactions on every hoverable element (buttons, cards, images, icons)
- Smooth, buttery 60fps transitions everywhere
- Dark, immersive feel with purple light accents (like neon glow effects)
- The page should feel alive, not like a brochure

---

## TECH STACK

- Shopify Online Store 2.0 (Dawn-based custom theme)
- **Three.js** for 3D product rendering (load via CDN: https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js)
- **GSAP + ScrollTrigger** for scroll animations (load via CDN: https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js and ScrollTrigger plugin)
- **Vanilla JS** only, no jQuery
- CSS custom properties for theming
- Intersection Observer as fallback for users with reduced motion

---

## COLOUR SYSTEM

```css
:root {
  --purple: #6B21A8;
  --purple-light: #8B5CF6;
  --purple-glow: rgba(107, 33, 168, 0.4);
  --purple-dark: #4C1D95;
  --black: #192126;
  --black-deep: #0A0D10;
  --black-card: #1A1F2E;
  --white: #FFFFFF;
  --white-muted: #A1A1AA;
  --gradient-purple: linear-gradient(135deg, #6B21A8 0%, #8B5CF6 50%, #6B21A8 100%);
  --gradient-dark: linear-gradient(180deg, #0A0D10 0%, #192126 100%);
  --glow-purple: 0 0 30px rgba(107, 33, 168, 0.3), 0 0 60px rgba(107, 33, 168, 0.1);
}
```

Typography: Inter from Google Fonts. Headings: Inter Black (900 weight), uppercase, letter-spacing 0.02em. Body: Inter Regular (400), 16-18px.

---

## SECTIONS (in scroll order)

### 1. HERO (Full viewport, immersive)

**Layout:** Full viewport height. Dark gradient background (#0A0D10 to #192126). The product tub rendered as a 3D model in the centre-right that responds to mouse movement (subtle rotation tracking the cursor). If 3D model is too complex, use the product-mockup.png with a CSS 3D perspective transform that tilts on mousemove.

**Left side:**
- Headline: "PURE CREATINE. REAL RESULTS." in massive bold type (clamp(48px, 8vw, 96px)), white
- Each word animates in with a staggered fade-up on page load (GSAP)
- Subheadline fades in 0.5s after: "600g | 120 Servings | 5g Per Scoop | Unflavoured" in --white-muted
- CTA button: "SHOP NOW" with purple gradient background, white text, and a glowing purple box-shadow that pulses subtly on idle. On hover: the glow intensifies, button scales up 1.05x, background shifts lighter.

**Background effects:**
- Subtle floating purple particle dots (canvas or CSS) drifting slowly behind the product
- A faint purple radial gradient "spotlight" behind the product that follows mouse movement slightly

**Trust strip below hero:**
- 3-4 trust badges ("UK Manufactured", "Lab Tested", "No Fillers", "Vegan") in a horizontal row
- Each badge: icon + text, subtle glass-morphism card (backdrop-filter: blur, semi-transparent bg)
- On hover: card lifts up (translateY -4px), glow intensifies
- The whole strip slides in from bottom on scroll

---

### 2. KEY BENEFITS (Scroll-triggered reveal)

**Layout:** 4 benefit cards in a row (2x2 on mobile). Dark background.

**Each card:**
- Glass-morphism style: semi-transparent dark card (#1A1F2E at 80% opacity), 1px purple border glow, backdrop-filter blur
- SVG icon at top (animated on hover, e.g. a dumbbell icon wobbles, a lightning bolt flashes, a brain pulses)
- Benefit title in white bold
- Short description in muted text
- On hover: card scales 1.03x, border glow brightens, icon animates, subtle purple gradient sweeps across the background

**Scroll behaviour:**
- Cards are initially invisible, staggered fade-in-up as user scrolls into view (GSAP ScrollTrigger, stagger 0.15s)
- A large stat counter animates in above the cards: "5g PER SERVING | 120 SERVINGS | 600g" with each number counting up from 0

---

### 3. PRODUCT SECTION (The money section)

**Layout:** Split. Left: product image gallery. Right: product info + add to cart.

**Left (Gallery):**
- Main product image large, with 4-5 thumbnail images below
- On thumbnail hover: thumbnail gets purple border, main image cross-fades smoothly
- Main image has a subtle float animation (translateY oscillating 8px, 4s ease-in-out infinite)
- On main image hover: slight zoom (scale 1.05) with smooth transition
- Purple ambient glow behind the product image (radial gradient)

**Right (Product info):**
- Product title animates in on scroll
- Price: "£19.99" in large bold white, with a small "per tub" underneath
- Serving cost callout: "Just 17p per serving" with a subtle highlight animation
- Quantity selector: custom styled, dark card, +/- buttons with hover glow
- ADD TO CART button: full-width, purple gradient, large text. On hover: gradient shifts, scale 1.02, glow shadow intensifies. On click: satisfying ripple effect + button text changes to "ADDED ✓" briefly
- Below button: "Free UK Delivery" with a subtle truck icon
- Trust badges as small icon + text rows, each fading in on scroll

**Sticky behaviour on desktop:** Product info panel stays sticky as user scrolls past the gallery images

---

### 4. HOW TO USE (Animated steps)

**Layout:** 3 steps in a horizontal timeline. Light section (but still dark, use #0F1318 for contrast).

**Each step:**
- Large circled number (1, 2, 3) with purple gradient border that draws itself in (SVG stroke-dasharray animation) as you scroll to it
- Icon: scoop, water glass, shaker bottle (SVG, animated on scroll)
- Title: "SCOOP", "MIX", "SHAKE"
- Description underneath in muted text

**Connection:** Animated dashed line connecting the 3 circles that draws itself as you scroll (SVG path animation triggered by ScrollTrigger)

**Bottom text:** "Mixes Easily with Water, Juice, Protein Shakes or Smoothies" fading in last

---

### 5. WHY CREATINE (Scroll-pinned education)

**Layout:** Full-width dark section with a PINNED scroll experience. The section is 300vh tall but the viewport stays pinned while content transitions inside.

**As user scrolls through the pinned section, 3 "slides" transition:**

Slide 1: "THE MOST RESEARCHED SUPPLEMENT IN SPORTS NUTRITION" - big text that fades/scales in
Slide 2: Animated diagram showing ATP cycle (simple: arrow loop with "ATP → ADP → ATP" and text explaining phosphocreatine replenishment). Keep it minimal but animated.
Slide 3: 4 benefit stats that count up: "↑ 8% Strength", "↑ 14% Performance", "↑ Recovery Speed", "↑ Cognitive Function" (these are directional claims, not absolute)

**Background:** Very subtle purple grid lines (like a futuristic wireframe) that move on scroll

**If scroll-pinning is too complex for Shopify Liquid, fall back to:** a full-width section with the 3 content blocks stacking vertically, each triggered to animate on scroll-in.

---

### 6. WHO IS IT FOR (Image grid with hover effects)

**Layout:** 3-column image grid (stacks to 1 on mobile). Uses the lifestyle stock photos.

**Each image cell:**
- Image fills the cell, slight zoom on load (scale 1.1 → 1.0 transition)
- On hover: image zooms slightly (scale 1.08), a purple gradient overlay slides up from the bottom covering 40% of the image
- Text overlay appears on hover: activity name ("YOGA", "STRENGTH", "ENDURANCE") in bold white + subtitle ("Flexibility & Recovery", "Power & Growth", "Speed & Stamina")
- On mobile: overlay is always visible (no hover state), at 30% opacity gradient

**Image assignment:**
- Column 1: pexels-alexy-almond (yoga) - label "YOGA"
- Column 2: pexels-tima-miroshnichenko (battle ropes) - label "STRENGTH"
- Column 3: pexels-maksgelatin (runner jumping) - label "ENDURANCE"

**Section header:** "REAL PEOPLE. REAL PERFORMANCE." animates in with letter-by-letter stagger

**Below grid:** "For Runners, Lifters, Yogis, Weekend Warriors, and Everyday Athletes" in muted text, fade in

---

### 7. INGREDIENTS (Minimal, bold)

**Layout:** Centred, mostly white/light section for contrast. Dark text.

**Centre element:** A large "1" in massive font (200px+, bold, purple) with the text "INGREDIENT" next to it. This is the visual hook.

**Below:** "100% Pure Creatine Monohydrate" in large text
**Below that:** 3 stat pills in a row:
- "1 Scoop = 5g"
- "120 Servings"
- "600g Net"
Each pill: rounded, purple outline, on hover fills with purple and text goes white

**Bottom row of clean-label badges:**
"Vegan" | "Unflavoured" | "No Fillers" | "No Sweeteners" | "Sugar Free"
Each as a minimal tag/chip with fade-in stagger animation

---

### 8. BRAND STORY (Immersive parallax)

**Layout:** Full-width, full-viewport section. Background image (use braden-collum sprinter or pexels-cliff-booth headstand) with heavy dark overlay (rgba(10, 13, 16, 0.75)) and parallax scroll effect (background-attachment: fixed or transform translate on scroll).

**Content centred:**
- V logo (logo-white.png) fades in first, subtle scale animation
- Headline: "BUILT BY ATHLETES. POWERED BY PURITY." in large white bold, staggered word reveal
- Body copy from website-copy.md, fades in after headline
- A subtle purple line divider above and below the text block, drawing itself in

**Parallax:** The background image moves at 0.5x scroll speed, creating depth

---

### 9. REVIEWS (Social proof carousel)

**Layout:** Dark section. Horizontal scrolling card carousel (auto-scrolling, pausable on hover, draggable).

**Header:** "WHAT ATHLETES ARE SAYING" with the 4.7-star rating displayed as 5 star SVGs (4 filled purple, 1 partially filled) and "(30+ Reviews)"

**Each review card:**
- Glass-morphism dark card
- 5 purple star icons at top
- Review text in white
- Reviewer name + "Verified Purchase" badge
- On hover: card lifts, glow border

**Carousel:** Infinite auto-scroll (slow, 30px/s), pauses on hover, can be dragged/swiped on mobile. Uses CSS scroll-snap for clean stopping points.

**Populate with 5-6 review cards using realistic review copy about creatine quality, mixing, taste, results. Make them sound authentic, varied in length, mixed gender names.**

---

### 10. FAQ (Animated accordion)

**Layout:** Centred, max-width 720px. Dark background.

**Each FAQ item:**
- Question in bold white, right-aligned purple "+" icon
- On click: smooth height animation reveals answer, "+" rotates 45° to become "×", a subtle purple left border slides in
- On hover (closed state): slight background lighten, question text gets purple tint
- Staggered scroll-in animation for each FAQ item

**Use all Q&As from website-copy.md**

---

### 11. COMING SOON / EMAIL CAPTURE (High energy)

**Layout:** Full-width purple gradient section (the only section with a coloured background, making it pop).

**Background:** Animated gradient that slowly shifts (purple to deeper purple, 10s cycle, CSS animation on background-position)

**Content:**
- Headline: "MORE FROM VITALI8 COMING SOON" in white bold
- Subtext: "Our range is expanding. Be the first to know." in white muted
- Email input + submit button inline: input has dark background with white text, submit button is white with purple text ("JOIN THE WAITLIST"). On focus: input gets purple glow border. On submit: button does a satisfying filled animation and changes to "YOU'RE IN ✓"
- Below form: "Join 500+ athletes already on the list" (social proof nudge)

---

### 12. FOOTER

**Layout:** Dark (#0A0D10), wide, clean.

- White logo (logo-white.png) top centre, subtle hover glow
- Navigation links in columns: Shop, About, FAQ, Contact
- Social icons row (Instagram, TikTok, Twitter/X) as SVG icons, on hover: scale 1.2 + purple colour fill
- "Coming Soon" product teaser line
- Legal row: Terms, Privacy Policy, Copyright 2026 Vitali8
- Very subtle purple gradient line at the very top edge of the footer as a separator

---

## GLOBAL INTERACTIONS & EFFECTS

### Cursor
Custom cursor: small purple dot (8px) that follows the mouse smoothly (GSAP or CSS), with a larger circle (32px) trailing behind with slight delay. On hovering interactive elements, the outer circle expands. On mobile: disabled (use standard touch).

### Scroll progress
Thin purple progress bar fixed at the very top of the viewport, fills left-to-right as user scrolls down the page.

### Navigation
Fixed top nav bar. Transparent on hero, transitions to solid dark (#0A0D10) with backdrop-blur when scrolling past hero. Logo left, "SHOP NOW" CTA button right (small, purple). Hamburger menu on mobile with full-screen overlay animation.

### Page load
Opening sequence: dark screen, logo fades in centre, holds 0.8s, scales down and moves to nav position, hero content animates in. Total load animation under 2 seconds. Only on first visit (sessionStorage flag).

### Reduced motion
Wrap ALL animations in `@media (prefers-reduced-motion: no-preference)`. If user prefers reduced motion, show all content immediately with no animation. The site must be fully usable without JS animations.

### Smooth scroll
`html { scroll-behavior: smooth; }` plus GSAP SmoothScroll if you want premium feel. All internal anchor links scroll smoothly.

---

## MICRO-INTERACTIONS CHECKLIST

Every one of these must be implemented:

- [ ] Buttons: scale 1.05 + glow intensify on hover, ripple on click
- [ ] Cards: lift (translateY -6px) + shadow expand on hover
- [ ] Images: subtle zoom (1.05-1.08) on hover
- [ ] Icons: unique animation per icon on hover (wobble, pulse, spin, flash)
- [ ] Links: purple colour transition on hover, underline draws in from left
- [ ] Input fields: purple glow border on focus
- [ ] Trust badges: glass lift effect on hover
- [ ] Section headings: letter-spacing widens slightly on scroll-in
- [ ] Numbers/stats: count-up animation when scrolled into view
- [ ] Purple elements: subtle pulse/breathe animation on idle (box-shadow opacity oscillating)

---

## 3D PRODUCT ELEMENT

Use Three.js to create an interactive 3D product experience in the hero section. Options (pick the best one that works):

**Option A (Best):** Load a 3D cylinder/tub geometry, apply the product label as a texture (use product-hero.jpg mapped onto a cylinder). The tub rotates slowly on idle. On mouse move, it tilts toward the cursor. On scroll, it rotates further.

**Option B (Good):** Take product-mockup.png, apply CSS 3D transforms (perspective, rotateY, rotateX) that respond to mouse position. Creates a parallax card-tilt effect that feels 3D without actual 3D geometry.

**Option C (Fallback):** Float animation (translateY oscillating) + subtle CSS shadow that shifts with mouse position, creating perceived depth.

Implement Option A. If it causes performance issues or loading problems, fall back to Option B. Option C is the minimum acceptable.

---

## PERFORMANCE REQUIREMENTS

- Lighthouse score: 85+ (animations make 90 harder, that's OK)
- Lazy load ALL images (native loading="lazy" + Intersection Observer for animation triggers)
- Load GSAP and Three.js from CDN with async/defer
- Compress all images before shipping (use Shopify's image_url filters with size parameters)
- Debounce mousemove handlers (16ms / requestAnimationFrame)
- Use will-change sparingly (only on actively animating elements, remove after)
- CSS containment on sections: `contain: layout style paint`
- Font display: swap for Inter

---

## MOBILE REQUIREMENTS

- Every section must be fully responsive (test at 375px, 428px, 768px, 1024px, 1440px)
- Replace hover effects with tap or always-visible states on touch devices
- 3D product: disable mouse tracking, use auto-rotation only
- Custom cursor: disabled on touch
- Pinned scroll section (Why Creatine): converts to normal stacked scroll on mobile
- Image grid: single column with swipe on mobile
- FAQ: full-width accordion
- Touch-friendly tap targets (min 44x44px)

---

## SEO (still critical)

- Page title: "Vitali8 Creatine Monohydrate Powder 600g | 120 Servings | UK Made"
- Meta description from content/seo-keywords.md
- Product structured data (JSON-LD): name, price, currency GBP, availability InStock, rating 4.7, reviewCount 30
- Proper heading hierarchy: H1 (product name, once), H2 (section titles), H3 (sub-sections)
- All images have descriptive alt text with keywords
- URL: /products/creatine-monohydrate-powder
- Canonical URL set
- Open Graph + Twitter Card meta tags

---

## FILE STRUCTURE

```
theme/
  assets/
    base.css                - Reset, variables, global styles
    sections.css            - All section styles
    animations.css          - All keyframes and animation utilities
    interactive.js          - GSAP scroll animations, cursor, nav behaviour
    three-product.js        - 3D product viewer (Three.js)
    hero-particles.js       - Purple particle background
    [all images from assets/ folders]
  config/
    settings_schema.json
    settings_data.json
  layout/
    theme.liquid            - Base layout, loads all CSS/JS, includes nav + footer
  locales/
    en.default.json
  sections/
    hero.liquid
    benefits.liquid
    product-detail.liquid
    how-to-use.liquid
    why-creatine.liquid
    who-is-it-for.liquid
    ingredients.liquid
    brand-story.liquid
    reviews.liquid
    faq.liquid
    email-capture.liquid
    footer.liquid
    header.liquid
  snippets/
    trust-badge.liquid
    benefit-card.liquid
    review-card.liquid
    faq-item.liquid
    product-gallery.liquid
    stat-counter.liquid
  templates/
    index.json
    product.json
```

---

## ASSETS AVAILABLE

All in the project folder:
- `assets/logos/` - logo-primary-purple, logo-black, logo-white (PNG + JPG)
- `assets/product-images/` - product-hero.jpg, product-benefits.jpg, product-credibility.jpg, product-lifestyle.jpg, product-howto.jpg, product-ingredients.jpg, product-mockup.png
- `assets/lifestyle-images/` - 6 real stock photos (sprinter, yoga, headstand, runner leap, urban runner B&W, battle ropes B&W)
- `assets/mockups/` - reference only

---

## COPY

All text is in `content/website-copy.md`. Use it exactly. Do not rewrite the copy.

---

## WHAT NOT TO DO

- Do not build a flat, static page. Every section needs movement or interactivity.
- Do not use jQuery, Bootstrap, or any heavy framework.
- Do not use Shopify page builders or apps for layout. Build in Liquid + custom JS.
- Do not skip mobile. Every effect must degrade gracefully.
- Do not make it feel like a supplement store from 2018. This is a 2026 premium DTC brand.
- Do not hardcode content that should be editable in Shopify admin. Use section schemas.
- Do not add sound effects or auto-playing video.
- Do not make animations so heavy they drop below 30fps on mid-range devices.
- Do not use stock animation libraries with default easing. Custom easing curves: `cubic-bezier(0.16, 1, 0.3, 1)` for entrances, `cubic-bezier(0.33, 1, 0.68, 1)` for exits.

---

## DELIVERABLE

A complete, ready-to-upload Shopify theme. I zip the `theme/` folder and upload via Shopify Admin > Themes > Upload. The store should work immediately after uploading, adding the product, and uploading the images. Every animation working, every hover state responding, every section telling a visual story.

The first impression must be: "This doesn't look like Shopify."
