# Wanda Central Design System

## 🎨 Modern Dark Theme

### Color Palette

**Primary Colors:**
- Background: `hsl(240 10% 3.9%)` - Deep dark blue
- Foreground: `hsl(0 0% 98%)` - Soft white
- Primary: `hsl(142 71% 45%)` - Vibrant green
- Primary Foreground: `hsl(144 61% 20%)` - Dark green

**Semantic Colors:**
- Success: `hsl(142 71% 45%)` - Green
- Warning: `hsl(38 92% 50%)` - Amber
- Error: `hsl(0 72% 51%)` - Red
- Muted: `hsl(240 5% 64.9%)` - Gray

### Typography

**Font Family:**
- Primary: Inter (400, 500, 600, 700)
- Monospace: SF Mono, Monaco, Consolas

**Font Sizes:**
- Heading 1: 32px / 700 weight
- Heading 2: 20px / 600 weight
- Heading 3: 16px / 600 weight
- Body: 14px / 500 weight
- Small: 12-13px / 500 weight
- Code: 11px monospace

### Spacing Scale

- 0.5rem (8px)
- 0.75rem (12px)
- 1rem (16px)
- 1.25rem (20px)
- 1.5rem (24px)
- 2rem (32px)

### Border Radius

- Small: 6px (buttons, badges)
- Medium: 8px (inputs, cards)
- Large: 12px (panels)
- XL: 16px (modals)

## 🧩 Components

### Cards
- Background: `hsl(240 10% 3.9%)`
- Border: `1px solid hsl(240 3.7% 15.9%)`
- Hover: Border color changes to primary
- Shadow: Subtle on hover

### Buttons

**Primary:**
- Background: Primary green with gradient
- Hover: Transform translateY(-1px) + shadow
- Padding: 0.75rem 1.5rem
- Border radius: 8px

**Secondary:**
- Background: Secondary dark
- Border: 1px solid border color
- Hover: Primary border color

### Status Indicators

**Active/Healthy:**
- Green dot with pulse animation
- Green border on left (3px)
- Success badge

**Disconnected:**
- Gray dot
- Gray border
- Muted badge

### Progress Bars
- Height: 6px
- Background: Secondary
- Fill: Primary green
- Smooth animation

## 🎭 Animations

**Transitions:**
- Default: `all 0.15s ease`
- Transform: `0.2s ease`

**Keyframes:**
- `fadeIn`: Opacity 0 → 1
- `slideUp`: TranslateY(20px) → 0
- `pulse`: Opacity animation for status dots
- `spin`: 360° rotation for loaders

## 📐 Layout

**Grid System:**
- Dashboard: `1fr 380px` (main + sidebar)
- Metrics: `repeat(auto-fit, minmax(240px, 1fr))`
- Responsive breakpoints: 768px, 1200px

**Sidebar:**
- Width: 240px
- Fixed position
- Dark card background

## 🎯 Design Principles

1. **Clarity First** - Information hierarchy is clear
2. **Consistent Spacing** - 8px base unit
3. **Subtle Animations** - Enhance, don't distract
4. **Accessible Contrast** - WCAG AA compliant
5. **Professional Polish** - Attention to detail

## 🚀 Inspired By

- shadcn/ui component library
- Tailwind CSS design tokens
- Modern SaaS dashboards (Linear, Vercel)
- GitHub's Primer design system

## 📱 Responsive Design

- Mobile-first approach
- Collapsible sidebar on small screens
- Stacked layout < 768px
- Full grid layout > 1200px
