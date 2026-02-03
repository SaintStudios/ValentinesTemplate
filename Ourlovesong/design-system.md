# OurLoveSong.co Design System

A romantic, warm, and elegant design system built for creating personalized song experiences.

---

## Design Philosophy

OurLoveSong.co celebrates love in all its forms. The design language should feel:

- **Romantic** — Warm, intimate, and emotionally resonant
- **Trustworthy** — Professional quality you can depend on
- **Personal** — Hand-crafted feel, not mass-produced
- **Timeless** — Classic elegance, not trendy gimmicks

The visual identity evokes the feeling of a handwritten love letter sealed with wax—personal, precious, and meaningful.

---

## Color Palette

### Primary Brand Colors

```css
:root {
  /* Deep espresso for primary actions and text */
  --color-espresso: #4A3B32;
  --color-espresso-light: #6B5A4D;
  --color-espresso-dark: #2D231E;
  
  /* Warm cream for backgrounds */
  --color-cream: #F5F0E6;
  --color-cream-dark: #E8E0D4;
  --color-cream-light: #FAF8F4;
  
  /* Muted mocha for secondary text and icons */
  --color-mocha: #8C7B70;
  --color-mocha-light: #A99B91;
  --color-mocha-dark: #6E6058;
  
  /* Soft paper for cards */
  --color-paper: #FFFCF7;
  --color-paper-dark: #F5F0E6;
  
  /* Gold accent for special moments */
  --color-gold: #C5A065;
  --color-gold-light: #D4B87A;
  --color-gold-dark: #A8864F;
}
```

### Semantic Colors

```css
:root {
  /* Status colors — kept warm and subtle */
  --color-success: #7A9E7E;      /* Warm green, not neon */
  --color-warning: #C9A857;      /* Golden yellow */
  --color-error: #B85450;        /* Muted red, not alarming */
  --color-info: #6B8CAE;         /* Soft blue */
  
  /* Neutral scale for UI */
  --color-white: #FFFFFF;
  --color-gray-50: #FAF9F7;
  --color-gray-100: #F5F3EF;
  --color-gray-200: #E8E4DD;
  --color-gray-300: #D4CFC5;
  --color-gray-400: #A39B8E;
  --color-gray-500: #8C7B70;
  --color-gray-600: #6E6058;
  --color-gray-700: #4A3B32;
  --color-gray-800: #2D231E;
  --color-gray-900: #1A1512;
}
```

### Color Usage Guidelines

| Context | Foreground | Background | Example |
|---------|------------|------------|---------|
| Primary buttons | White | Espresso | CTA, Submit |
| Secondary buttons | Espresso | Cream border | Cancel, Back |
| Cards/sections | Espresso | Paper | Form cards, Testimonials |
| Body text | Espresso | Cream | Main content |
| Muted text | Mocha | Transparent | Labels, captions |
| Accents | Gold | Transparent | Icons, dividers |
| Links | Espresso | — | Default, :hover gold |

---

## Typography

### Font Families

```css
:root {
  /* Primary serif for headings and emotional content */
  --font-serif: 'Instrument Serif', Georgia, 'Times New Roman', serif;
  
  /* Sans-serif for UI and readability */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  
  /* Monospace only for technical display (if needed) */
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### Type Scale

```css
:root {
  /* Display — Hero sections, emotional impact */
  --text-display: 4.5rem;        /* 72px */
  --leading-display: 1;
  --tracking-display: -0.02em;
  
  /* H1 — Major section headings */
  --text-h1: 3rem;               /* 48px */
  --leading-h1: 1.1;
  --tracking-h1: -0.01em;
  
  /* H2 — Section headings */
  --text-h2: 2.25rem;            /* 36px */
  --leading-h2: 1.2;
  
  /* H3 — Subsection headings */
  --text-h3: 1.5rem;             /* 24px */
  --leading-h3: 1.3;
  
  /* H4 — Card titles, form labels */
  --text-h4: 1.125rem;           /* 18px */
  --leading-h4: 1.4;
  
  /* Body large — Important body text */
  --text-body-lg: 1.125rem;      /* 18px */
  --leading-body-lg: 1.6;
  
  /* Body default — Regular content */
  --text-body: 1rem;             /* 16px */
  --leading-body: 1.6;
  
  /* Body small — Secondary text */
  --text-body-sm: 0.875rem;      /* 14px */
  --leading-body-sm: 1.5;
  
  /* Caption — Tiny text */
  --text-caption: 0.75rem;       /* 12px */
  --leading-caption: 1.4;
}
```

### Font Weights

| Weight | Name | Usage |
|--------|------|-------|
| 400 | Regular | Body text, captions |
| 500 | Medium | Form labels, small headings |
| 600 | Semibold | Button text, emphasis |
| 700 | Bold | H2-H4, strong emphasis |

### Heading Styles

```css
h1, .text-h1 {
  font-family: var(--font-serif);
  font-size: var(--text-h1);
  font-weight: 400;
  line-height: var(--leading-h1);
  letter-spacing: var(--tracking-h1);
  color: var(--color-espresso);
}

