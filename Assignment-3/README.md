# AURÈLE — Premium Luxury Fashion E-Commerce

A luxury storefront landing page for the fictional high-end fashion brand **AURÈLE - Maison de Luxe**. Built entirely with vanilla technologies, it features an interactive, dynamic design with comprehensive client-side state handling.

## 📖 Table of Contents
- [Description](#description)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [File Structure](#file-structure)
- [Interactive Features](#interactive-features)
- [How to Run](#how-to-run)

---

## 📝 Description
AURÈLE is designed to deliver a modern, premium online shopping experience. It showcases high-fashion categories (Men's, Women's, Jewelry, Accessories) and implements advanced UI mechanics including drawer overlays, theme customization, search filtering, and shopping bag calculations.

## 💻 Tech Stack
- **HTML5**: Structured semantic document including sections for loaders, navigation drawers, heroes, grids, and overlays.
- **CSS3 (Custom Styling)**: Utilizes custom properties (design tokens) for color management, fluid layouts, custom transitions (`ease-spring` cubic-bezier), and dark mode styles.
- **JavaScript (Vanilla ES6)**: Handles application state, UI event delegation, client-side sorting, category filters, and dynamic DOM injection.
- **Google Fonts**: Combines *Cormorant Garamond* (for headings and branding) and *Montserrat* (for clean, legible body text).

## ⚡ Key Features
- **Curated Preloader**: Displays a signature brand loader animations before initiating page transitions.
- **Bidirectional Dark/Light Mode**: Smooth toggling that changes color tokens globally using the `data-theme` attribute on the HTML element.
- **Sliding Drawer Components**: Custom side-drawers for the Shopping Bag and Wishlist, animated via transform transitions.
- **Filter and Sorting Engine**: Allows sorting products by price, rating, or category, and dynamically searching product names.
- **Quick View Modals**: Displays product details, sizing selection tables, ratings, and larger image previews in a centered modal dialog.
- **Fully Interactive Checkout Actions**: Automatically computes subtotals, item counts, tax estimates, and applies visual badges in real-time.

## 📁 File Structure
```text
Assignment-3/
├── index.html     # Semantic structure and layouts for drawers/modals
├── style.css      # Core styles, design tokens, light/dark themes, and micro-animations
└── script.js      # Mock product catalog and application state controllers (Cart, Wishlist)
```

---

## 🚀 How to Run
1. Open the [Assignment-3](file:///d:/Avengers%20Doomsday/FSDL/Assignment-3) directory.
2. Double-click [index.html](file:///d:/Avengers%20Doomsday/FSDL/Assignment-3/index.html) to run the storefront.
