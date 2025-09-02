# TanStack Query Optimistic Updates vs. Simple Mutations (React + Vite + TS)

This project demonstrates how Optimistic Updates in TanStack Query make UI feel instant compared to a simple mutation that waits for the server.

## Demo
- Two modes with the same UI:
  - Optimistic: updates cache immediately (onMutate + rollback)
  - Simple: waits for server, then invalidates to refetch
- Success/error toasts via `react-toastify`

## Prerequisites
- Node 18+
- npm

## Getting Started
```bash
npm install
npm run dev
```
Open http://localhost:5173 and use the nav to switch between Optimistic and Simple.

## Key Files
- `src/api/color.ts` – mock server with latency and random failures
- `src/components/ChangeBgButton.tsx` – optimistic mutation (onMutate, rollback, invalidate)
- `src/components/SimpleBgButton.tsx` – simple mutation (invalidate on settle)
- `src/App.tsx` – nav to switch modes + `ToastContainer`

## Optimistic Update Pattern (TL;DR)
1. `onMutate`: cancel queries, snapshot previous cache, write optimistic value
2. `onError`: rollback to snapshot
3. `onSettled`: re-sync (invalidate) or `onSuccess`: replace with response

Official guide: https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates

## Scripts
- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – preview build