h2, .text-h2 {
  font-family: var(--font-serif);
  font-size: var(--text-h2);
  font-weight: 400;
  line-height: var(--leading-h2);
  color: var(--color-espresso);
}

h3, .text-h3 {
  font-family: var(--font-serif);
  font-size: var(--text-h3);
  font-weight: 500;
  line-height: var(--leading-h3);
  color: var(--color-espresso);
}
```

### Body Styles

```css
body, .text-body {
  font-family: var(--font-sans);
  font-size: var(--text-body);
  font-weight: 400;
  line-height: var(--leading-body);
  color: var(--color-espresso);
}

.text-muted {
  color: var(--color-mocha);
}
```

---

## Spacing Scale

```css
:root {
  /* Base unit: 4px */
  --space-1: 0.25rem;    /* 4px */
  --space-2: 0.5rem;     /* 8px */
  --space-3: 0.75rem;    /* 12px */
  --space-4: 1rem;       /* 16px */
  --space-5: 1.25rem;    /* 20px */
  --space-6: 1.5rem;     /* 24px */
  --space-8: 2rem;       /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */
}
```

### Spacing Usage

| Token | Usage |
|-------|-------|
| `--space-4` to `--space-6` | Inline element spacing, button padding |
| `--space-8` to `--space-12` | Component internals, card padding |
| `--space-16` to `--space-20` | Section padding, major gaps |
| `--space-24` to `--space-32` | Hero sections, dramatic whitespace |

---

## Border Radius

```css
:root {
  /* Sharp corners for elegant, traditional feel */
  --radius-none: 0;
  --radius-xs: 2px;      /* Subtle rounding */
  --radius-sm: 4px;      /* Small elements */
  --radius-md: 6px;      /* Default for buttons, inputs */
  --radius-lg: 12px;     /* Cards, modals */
  --radius-full: 9999px; /* Pills, circles */
}
```

### Radius Usage

| Element | Radius |
|---------|--------|
| Buttons | `--radius-md` (primary), `--radius-sm` (outline) |
| Input fields | `--radius-md` |
| Cards | `--radius-lg` |
| Avatars | `--radius-full` |
| Dividers, decorative | `--radius-xs` |

---

## Shadows

```css
:root {
  /* Soft, diffused shadows for warmth */
  --shadow-soft: 0 4px 20px -2px rgba(74, 59, 50, 0.05);
  --shadow-medium: 0 8px 30px -4px rgba(74, 59, 50, 0.08);
  --shadow-strong: 0 16px 40px -8px rgba(74, 59, 50, 0.1);
  
  /* Special shadows */
  --shadow-card: 0 2px 8px rgba(74, 59, 50, 0.04);
  --shadow-floating: 0 20px 50px -10px rgba(74, 59, 50, 0.12);
}
```

### Shadow Usage

| Element | Shadow |
|---------|--------|
| Cards (resting) | `--shadow-card` |
| Cards (elevated) | `--shadow-soft` |
| Dropdowns, modals | `--shadow-medium` |
| Hero/heroic elements | `--shadow-floating` |

---

## Borders

```css
:root {
  /* Subtle borders, not harsh */
  --border-light: 1px solid var(--color-gray-200);
  --border-default: 1px solid var(--color-gray-300);
  --border-accent: 1px solid var(--color-gold);
  
  /* Dashed for decorative/functional dividers */
  --border-dashed: 1px dashed var(--color-gray-300);
}
```

---

## Layout

### Container Widths

```css
:root {
  --container-sm: 640px;   /* Narrow content, forms */
  --container-md: 768px;   /* Standard text, narrow sections */
  --container-lg: 1024px;  /* Cards, multi-column */
  --container-xl: 1280px;  /* Full width */
  --container-2xl: 1440px; /* Maximum */
}
```

### Grid System

```css
/* 12-column grid with 24px gap */
--grid-columns: 12;
--grid-gap: 1.5rem; /* --space-6 */
--grid-gap-lg: 2rem; /* --space-8 */
```

### Section Spacing

```css
.section-padding {
  padding: var(--space-16) var(--space-6);
}

