# AI Lab Report Generator

## What is this?

A small AI-powered web application for university students.

A student enters their information, selects their university, uploads a lab PDF/DOC/DOCX, and receives a completed `.docx` lab report containing the relevant solution/code and screenshots of program output where possible.

## MVP

Supported universities:

- Air University
- Bahria University
- NUST

All three use the same report structure. The selected university changes the logo/template only.

### User inputs

- Name
- Roll number
- University
- Class/section
- Instructor name
- Course
- Lab PDF/DOC/DOCX

### Output

A downloadable `.docx` report containing, as appropriate:

- Student information
- Lab title/objectives
- Lab questions/tasks
- Solutions/explanations
- Related source code
- Actual output screenshots
- Conclusion when appropriate

The generated report must **not add the university name as ordinary text**. University identity comes from the selected template/logo.

## Explicitly NOT in the MVP

- No login/signup
- No database
- No user accounts
- No saved history
- No admin dashboard
- No payments
- No chat interface
- No microservices
- No unnecessary enterprise infrastructure

## Suggested stack

- Next.js + TypeScript
- App Router
- Tailwind CSS
- shadcn/ui
- Zod
- OpenAI API
- DOCX generation library
- Playwright for screenshots
- Docker for isolated code execution

The implementation should stay small and understandable.

## Main flow

```text
Student Form
    ↓
Upload Lab
    ↓
Extract Lab Content
    ↓
AI Understands Tasks
    ↓
AI Generates Solution/Code
    ↓
Safely Execute Supported Code
    ↓
Capture Output
    ↓
Generate DOCX Using Selected Template
    ↓
Download
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and fill in `OPENAI_API_KEY` before Phase 3
(AI generation) is wired up — `src/lib/env.ts` validates it and fails fast if missing.

## Project layout

See `ARCHITECTURE.md` for the full rationale. Summary:

```text
src/
├── app/
│   ├── page.tsx              # Landing / generation page
│   ├── layout.tsx
│   └── api/generate/route.ts # POST /api/generate (thin route handler)
├── components/
│   ├── ui/                   # shadcn/ui primitives
│   ├── lab-form/             # Phase 1: student form, university select, upload
│   └── generation/           # Phase 1+: progress states, result/download panel
├── lib/
│   ├── generation/           # GenerationService — coordinates the pipeline
│   ├── lab/                  # Phase 2: lab parsers
│   ├── ai/                   # Phase 3: AI service + provider adapter
│   ├── execution/            # Phase 4: code executor strategies
│   ├── screenshots/          # Phase 5: Playwright screenshot capture
│   ├── documents/            # Phase 7: DOCX generator
│   ├── templates/            # Phase 6: university template registry
│   ├── validation/           # Zod schemas
│   └── errors/                # AppError + friendly error codes
└── types/                    # Shared domain + API types

templates/                    # air/ · bahria/ · nust/ (added in Phase 6)
```

See `PLAN.md` for the full phase-by-phase roadmap and `PHASE0_DEV_B_NOTES.md`
for what Developer B's half of Phase 0 covers.
