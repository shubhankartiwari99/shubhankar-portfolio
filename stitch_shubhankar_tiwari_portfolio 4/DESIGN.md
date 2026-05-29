---
name: Deterministic Precision
colors:
  surface: '#131314'
  surface-dim: '#131314'
  surface-bright: '#3a393a'
  surface-container-lowest: '#0e0e0f'
  surface-container-low: '#1c1b1c'
  surface-container: '#201f20'
  surface-container-high: '#2a2a2b'
  surface-container-highest: '#353436'
  on-surface: '#e5e2e3'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#e5e2e3'
  inverse-on-surface: '#313031'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#c0c1ff'
  on-secondary: '#1000a9'
  secondary-container: '#3131c0'
  on-secondary-container: '#b0b2ff'
  tertiary: '#3cddc7'
  on-tertiary: '#003731'
  tertiary-container: '#00b7a4'
  on-tertiary-container: '#00413a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#62fae3'
  tertiary-fixed-dim: '#3cddc7'
  on-tertiary-fixed: '#00201c'
  on-tertiary-fixed-variant: '#005047'
  background: '#131314'
  on-background: '#e5e2e3'
  surface-variant: '#353436'
  surface-elevated: '#121214'
  surface-stroke: '#27272A'
  text-muted: '#A1A1AA'
  terminal-header: '#18181B'
typography:
  display-xl:
    fontFamily: Syne
    fontSize: 80px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Syne
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Syne
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Syne
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: '450'
    lineHeight: '1.6'
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Outfit
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  metric-huge:
    fontFamily: Outfit
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.0'
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 32px
  margin-mobile: 20px
  section-gap: 160px
  component-gap: 24px
  stack-tight: 8px
  stack-loose: 48px
---

## Brand & Style

This design system is built for an elite systems engineer whose work lives at the intersection of machine learning and runtime stability. The brand personality is **Technical, Rigorous, and Deterministic**. It prioritizes empirical evidence and architectural clarity over marketing fluff.

The visual style is a fusion of **Minimalism** and **Modern Corporate**, flavored with a "systems engineering" aesthetic. It utilizes heavy whitespace to separate complex ideas, ultra-sharp typography to denote precision, and a "dashboard" mentality where data visualization and metrics are the primary decorative elements. Every pixel should feel calculated, reflecting a philosophy of "Information-Dense Minimalism."

## Colors

The palette is rooted in a deep, "obsidian" dark mode. It avoids pure black in favor of extremely desaturated grays (`#0A0A0B`) to allow for subtle depth and shadow play.

- **Primary (Emerald)**: Represents "System Healthy" and "Live" status. It is used for primary actions and success metrics.
- **Secondary (Indigo)**: Used for technical accents, links, and "ML intelligence" highlights, providing a sophisticated contrast to the green.
- **Tertiary (Teal)**: A supplementary color for data visualization gradients and secondary tech tags.
- **Neutral**: A tiered system of grays that creates a hierarchy of "nested" containers, essential for the terminal and project cards.

## Typography

The typography strategy leverages high-contrast pairings to distinguish between high-level vision and technical implementation.

- **Display & Headlines**: USes **Syne**. Its geometric and slightly avant-garde structure gives the portfolio a premium, distinctive edge.
- **Body & Data**: Uses **JetBrains Mono**. As a monospaced font designed for developers, it reinforces the "systems engineering" vibe, making every line of text feel like a precise technical spec.
- **Labels & UI**: Uses **Outfit**. Its clean, geometric sans-serif nature provides high legibility for small UI elements like tags, button labels, and small metadata.

Use uppercase labels with tight letter spacing for technical section headers (e.g., "SYSTEMS ARCHITECTURE") to create a structured, "blueprint" feel.

## Layout & Spacing

The layout follows a **Fixed Grid** approach for desktop, centering content within a 1280px container to maintain readability.

- **Vertical Rhythm**: A generous `160px` section gap ensures that complex technical sections don't bleed into one another, allowing the user's mind to "reset" between the journey, projects, and terminal.
- **Grid System**: A 12-column grid is used for the "Project Spotlight" and "Technical Focus" sections. Metrics and data points should align to a 4-column sub-grid within cards.
- **Responsive Behavior**: On mobile, the `160px` gap scales down to `80px`. The 12-column grid collapses into a single-column vertical stack with `20px` side margins.
- **Transitions**: Use clean, hard-cut section transitions or thin 1px horizontal lines (`#27272A`) rather than soft gradients to maintain the "deterministic" feel.

## Elevation & Depth

This system avoids soft, floating shadows in favor of **Tonal Layering** and **Low-Contrast Outlines**.

- **Surfaces**: The base background is the darkest tier. Project cards and containers use a slightly lighter gray (`#121214`).
- **Borders**: Depth is primarily communicated through `1px` solid borders using `#27272A`. This creates a sense of "enclosure" and structural integrity.
- **Interactive Terminal**: The terminal should feel like a physical component recessed into the page. Use a subtle inner-shadow (inset) and a slightly darker background than the surrounding section to create a "well" effect.
- **Active State**: Use a "glow" effect sparingly. A primary-colored (Emerald) 2px outer border or a very low-opacity colored drop-shadow can signify an active or hovered state.

## Shapes

The shape language is **Soft (0.25rem)**. 

- Sharp corners are avoided to keep the UI from feeling "hostile" or dated, but large radii are avoided to keep it from feeling too "consumer" or "playful."
- **Standard Radius**: 4px (`0.25rem`) for cards, input fields, and the terminal container.
- **Large Radius**: 8px (`0.5rem`) for outer containers or prominent project imagery.
- **Pill Shapes**: Strictly reserved for technology tags and status indicators (e.g., "Live").

## Components

- **Buttons**: Primary buttons are solid Emerald with JetBrains Mono text in dark neutral. Secondary buttons use a `1px` outline with no fill. All buttons should have a fixed `2px` border-radius.
- **Interactive Terminal**: Integrated as a full-width component. Features a header bar with three macOS-style window controls (red/yellow/green) but uses a custom monospaced command prompt.
- **Metric Cards**: These are the "jewels" of the design. Large numbers in `Outfit` bold, with a small caption label in `JetBrains Mono` below it. They should be framed by a subtle `1px` border.
- **Technology Tags**: Small, low-contrast pills. Background: `#18181B`, Text: `Outfit` Bold.
- **Status Toggles**: The "recruiter: off" toggle should mimic a system settings switch, utilizing a "monochrome" look when off and "emerald" when on.
- **Project Cards**: Use a vertical layout. Large high-fidelity image at the top, followed by a structured "Specs" table using monospaced text to describe the tech stack and metrics.