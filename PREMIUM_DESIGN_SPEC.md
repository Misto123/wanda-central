# Wanda Central - Premium B2B Design System

## Design Philosophy
- Enterprise-grade professionalism
- Sophisticated, modern aesthetics
- Trust and credibility focus
- High-end SaaS platform look

## Color Palette

### Primary Colors
- **Deep Blue**: #0F172A (backgrounds, headers)
- **Electric Blue**: #3B82F6 (primary actions, links)
- **Sky Blue**: #60A5FA (hover states, accents)

### Accent Colors
- **Emerald**: #10B981 (success, positive actions)
- **Amber**: #F59E0B (warnings, highlights)
- **Rose**: #F43F5E (errors, critical)
- **Purple**: #8B5CF6 (premium features, mentions)

### Neutrals
- **Slate 50**: #F8FAFC (light backgrounds)
- **Slate 100**: #F1F5F9 (cards, containers)
- **Slate 200**: #E2E8F0 (borders)
- **Slate 600**: #475569 (secondary text)
- **Slate 900**: #0F172A (primary text)

## Typography

### Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Scale
- Hero: 3rem (48px), weight 700
- H1: 2rem (32px), weight 600
- H2: 1.5rem (24px), weight 600
- H3: 1.25rem (20px), weight 600
- Body: 1rem (16px), weight 400
- Small: 0.875rem (14px), weight 400

## Components

### Cards
- Background: White
- Border: 1px solid Slate 200
- Radius: 12px
- Shadow: 0 1px 3px rgba(0,0,0,0.1)
- Hover: Shadow lift to 0 10px 25px rgba(0,0,0,0.1)

### Buttons
- Primary: Electric Blue background, white text
- Secondary: White background, Electric Blue border
- Success: Emerald background, white text
- Radius: 8px
- Padding: 12px 24px
- Font weight: 500

### Code Blocks
- Background: Slate 900
- Text: Slate 100
- Radius: 8px
- Padding: 16px
- Font: 'Fira Code', monospace

### Copy Buttons
- Position: Absolute top-right
- Background: Electric Blue
- Hover: Sky Blue
- Active: Emerald (copied state)
- Icon: Clipboard

## Layout

### Header/Hero
- Background: Linear gradient from Slate 900 to Slate 800
- Overlay: Subtle grid pattern
- Height: 300px minimum
- Content: Centered, max-width 1200px

### Navigation
- Sidebar: Fixed left, 280px width
- Background: White
- Border: 1px solid Slate 200
- Active item: Electric Blue background with white text

### Content
- Max width: 1200px
- Padding: 48px 24px
- Grid: 12 columns, 24px gap

## Spacing System
- xs: 8px
- sm: 16px
- md: 24px
- lg: 32px
- xl: 48px
- 2xl: 64px

## Animations
- Transitions: 200ms ease-out
- Hover lifts: translateY(-2px)
- Copy feedback: Scale pulse

## Dark Mode Support
- Optional toggle
- Deep Blue becomes Slate 900
- White becomes Slate 800
- Text inverts appropriately
