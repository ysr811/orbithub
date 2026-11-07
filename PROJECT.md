# Project: OrbitHub Materials Page Redesign

## Architecture
- **Framework & Runtime**: Next.js 16.4.5 (Turbopack, cacheComponents, partialPrefetching), React 19.3.0, Node.js.
- **Styling & Design System**: Tailwind CSS 4 (`@import "tailwindcss"; @import "tw-animate-css"; @import "shadcn/tailwind.css"`), class-based dark mode (`@custom-variant dark (&:is(.dark *));`), Fonts: Cairo (Arabic, `font-cairo`, `dir="rtl"`) and MuseoModerno (Latin).
- **Component Primitives**: `@base-ui/react` v1.9.0 (MUI Base UI primitives), `lucide-react` icons, CVA variants. Base UI polymorphism uses `render={<a ... />}` pattern (NOT Radix `asChild`).
- **Server/Client Boundary**:
  - `src/app/materials/page.jsx`: Async Server Component. Fetches cached data via `getSummaries()`, streams via `<Suspense fallback={<MaterialSkeleton />}>`.
  - `src/components/MaterialsClient.jsx`: Client Component (`"use client"`). Hosts interactive search, cascading filter state via `useMaterialsFilter`, mobile drawer, and material card grid.
  - Subcomponents located under `src/components/materials/`: `MaterialCard.jsx`, `MaterialFilterBar.jsx`, `MaterialFilterDrawer.jsx`, `MaterialActiveChips.jsx`, `MaterialSkeleton.jsx`, `MaterialEmptyState.jsx`.
- **Backend Data Layer**:
  - `src/lib/drive.js`: Google Drive API v3 via Service Account. 5-tier concurrent tree crawler (Level -> Semester -> Subject -> Instructor -> Files). Cached via `unstable_cache` (`revalidate: 3600`, tag `summaries`, key `["orbithub-summaries-v2"]`).
  - `src/app/api/revalidate/route.js`: `POST /api/revalidate` with `secret` calling `revalidateTag("summaries")`.
- **Scope Restriction**: All modifications strictly confined to `src/app/materials/` and materials-specific components under `src/components/`. Global layout, homepage, and unrelated routes remain completely untouched.

---

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | Visual Design & Academic Aesthetic | Modern academic & technical styling for CS students with coherent Light/Dark mode contrast meeting WCAG AA. | M1 | ORIGINAL_REQUEST §R1 |
| F2 | Realistic Loading Skeleton | Realistic multi-card pulse shimmer grid replacing raw spinner during Suspense data fetching. | M1 | ORIGINAL_REQUEST §R3 |
| F3 | Clean Empty States | Engaging empty states for both server-side (empty drive) and client-side (no matching search/filter results). | M1 | ORIGINAL_REQUEST §R3 |
| F4 | Cascading Filter Bar (Desktop) | Cascading filters (Level -> Term -> Subject -> Doctor) with clear helper indicators and quick Level pills. | M2 | ORIGINAL_REQUEST §R2 |
| F5 | Mobile Filter Drawer / Sheet | Responsive touch-friendly mobile bottom-sheet filter drawer using `@base-ui/react/dialog` with active filter badge. | M2 | ORIGINAL_REQUEST §R2 |
| F6 | Active Filter Chips & Reset | Removable filter tags with quick dismiss and one-click reset for all active criteria. | M2 | ORIGINAL_REQUEST §R2 |
| F7 | Redesigned Material Card | Refined academic typography, subject badge, instructor tag, file format icon/pill, and 2-line title clamp. | M3 | ORIGINAL_REQUEST §R3 |
| F8 | File Key & React Reconciliation | Fix React key collisions by using globally unique `file.driveId` as key instead of local `file.id`. | M3 | Survey Explorer 3 |
| F9 | Preview & Direct Download Actions | Distinct accessible action buttons for Google Drive preview and direct download using Base UI `render={<a ... />}`. | M3 | ORIGINAL_REQUEST §R3 |
| F10 | Backend & Caching Preservation | Zero regressions in Google Drive crawler, 1-hour ISR cache (`revalidate: 3600`), and `revalidateTag("summaries")`. | M4 | ORIGINAL_REQUEST §R4 |
| F11 | Responsive & Cross-Device Polish | Flawless responsive layout across mobile (<640px), tablet (640-1024px), and desktop (>1024px) in RTL. | M4 | ORIGINAL_REQUEST AC |

