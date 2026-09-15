# Migration Notes

Source: https://github.com/Ahmed-kindacool/Labemate-ai (Next.js 16 / React 19 / TypeScript)
Target: `frontend/` (React + Vite + TS + Tailwind) + `backend/` (FastAPI + Pydantic)

This was a **1:1 port of what existed**, not a rebuild. Nothing beyond the
original repo's actual implemented behavior was added — see "Deliberately
not built" below.

## Backend mapping

| Original (TS)                                              | Migrated (Python)                              | Notes |
|--------------------------------------------------------------|--------------------------------------------------|-------|
| `src/app/api/generate/route.ts`                              | `backend/app/routes/lab.py`                      | Path changed to `POST /api/v1/labs/generate` per target spec |
| `src/lib/validation/generate-request.schema.ts`              | `backend/app/schemas/student.py`, `app/validation/lab_file.py` | Zod → Pydantic; field names changed to snake_case per target spec |
| `src/lib/errors/app-error.ts`                                | `backend/app/core/errors.py`                     | Same class shape, now registered as FastAPI exception handlers |
| `src/lib/generation/generation.service.ts`                   | `backend/app/services/generation_service.py`     | Still returns the same mock `download_url` — no pipeline logic added |
| `src/types/api.ts`                                            | `backend/app/schemas/generate.py`                | Same fields, snake_case |
| `src/types/lab.ts`                                             | `backend/app/schemas/lab.py`                     | Unused in both versions — exists only as a future contract |
| `src/lib/env.ts`                                                | `backend/app/core/config.py`                     | Was never imported/called in the original either — ported as-is, still unwired |
| `src/lib/lab/index.ts` (empty)                                  | `backend/app/parsing/` (empty)                   | Phase 2 — not implemented in either version |
| `src/lib/ai/index.ts` (empty)                                   | `backend/app/ai/` (empty)                        | Phase 3 — not implemented in either version |
| `src/lib/execution/index.ts` (empty)                            | `backend/app/execution/` (empty)                 | Phase 4 — not implemented in either version |
| `src/lib/screenshots/index.ts` (empty)                          | `backend/app/screenshots/` (empty)               | Phase 5 — not implemented in either version |
| `src/lib/templates/index.ts` (empty)                            | `backend/app/templates_registry/` (empty)        | Phase 6 — not implemented in either version |
| `src/lib/documents/index.ts` (empty)                            | `backend/app/documents/` (empty)                 | Phase 7 — not implemented in either version |
| —                                                                | `backend/app/routes/health.py`                   | New file, zero logic — just the `GET /api/v1/health` the target spec asks for |

**Verified working:** started the server and replicated the original repo's
four manual test cases (happy path, missing fields, wrong file type,
oversized file) — all four returned matching status codes/error shapes.

## Frontend mapping

| Original (Next.js)                             | Migrated (Vite)                          | Notes |
|--------------------------------------------------|---------------------------------------------|-------|
| `src/app/layout.tsx` + `src/app/page.tsx`        | `src/App.tsx`                                | Merged — Vite has no server/client layout split |
| `src/app/globals.css`                            | `src/index.css`                              | Same design tokens; `next/font` Geist loading (Next-specific) swapped for a system font stack |
| `src/components/ui/*.tsx`                        | `src/components/ui/*.tsx`                    | Unchanged — no Next-specific code in these |
| `src/components/site-header.tsx`                 | `src/components/site-header.tsx`             | Unchanged |
| `src/lib/utils.ts`                                | `src/lib/utils.ts`                           | Unchanged |
| `src/components/lab-form/index.ts` (empty stub)  | `src/components/lab-form/index.ts` (empty stub) | Still not built in either version |
| `src/components/generation/index.ts` (empty stub)| `src/components/generation/index.ts` (empty stub) | Still not built in either version |
| `src/types/api.ts`                                | `src/types/api.ts`                           | Field names updated to snake_case to match the new backend contract |
| `src/types/lab.ts`                                | `src/types/lab.ts`                           | Unchanged |

**Verified working:** `npm install`, `npm run build` (tsc + vite build)
both succeed, and `vite preview` serves the built HTML/CSS/JS correctly.

## Deliberately not built

The original repo's own docs (`PHASE1_STATUS.md`, service TODOs) are
explicit that only the Phase 1 slice was ever implemented. Everything past
that — lab parsing, AI-generated solutions, code execution, screenshot
capture, university DOCX templates, ZIP output, and the frontend form/upload
UI — exists only as empty placeholder files in the source repo, so there
was nothing to migrate for those beyond the placeholder itself. This
migration didn't add any of that logic; it only moved the working Phase 1
slice to the new stack.
