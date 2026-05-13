---
name: Namma-Shaale Inventory
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#424752'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#727783'
  outline-variant: '#c2c6d4'
  surface-tint: '#005db6'
  primary: '#00478d'
  on-primary: '#ffffff'
  primary-container: '#005eb8'
  on-primary-container: '#c8daff'
  inverse-primary: '#a9c7ff'
  secondary: '#006d3d'
  on-secondary: '#ffffff'
  secondary-container: '#97f3b5'
  on-secondary-container: '#047240'
  tertiary: '#663f00'
  on-tertiary: '#ffffff'
  tertiary-container: '#865400'
  on-tertiary-container: '#ffd29e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#a9c7ff'
  on-primary-fixed: '#001b3d'
  on-primary-fixed-variant: '#00468c'
  secondary-fixed: '#9af6b8'
  secondary-fixed-dim: '#7ed99e'
  on-secondary-fixed: '#00210f'
  on-secondary-fixed-variant: '#00522d'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Public Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.5px
  label-md:
    fontFamily: Inter
    fontSize: 11px
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
  margin-mobile: 16px
  gutter: 16px
  touch-target-min: 48px
  card-padding: 20px
---

## Brand & Style

The design system is rooted in a "Modern Gov-Tech" aesthetic tailored for the educational sector. It balances the authority and trust required for government-backed initiatives with the warmth and accessibility needed by school administrators and teachers. 

The visual style follows a **Corporate / Modern** approach with a focus on high-clarity Material 3 principles. It prioritizes utility and ease of use for non-technical users through generous whitespace, large touch targets, and a clear information hierarchy. To reflect the specific inventory nature of the app, the design incorporates subtle geometric patterns inspired by QR code data modules to add a modern, tech-forward texture to backgrounds and headers.

The emotional response should be one of reliability, organization, and efficiency, ensuring that the heavy task of asset management feels lightweight and manageable.

## Colors

This design system utilizes a palette built on trust and vitality. 

- **Primary (Trustworthy Blue):** Used for key actions, brand identity, and essential navigation. It conveys stability and institutional reliability.
- **Secondary (Fresh Green):** Representing growth and "Verified/Good" status. Used for successful scans, active inventory items, and positive confirmations.
- **Tertiary (Soft Orange):** Reserved for "Needs Repair" or "Incomplete Data" statuses. It catches the eye without causing panic.
- **Error (Red):** Strictly for "Missing" items, critical alerts, or destructive actions.
- **Neutrals:** A range of cool greys that maintain a crisp, clean look in light mode and a deep, legible surface in dark mode.

Surface colors follow Material 3 tonal elevation, where containers become lighter (in dark mode) or more saturated (in light mode) to indicate depth.

## Typography

The system uses **Public Sans** for headings to provide an institutional, highly legible, and "official" feel. **Inter** is used for all body text and UI labels due to its exceptional performance on small mobile screens and its neutral, utilitarian nature.

Hierarchy is enforced through weight rather than extreme size shifts, ensuring that even on smaller Android devices, the text remains readable. Labels for "Serial Numbers" or "Asset IDs" should use the `label-lg` style with increased letter spacing to prevent character confusion.

## Layout & Spacing

This design system employs a **Fluid Grid** model centered on an 8px square rhythm. 

- **Margins:** Standard 16px horizontal margins on mobile to ensure content doesn't feel cramped while maximizing horizontal screen real estate.
- **Touch Targets:** All interactive elements (buttons, checkboxes, list items) must adhere to a minimum 48x48px touch area to accommodate users in active environments (e.g., warehouses, classrooms).
- **Vertical Rhythm:** Use 24px or 32px spacing between logical sections and 8px/12px between related elements within a card.

## Elevation & Depth

To maintain a clean 'Gov-Tech' look, this design system moves away from heavy shadows in favor of **Tonal Layers** and **Ambient Shadows**.

- **Level 0 (Surface):** The base background of the app.
- **Level 1 (Cards/Containers):** Elevated by a subtle +1dp tonal overlay of the primary color and an extremely soft, diffused shadow (Blur: 4px, Y: 2px, Opacity: 4%).
- **Level 2 (Active States/FAB):** Higher elevation using a +3dp tonal overlay and a more pronounced but still soft shadow (Blur: 8px, Y: 4px, Opacity: 8%).

Avoid using harsh borders; instead, use 1px stroke in a light neutral color (e.g., Grey 200) for outlining card containers in light mode to provide definition without clutter.

## Shapes

The shape language is "Rounded," echoing the friendly and approachable nature of the system.

- **Small Components (Buttons, Chips):** 8px radius.
- **Medium Components (Cards, Dialogs):** 16px to 24px radius, as specified in the brief. 24px is preferred for top-level "Asset Detail" cards to make them feel distinct and premium.
- **Large Components (Bottom Sheets):** 28px top-rounded corners.

The use of roundedness helps soften the "official" feel of the app, making it more inviting for school staff.

## Components

- **Buttons:** Use Material 3 Filled buttons for primary actions (e.g., "Add Asset"). Outlined buttons should be used for secondary actions (e.g., "Export PDF"). Ensure a minimum height of 56px for high-frequency actions.
- **Cards:** The central component. Use 24px corner radius. Each card should include a clear header, a status badge in the top-right, and key-value pairs for asset details.
- **Status Badges:** Pill-shaped with a background color from the status palette (Green, Orange, Red) and high-contrast text. Use icons within badges for "Missing" or "Repair" states.
- **Input Fields:** Use Filled text fields with a 1px bottom stroke. Ensure labels are always visible (Floating Label style) to assist non-technical users.
- **QR Scanner Interface:** A centered, square viewfinder with a 24px corner radius. Provide a "Flash" toggle and "Manual Entry" button as secondary actions at the bottom.
- **Lists:** Use 72px minimum height for list items. Include a leading icon or thumbnail and a trailing chevron for navigation.
- **Inventory Patterns:** Use a subtle, low-opacity (5%) QR-code module pattern as a background element for the top header area of the dashboard and asset details.