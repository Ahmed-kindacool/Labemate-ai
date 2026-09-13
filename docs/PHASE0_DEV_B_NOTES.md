# Phase 0 — Developer B Scope

## What's included here (Developer B tasks per PLAN.md §7)

- **API structure** — `../src/app/api/generate/route.ts`. Thin route handler: parses
  `multipart/form-data`, validates it, delegates to `GenerationService`, returns a
  typed response. No pipeline logic lives in the route itself.
- **Service-layer architecture** — `../src/lib/generation/generation.service.ts`.
  `GenerationService.generate()` is the single coordination point for the future
  pipeline (Parser → AI → Executor → Screenshot → Template → DOCX). Per PLAN.md
  Phase 1, it currently returns a **mock response** so Developer A can build the
  frontend against a stable contract before real stages exist.
- **Zod configuration** — `../src/lib/validation/generate-request.schema.ts`.
  `StudentInfoSchema` validates the six required form fields; `validateLabFile`
  checks file type (PDF/DOC/DOCX) and the 10MB size limit from PROJECT_SPEC.md §2.
- **Request/response types** — `../src/types/api.ts` (API contract) and
  `../src/types/lab.ts` (domain types: `ParsedLab`, `GeneratedLab`, `ExecutionResult`,
  `University`, etc., matching the shapes in ARCHITECTURE.md / AI_AND_GENERATION.md).
- **Environment variable structure** — `../src/lib/env.ts` + `../.env.example`.
  Zod-validated, fails fast on startup if config is missing/invalid.
- **Error handling** — `../src/lib/errors/app-error.ts`. A single `AppError` class
  carrying one of the friendly error codes from PROJECT_SPEC.md §7. The route
  catches it and never leaks stack traces/secrets/paths.
- **Initial backend structure** — empty, commented `index.ts` stubs in
  `src/lib/{lab,ai,execution,screenshots,documents,templates}/` marking where each
  later phase's logic will live, without implementing that logic early.

## Deliberately NOT included (Developer A scope per PLAN.md §7)

- Next.js project scaffold (`create-next-app`, `next.config`)
- TypeScript config (`../tsconfig.json`)
- Tailwind CSS config
- shadcn/ui setup
- `../src/app/page.tsx`, layout, and any `components/`
- Git repository initialization

These files are written to slot into the Next.js project once Developer A creates
it — drop `../src` and `../.env.example` in as-is.

## Needs "Together" agreement (PLAN.md §7, not decided unilaterally)

- Final folder structure (this follows ARCHITECTURE.md's suggestion — confirm it
  still makes sense once Developer A's frontend structure exists)
- Naming conventions
- API conventions (e.g. is `downloadUrl` the right shape for delivering the DOCX,
  or should the route stream the file directly?)
- Error-handling approach (draft is in `app-error.ts` — needs review)
- Git workflow / branch naming
- Coding standards (lint/format config — not set up here since that overlaps
  with Developer A's tooling setup)
- Definition of Done for this phase
