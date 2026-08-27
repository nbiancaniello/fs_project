# Implementation Plan - Modernization, Upgrades & Bootstrap to Tailwind CSS Migration

Modernize the workspace by upgrading dependencies in `front` and `back`, and migrate the client frontend (`front`) from Bootstrap / React-Bootstrap to Tailwind CSS v4 while strictly preserving the existing layout, styles, and functionality.

## User Review Required

> [!IMPORTANT]
> Please review the following technical design choices for the styling migration:
> *   **Tailwind CSS v4 Integration:** We will use Tailwind CSS v4 (with `@tailwindcss/vite` plugin), keeping it aligned with the admin portal stack.
> *   **Pure Tailwind Replacements:** All React-Bootstrap components (e.g. `Navbar`, `Offcanvas`, `NavDropdown`, `Form`, `Col`, `Row`, `Container`, `Button`) will be replaced with standard HTML elements and custom state-driven React components styled with Tailwind CSS utility classes.
> *   **Visual Preservation:** We will maintain the existing convenience store color scheme (soft greens, forest green accents, clean borders) and font sizes to ensure style alignment.

## Open Questions

> [!NOTE]
> Do you have any preferences on the Tailwind CSS v4 configuration, or should we use the default system configurations similar to what we set up in `admin-front`? (We recommend using the official `@tailwindcss/vite` plugin approach).

---

## Proposed Changes

### 1. Dependency Modernization

We will update dependencies in `back` and `front` to modern, stable, non-breaking releases.

#### [MODIFY] [package.json](file:///c:/Users/nicol/Documents/Coding/UTN%20FS/Proyectos/fs_project/back/package.json)
*   Ensure dependencies like `mongoose`, `express`, and others are set to modern stable versions.

#### [MODIFY] [package.json](file:///c:/Users/nicol/Documents/Coding/UTN%20FS/Proyectos/fs_project/front/package.json)
*   Uninstall `bootstrap` and `react-bootstrap`.
*   Install `tailwindcss` and `@tailwindcss/vite` as devDependencies.
*   Upgrade `react-router-dom` to `^6.30.6` and `vite` to `^5.4.21`.

---

### 2. Tailwind CSS v4 Integration in `front`

#### [MODIFY] [vite.config.js](file:///c:/Users/nicol/Documents/Coding/UTN%20FS/Proyectos/fs_project/front/vite.config.js)
*   Import and add the `@tailwindcss/vite` plugin.

#### [MODIFY] [index.css](file:///c:/Users/nicol/Documents/Coding/UTN%20FS/Proyectos/fs_project/front/src/index.css)
*   Include `@import "tailwindcss";` to enable Tailwind CSS v4.

#### [MODIFY] [App.jsx](file:///c:/Users/nicol/Documents/Coding/UTN%20FS/Proyectos/fs_project/front/src/App.jsx)
*   Remove the legacy bootstrap CSS import (`import '../node_modules/bootstrap/dist/css/bootstrap.min.css'`).

---

### 3. Component Refactoring (Bootstrap to Tailwind CSS)

We will refactor components to use native HTML elements styled with Tailwind, while preserving their existing state and logic.

#### [MODIFY] [Navigation.jsx](file:///c:/Users/nicol/Documents/Coding/UTN%20FS/Proyectos/fs_project/front/src/components/navigation/Navigation.jsx)
*   Re-implement the main Header navbar.
*   Create a pure React offcanvas drawer (using state toggles and Tailwind transition classes) to handle the mobile sidebar navigation.
*   Re-implement dropdown menus using a click/hover state toggle.

#### [MODIFY] [ProductsList.jsx](file:///c:/Users/nicol/Documents/Coding/UTN%20FS/Proyectos/fs_project/front/src/components/products/ProductsList.jsx) & [ProductByCategory.jsx](file:///c:/Users/nicol/Documents/Coding/UTN%20FS/Proyectos/fs_project/front/src/components/products/ProductByCategory.jsx)
*   Replace `<Container>` and `<Row>` grid columns with Tailwind `.container` and grid layout utility classes (`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4`).

#### [MODIFY] [ProductCard.jsx](file:///c:/Users/nicol/Documents/Coding/UTN%20FS/Proyectos/fs_project/front/src/components/products/ProductCard.jsx) & [ProductForm.jsx](file:///c:/Users/nicol/Documents/Coding/UTN%20FS/Proyectos/fs_project/front/src/components/products/ProductForm.jsx)
*   Rewrite product cards using HTML divs, image classes, text styles, borders, and buttons styled with Tailwind.

#### [MODIFY] [CartHandler.jsx](file:///c:/Users/nicol/Documents/Coding/UTN%20FS/Proyectos/fs_project/front/src/components/cart/CartHandler.jsx)
*   Replace `<Form.Control>` and `<Button>` components with styled inputs and custom buttons.

#### [MODIFY] [ShoppingCart.jsx](file:///c:/Users/nicol/Documents/Coding/UTN%20FS/Proyectos/fs_project/front/src/components/shoppingCart/ShoppingCart.jsx), [ShoppingCartItem.jsx](file:///c:/Users/nicol/Documents/Coding/UTN%20FS/Proyectos/fs_project/front/src/components/shoppingCart/ShoppingCartItem.jsx) & [ShoppingCartUserDetails.jsx](file:///c:/Users/nicol/Documents/Coding/UTN%20FS/Proyectos/fs_project/front/src/components/shoppingCart/ShoppingCartUserDetails.jsx)
*   Refactor cart item lists, tables, summaries, checkout forms, and buttons to use Tailwind CSS utility classes.

#### [MODIFY] [UserProfile.jsx](file:///c:/Users/nicol/Documents/Coding/UTN%20FS/Proyectos/fs_project/front/src/components/user/UserProfile.jsx)
*   Rewrite details form, text inputs, buttons, and custom alerts.

---

## Verification Plan

### Automated Tests
*   Run the TypeScript compiler checks and Vite build checks on the frontend:
    ```powershell
    cd front
    npm run build
    ```

### Manual Verification
*   We will run the frontend locally (`npm run dev` in `front`) and test:
    *   Responsive navigation menu & mobile offcanvas menu toggle.
    *   Products grid layout, category dropdowns, and filters.
    *   Authentication (login/logout) and Profile modifications.
    *   Add to cart, cart items updates, and user details submission flow.
    *   Ensure all colors, borders, layouts, and font sizes strictly match the original Bootstrap theme.
