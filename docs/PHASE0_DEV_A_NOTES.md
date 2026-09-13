# Phase 0 — Developer A Scope

## What's included here (Developer A tasks per PLAN.md §7)

- **Next.js project scaffold** — created with `create-next-app` (App Router,
  TypeScript, Tailwind CSS v4, ESLint, `src/` directory, `@/*` import alias).
- **TypeScript config** — default strict `tsconfig.json` from the scaffold,
  with the `@/*` → `./src/*` alias Dev B's relative imports don't need but new
  frontend code will use.
- **Tailwind CSS** — v4, CSS-first config (no `tailwind.config.js`); theme
  tokens live in `src/app/globals.css`.
- **shadcn/ui** — configured by hand (`components.json`, `src/lib/utils.ts`,
  CSS variable theme). The `shadcn` CLI's `init`/`add` commands couldn't reach
  `ui.shadcn.com` from this environment, so `button`, `input`, `label`, and
  `card` were hand-written to match the standard shadcn "new-york" output
  (same API/props), using `class-variance-authority`, `@radix-ui/react-slot`,
  and `@radix-ui/react-label`, which installed fine from npm. Swap these for
  CLI-generated versions any time — `npx shadcn@latest add button` etc. — once
  you're on a network that can reach the registry; the props/exports match so
  nothing downstream should need to change.
- **Initial application layout** — `src/app/layout.tsx` (metadata, fonts) and
  `src/app/page.tsx` (header + 3-step explainer + a disabled CTA card) so both
  developers can confirm the app boots and the shared theme/components work
  before Phase 1's real form exists.
- **Git repository** — initialized here; see "Together" below before pushing.
- **Frontend folder structure** — `src/components/ui/` (shadcn primitives),
  `src/components/lab-form/` and `src/components/generation/` (empty,
  commented `index.ts` stubs — same pattern as Dev B's `src/lib/*/index.ts`
  stubs — marking where Phase 1 UI lands).

## Merged in as-is (Developer B's Phase 0 work)

Everything from `PHASE0_DEV_B_NOTES.md`: `src/app/api/generate/route.ts`,
`src/lib/{generation,validation,errors,env.ts}`, the empty `src/lib/{lab,ai,
execution,screenshots,documents,templates}/index.ts` stubs, `src/types/*.ts`,
and `.env.example`. Nothing in these was changed — `zod` was added as a
dependency since the validation/env code needs it and it wasn't in `package.json`
yet.

## Verified

- `npx tsc --noEmit` — clean.
- `npm run lint` — clean.
- `npm run build` — fails in this sandbox only on fetching the Geist font
  from `fonts.googleapis.com` (network-restricted environment); this is not a
  code issue and should build fine with normal internet access. Worth
  confirming once this lands in a real dev environment.

## Deliberately NOT included (Developer B scope per PLAN.md §7)

- Real lab-parsing, AI, execution, screenshot, or DOCX logic (Phases 2–7).
- Wiring the frontend to `POST /api/generate` (that's the "Together" step at
  the end of Phase 1, once the form exists).

## Needs "Together" agreement (PLAN.md §7, not decided unilaterally)

- Confirm folder structure now that both halves exist side by side.
- Git workflow / branch naming — this scaffold sits on its own branch,
  nothing pushed to `main` yet.
- Whether to keep the hand-written shadcn components or regenerate via the
  CLI once someone has a network path to `ui.shadcn.com`.
- Definition of Done for Phase 0 (PLAN.md §20 gives the general shape; confirm
  it applies as-is here).