@media (min-width: 768px) {
  .section-padding {
    padding: var(--space-24) var(--space-12);
  }
}
```

---

## Components

### Buttons

**Primary Button**

```css
.btn-primary {
  background-color: var(--color-espresso);
  color: var(--color-white);
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: var(--text-body);
  padding: var(--space-4) var(--space-8);
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-soft);
}

.btn-primary:hover {
  background-color: var(--color-espresso-light);
  transform: translateY(-1px);
  box-shadow: var(--shadow-medium);
}

.btn-primary:active {
  transform: translateY(0);
}
```

**Secondary Button**

```css
.btn-secondary {
  background-color: transparent;
  color: var(--color-espresso);
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: var(--text-body);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-espresso);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background-color: var(--color-cream);
}
```

**Gold Accent Button**

```css
.btn-gold {
  background-color: var(--color-gold);
  color: var(--color-white);
  /* Same as primary, different background */
}
```

### Input Fields

```css
.input {
  width: 100%;
  padding: var(--space-4) var(--space-5);
  font-family: var(--font-sans);
  font-size: var(--text-body);
  color: var(--color-espresso);
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px rgba(197, 160, 101, 0.15);
}

.input::placeholder {
  color: var(--color-mocha-light);
}
```

### Cards

```css
.card {
  background-color: var(--color-paper);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  box-shadow: var(--shadow-soft);
  border: var(--border-light);
}

.card-elevated {
  background-color: var(--color-paper);
  border-radius: var(--radius-lg);
  padding: var(--space-10);
  box-shadow: var(--shadow-floating);
  border: var(--border-light);
}
```

### Links

```css
.link {
  color: var(--color-espresso);
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-color: var(--color-gold);
  transition: all 0.2s ease;
}

.link:hover {
  color: var(--color-gold-dark);
  text-decoration-color: var(--color-gold-dark);
}
```

---

## Animations

### Transitions

```css
:root {
  --transition-fast: 150ms ease;
  --transition-default: 200ms ease;
  --transition-slow: 300ms ease;
}
```

### Key Animations

```css
/* Subtle fade-in for emotional content */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Gentle pulse for attention */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

