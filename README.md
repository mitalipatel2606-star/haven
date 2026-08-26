# Fernway

A vacation-rental marketplace frontend built for a React engineering assessment. Fernway is an original identity and UI inspired by modern booking platforms — it is not a clone of any existing product's branding or code.

## Overview

Fernway lets a visitor search and filter 23 mock properties, drill into a details page with a booking flow that calculates a live price breakdown, and save favorites that persist across browser refreshes via `localStorage`. There is no backend — all data lives in a structured mock dataset, and all state is handled on the client with React state, the URL, and `localStorage`.

## Features

- **Search & filter** by destination, category, max price, minimum rating, and guest count, with sort by price or rating
- **URL-synced filters** — every filter is reflected in the query string, so results are shareable, survive a refresh, and work correctly with the browser's back/forward buttons
- **Property details** page with an image gallery, host info, amenities, and a dynamic route (`/property/:id`)
- **Booking flow** with date/guest validation and a live-calculated subtotal, cleaning fee, service fee, and total, ending in a success modal
- **Favorites** that persist in `localStorage` and survive a refresh, with a dedicated `/favorites` page and its own empty state
- **Responsive, accessible UI** — semantic landmarks, real `<button>`/`<label>` elements, visible focus states, keyboard-operable filters and gallery, and a mobile layout that's designed rather than shrunk
- **Polished empty/error states** for no search results, an invalid property id, an empty favorites list, and invalid booking input

## Tech stack

- React 18 (function components + hooks)
- Vite
- React Router v6
- Plain CSS with custom properties (no UI framework)
- Browser `localStorage`

## Architecture overview

```
src/
  components/   Reusable, presentational building blocks (PropertyCard, SearchBar,
                FilterBar, BookingCard, ImageGallery, StarRating, EmptyState, ...)
  pages/        Route-level components (Home, PropertyDetails, Favorites, NotFound)
  hooks/        useLocalStorage, useFavorites, useSearchFilters
  context/      FavoritesContext — shares favorites state without prop drilling
  data/         properties.js — the single structured mock dataset the whole app renders from
  utils/        format.js (currency/date/night-count formatting), validation.js (booking rules)
```

**Data flow.** `properties.js` is the only place property data lives. `Home` derives its visible list with `useMemo`, filtering and sorting the raw array based on the current filters rather than storing a second copy of "filtered properties" in state. `PropertyDetails` and `Favorites` both look properties up by id from the same source, so there is exactly one shape for a "property" anywhere in the app.

**Filters live in the URL**, not component state. `useSearchFilters` wraps `useSearchParams` and exposes a plain `filters` object plus setters that write straight to the query string (only when a value differs from its default, to keep URLs clean). This is what makes a search shareable and refresh-proof, and it's why the browser back button "just works" for filter changes.

**Favorites live in `localStorage`**, wrapped by a small generic `useLocalStorage` hook and a domain-specific `useFavorites` hook on top of it (add/remove/toggle/check). `FavoritesContext` puts one instance of that hook at the top of the tree so any `PropertyCard`, on any page, can read and toggle favorite status without threading props down through `Home`, `Favorites`, and `PropertyDetails` separately.

**Booking math lives in `BookingCard`**, derived with `useMemo` from the selected dates and the property's price — nights, subtotal, a flat cleaning fee, and a 12% service fee, recalculated on every relevant change rather than stored redundantly in state.

## Key React concepts demonstrated

- Function components with hooks (`useState`, `useEffect`, `useMemo`, `useCallback`, `useId`, `useContext`)
- Custom hooks that encapsulate real logic (`useFavorites`, `useSearchFilters`, `useLocalStorage`) rather than existing for their own sake
- Derived state via `useMemo` for filtering/sorting and for booking price calculations, instead of duplicating data in state
- Context for cross-cutting state (favorites) instead of prop drilling
- Dynamic routing (`/property/:id`) with data looked up by route param, plus a catch-all 404 route
- Route-level code splitting with `React.lazy` + `Suspense` for the details, favorites, and 404 routes
- Controlled forms with validation (search form, booking form) and accessible error messaging
- Rendering entirely from structured data — no property is ever hand-written into JSX

## How to run

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
npm run preview
```