---

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Skeleton & Empty States UI | `MaterialSkeleton.jsx`, `MaterialEmptyState.jsx`, `page.jsx` Suspense fallback | None | DONE |
| M2 | Responsive Filters & Mobile Drawer | `MaterialFilterBar.jsx`, `MaterialFilterDrawer.jsx`, `MaterialActiveChips.jsx`, `useMaterialsFilter.js` | M1 | DONE |
| M3 | Material Card & Action Buttons | `MaterialCard.jsx`, `MaterialsClient.jsx` integration, unique driveId keys, WCAG AA contrast | M2 | DONE |
| M4 | E2E Verification, Build & Forensic Audit | Verification across viewports, dark/light contrast, build verification, and integrity audit | M3 | DONE |

---

## Interface Contracts

### MaterialSummary Contract (`src/lib/drive.js`)
```typescript
interface MaterialSummary {
  id: number;           // Local index within folder
  driveId: string;      // Globally unique Google Drive ID (MUST BE USED AS REACT KEY)
  title: string;        // File name (e.g. "Lecture_1.pdf")
  level: number;        // Academic level (e.g. 1, 2, 3, 4)
  semester: number;     // Semester/Term (e.g. 1, 2)
  subject: string;      // Subject folder name
  instructor: string;   // Instructor folder name
  mimeType: string;     // MIME type string
  sizeMB: string;       // Formatted size string (e.g. "0.17")
  viewUrl: string;      // "https://drive.google.com/file/d/${driveId}/view"
  downloadUrl: string;  // "https://drive.google.com/uc?id=${driveId}&export=download"
}
```

### useMaterialsFilter Hook Contract (`src/hooks/useMaterialsFilter.js`)
```typescript
interface UseMaterialsFilterReturn {
  filters: { level: string; semester: string; subject: string; instructor: string };
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isFiltersOpen: boolean;
  setIsFiltersOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  setLevel: (level: string) => void;
  setSemester: (semester: string) => void;
  setSubject: (subject: string) => void;
  setInstructor: (instructor: string) => void;
  resetAll: () => void;
  options: {
    levels: number[];
    semesters: number[];
    subjects: string[];
    instructors: string[];
  };
  filteredSummaries: MaterialSummary[];
  totalCount: number;
  hasActiveFilters: boolean;
  isSearching: boolean;
}
```

---

## Code Layout
- `src/app/materials/page.jsx`: Server Component entry point.
- `src/components/MaterialsClient.jsx`: Client Component integrating header, search, filters, active chips, and material grid.
- `src/components/materials/`:
  - `MaterialCard.jsx`: Individual material card with badges, preview, and download.
  - `MaterialFilterBar.jsx`: Desktop cascading filters and quick level selector.
  - `MaterialFilterDrawer.jsx`: Mobile filter drawer using `@base-ui/react/dialog`.
  - `MaterialActiveChips.jsx`: Removable active filter chips and clear-all button.
  - `MaterialSkeleton.jsx`: Responsive loading skeleton grid for Suspense.
  - `MaterialEmptyState.jsx`: Accessible empty state component for search/filter misses.
- `src/hooks/useMaterialsFilter.js`: Client-side filter state and search hook.
- `src/lib/drive.js`: Google Drive API crawler and `unstable_cache` layer (UNTOUCHED).
- `src/app/api/revalidate/route.js`: On-demand cache revalidation route (UNTOUCHED).