/* Soft reveal for cards */
@keyframes reveal {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Animation Usage

| Element | Animation | Duration |
|---------|-----------|----------|
| Page load | `fadeIn` | `--transition-slow` |
| Card appear | `reveal` | `--transition-default` |
| Button hover | `pulse` | `infinite` (subtle) |
| Modal open | `fadeIn` | `--transition-fast` |

---

## Visual Assets

### Iconography

**Style**: Line icons, rounded caps, 24px baseline

**Colors**:
- Default: `var(--color-mocha)`
- Active: `var(--color-espresso)`
- Accent: `var(--color-gold)`

**Library recommendations**:
- Phosphor Icons (rounded)
- Heroicons (outline)
- Lucide (consistent, clean)

### Photography

**Style**: Warm, natural lighting, authentic moments

**Color grading**: Warm highlights, soft shadows, slight golden tint

**Composition**: Centered subjects, negative space for text overlay

### Illustrations

**Style**: Hand-drawn or watercolor aesthetic, romantic motifs

**Motifs**: Hearts, musical notes, envelopes, wax seals, flowers

**Color palette**: Brand colors only, soft edges

---

## Responsive Design

### Breakpoints

```css
:root {
  --breakpoint-sm: 640px;   /* Mobile landscape */
  --breakpoint-md: 768px;   /* Tablet portrait */
  --breakpoint-lg: 1024px;  /* Tablet landscape, small desktop */
  --breakpoint-xl: 1280px;  /* Desktop */
  --breakpoint-2xl: 1440px; /* Large desktop */
}
```

### Mobile-First Approach

```css
/* Base: Mobile styles */
.section { padding: var(--space-8) var(--space-4); }

/* Tablet and up */
@media (min-width: 768px) {
  .section { padding: var(--space-12) var(--space-6); }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .section { padding: var(--space-16) var(--space-8); }
}
```

---

## Accessibility

### Contrast Ratios

| Context | Requirement |
|---------|-------------|
| Body text on cream | 4.5:1 minimum |
| Buttons (text) on espresso | 4.5:1 minimum |
| Links on cream | 3:1 minimum |
| Large text (18px+) | 3:1 minimum |

### Focus States

```css
*:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 2px;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Tailwind Configuration

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          espresso: '#4A3B32',
          cream: '#F5F0E6',
          mocha: '#8C7B70',
          paper: '#FFFCF7',
          gold: '#C5A065',
        }
      },
      fontFamily: {
        serif: ['var(--font-instrument)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'h1': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'h2': ['2.25rem', { lineHeight: '1.2' }],
      },
      borderRadius: {
        'xs': '2px',
        'sm': '4px',
        'md': '6px',
        'lg': '12px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(74, 59, 50, 0.05)',
      }
    },
  },
  plugins: [],
};

export default config;
```

---

## Page Templates

### Landing Page Sections

1. **Hero** — Emotional headline, CTA, featured testimonial
2. **How It Works** — 3-step process (Survey → Create → Deliver)
3. **Examples** — Song cards with playable previews
4. **Testimonials** — Social proof carousel
5. **Gift Categories** — For Partner, For Children, For Parents, etc.
6. **FAQ** — Common questions
7. **Footer** — Links, contact, trust signals

### Survey Flow

1. **Recipient** — Who is this song for?
2. **Relationship** — Your connection to them
3. **Occasion** — What's the celebration?
4. **Story** — Memories, qualities, what to include
5. **Music** — Style, mood, tempo preferences
6. **Delivery** — Email, rush option, special instructions
7. **Review** — Summary before checkout
8. **Payment** — Stripe checkout

### Order Confirmation

- Order number
- Estimated delivery date
- What happens next
- Share with friends (optional)

### Admin Dashboard

- Order queue (pending → in progress → delivered)
- Survey response viewer
- Audio uploader
- Customer notes

---

## Testing Checklist

- [ ] Color contrast meets WCAG AA
- [ ] Focus states visible on all interactive elements
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Touch targets minimum 44×44px on mobile
- [ ] Text scales with user zoom
- [ ] Loading states for async actions
- [ ] Error states are helpful, not alarming

---

## Resources

### Font Sources

- **Instrument Serif** — [Fontshare](https://www.fontshare.com/fonts/instrument-serif) (free)
- **Inter** — [Google Fonts](https://fonts.google.com/specimen/Inter) (free)

### Inspiration

- [PrayerSong.com](https://prayersong.com/)
- [Paperless Post](https://www.paperlesspost.com/) — Elegant design
- [Squarespace](https://www.squarespace.com/) — Typography focus
- [Notion](https://www.notion.so/) — Clean, purposeful UI

---

## Maintenance

### Design Tokens Update Process

1. Update CSS custom properties in `:root`
2. Update Tailwind config
3. Update component styles
4. Test across breakpoints
5. Document changes in changelog

### Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | — | Initial design system |

---

*Last updated: December 2025*



